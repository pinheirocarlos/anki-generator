import path from 'path';

/**
 * Standard diagnostic resolution steps for Anki-Connect connectivity failures.
 */
export const ANKI_CONNECT_RESOLUTION_STEPS = [
  'Confirm Anki Desktop is running on your machine.',
  'Confirm Anki-Connect add-on (code: 2055492159) is installed in Anki Desktop (Tools -> Add-ons).',
  'Verify port 8765 is accessible and Anki-Connect is listening on 127.0.0.1:8765.'
];

/**
 * Custom Error for Anki-Connect RPC and connection failures.
 */
export class AnkiConnectError extends Error {
  /**
   * @param {string} message
   * @param {object} [diagnostic=null]
   * @param {string} [action=null]
   */
  constructor(message, diagnostic = null, action = null) {
    super(message);
    this.name = 'AnkiConnectError';
    this.diagnostic = diagnostic;
    this.action = action;
  }
}

/**
 * Builds a structured diagnostic object from a network or RPC error.
 * @param {Error|any} error
 * @param {string} endpoint
 * @returns {object} AnkiConnectDiagnostic
 */
export function buildDiagnostic(error, endpoint = 'http://127.0.0.1:8765') {
  let errorCode = 'UNKNOWN';
  const errorMsg = error?.message || String(error);

  if (
    error?.code === 'ECONNREFUSED' ||
    error?.cause?.code === 'ECONNREFUSED' ||
    errorMsg.includes('ECONNREFUSED') ||
    errorMsg.includes('fetch failed')
  ) {
    errorCode = 'ECONNREFUSED';
  } else if (
    error?.name === 'AbortError' ||
    error?.code === 'ETIMEDOUT' ||
    errorMsg.includes('timeout')
  ) {
    errorCode = 'TIMEOUT';
  }

  return {
    connected: false,
    endpoint,
    errorCode,
    message: errorMsg,
    resolutionSteps: [...ANKI_CONNECT_RESOLUTION_STEPS]
  };
}

export function formatDiagnosticMessage(diagnostic) {
  if (!diagnostic || typeof diagnostic !== 'object') {
    return '❌ Anki-Connect Connection Failed (unknown diagnostic)';
  }
  const endpoint = diagnostic.endpoint || 'http://127.0.0.1:8765';
  const errorCode = diagnostic.errorCode || 'ERROR';
  const message = diagnostic.message || 'Unknown connection error';
  const steps = Array.isArray(diagnostic.resolutionSteps)
    ? diagnostic.resolutionSteps
    : ANKI_CONNECT_RESOLUTION_STEPS;

  const lines = [
    `❌ Anki-Connect Connection Failed (${endpoint})`,
    `Reason: [${errorCode}] ${message}`,
    '',
    'Resolution Steps:'
  ];

  steps.forEach((step, idx) => {
    lines.push(`  ${idx + 1}. ${step}`);
  });

  return lines.join('\n');
}

/**
 * Client for interacting with Anki Desktop via Anki-Connect JSON-RPC 2.0.
 */
export class AnkiConnectClient {
  /**
   * @param {object} [options={}]
   * @param {string} [options.endpoint='http://127.0.0.1:8765']
   * @param {number} [options.timeout=10000] Request timeout in milliseconds
   */
  constructor(options = {}) {
    this.endpoint = options.endpoint || 'http://127.0.0.1:8765';
    this.timeout = options.timeout || 10000;
  }

  /**
   * Executes a JSON-RPC request against Anki-Connect.
   * @param {string} action - RPC action name ('version', 'importPackage', 'sync', 'deleteDecks', 'getDeckNames')
   * @param {object} [params] - Action parameters
   * @returns {Promise<any>} RPC result payload
   */
  async request(action, params = undefined) {
    const payload = {
      action,
      version: 6
    };

    if (params !== undefined && params !== null) {
      payload.params = params;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new AnkiConnectError(
          `Anki-Connect RPC error during '${action}': ${data.error}`,
          null,
          action
        );
      }

      return data.result;
    } catch (err) {
      if (err instanceof AnkiConnectError) {
        throw err;
      }

      const diagnostic = buildDiagnostic(err, this.endpoint);
      const diagnosticMsg = formatDiagnosticMessage(diagnostic);
      throw new AnkiConnectError(diagnosticMsg, diagnostic, action);
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * Ping / API version check.
   * @returns {Promise<number>} Anki-Connect API version (e.g. 6)
   */
  async version() {
    return await this.request('version');
  }

  /**
   * Alias for version() to perform a health check.
   * @returns {Promise<number>}
   */
  async ping() {
    return await this.version();
  }

  /**
   * Checks connectivity to Anki-Connect without throwing.
   * @returns {Promise<{connected: boolean, version?: number, diagnostic?: object}>}
   */
  async checkConnection() {
    try {
      const ver = await this.version();
      return {
        connected: true,
        version: ver
      };
    } catch (err) {
      return {
        connected: false,
        diagnostic: err.diagnostic || buildDiagnostic(err, this.endpoint)
      };
    }
  }

  /**
   * Imports an .apkg deck package into Anki Desktop.
   * @param {string} apkgPath - Relative or absolute path to .apkg file
   * @returns {Promise<null>}
   */
  async importPackage(apkgPath) {
    if (!apkgPath || typeof apkgPath !== 'string') {
      throw new Error('importPackage requires a valid apkgPath string.');
    }
    const absolutePath = path.isAbsolute(apkgPath)
      ? apkgPath
      : path.resolve(process.cwd(), apkgPath);

    return await this.request('importPackage', { path: absolutePath });
  }

  /**
   * Triggers synchronization between Anki Desktop and AnkiWeb.
   * @returns {Promise<null>}
   */
  async sync() {
    return await this.request('sync');
  }

  /**
   * Retrieves all deck names currently in Anki collection.
   * @returns {Promise<string[]>} List of deck names
   */
  async getDeckNames() {
    return await this.request('deckNames');
  }

  /**
   * Alias for getDeckNames() conforming directly to Anki-Connect action name.
   * @returns {Promise<string[]>} List of deck names
   */
  async deckNames() {
    return await this.request('deckNames');
  }

  /**
   * Deletes specified decks from Anki collection.
   * @param {string|string[]} decks - Single deck name or array of deck names
   * @param {boolean} [cardsToo=true] - Whether to delete cards within decks
   * @returns {Promise<null>}
   */
  async deleteDecks(decks, cardsToo = true) {
    const deckList = Array.isArray(decks) ? decks : [decks];
    return await this.request('deleteDecks', {
      decks: deckList,
      cardsToo
    });
  }

  /**
   * Cleans up a test deck from Anki collection and optionally synchronizes with AnkiWeb.
   * @param {string} [deckName='MAANG_E2E_Sanity'] - Name of test deck to delete
   * @param {boolean} [syncAfter=true] - Whether to trigger cloud sync after deletion
   * @returns {Promise<{ deleted: boolean, synced: boolean }>}
   */
  async cleanupTestDeck(deckName = 'MAANG_E2E_Sanity', syncAfter = true) {
    if (!deckName || typeof deckName !== 'string') {
      throw new Error('cleanupTestDeck requires a non-empty deckName string.');
    }

    await this.deleteDecks(deckName, true);
    let synced = false;
    if (syncAfter) {
      await this.sync();
      synced = true;
    }

    return {
      deleted: true,
      synced
    };
  }
}

// Default shared singleton client instance
export const ankiConnect = new AnkiConnectClient();

// Export convenience functions bound to default client instance
export const ping = () => ankiConnect.ping();
export const version = () => ankiConnect.version();
export const checkConnection = () => ankiConnect.checkConnection();
export const importPackage = (apkgPath) => ankiConnect.importPackage(apkgPath);
export const sync = () => ankiConnect.sync();
export const getDeckNames = () => ankiConnect.getDeckNames();
export const deckNames = () => ankiConnect.deckNames();
export const deleteDecks = (decks, cardsToo = true) => ankiConnect.deleteDecks(decks, cardsToo);
export const cleanupTestDeck = (deckName = 'MAANG_E2E_Sanity', syncAfter = true) => ankiConnect.cleanupTestDeck(deckName, syncAfter);

