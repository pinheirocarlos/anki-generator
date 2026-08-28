import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_SYS_SVGS } from './remediate-sys-svgs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const MEDIA_CATALOG_PATH = path.join(ROOT_DIR, 'src', 'utils', 'media-catalog.js');

export function updateMediaCatalog() {
  console.log('🔄 Updating src/utils/media-catalog.js with Batch 3 System Design mappings & generators...\n');

  let content = fs.readFileSync(MEDIA_CATALOG_PATH, 'utf8');

  // Generators to add
  const extraGenerators = `,
  cacheAnomaliesStampede: () => \`${ALL_SYS_SVGS['SYS-CACHE-ANOMALIES-000']}\`,
  cdnAnycastRouting: () => \`${ALL_SYS_SVGS['SYS-CACHE-CDN-000']}\`,
  redisEventLoop: () => \`${ALL_SYS_SVGS['SYS-CACHE-REDIS-000']}\`,
  acidIsolationMatrix: () => \`${ALL_SYS_SVGS['SYS-DB-ACID-000']}\`,
  dynamoDbSingleTable: () => \`${ALL_SYS_SVGS['SYS-DB-NOSQL-000']}\`,
  databaseReplicationLag: () => \`${ALL_SYS_SVGS['SYS-DB-SCALING-000']}\`,
  sqlClusteredVsSecondary: () => \`${ALL_SYS_SVGS['SYS-DB-SQLOPT-000']}\`,
  vectorSearchHNSW: () => \`${ALL_SYS_SVGS['SYS-DB-VECTOR-001']}\`,
  twitterSnowflake: () => \`${ALL_SYS_SVGS['SYS-DIST-TIME-001']}\`,
  distributedFileStorage: () => \`${ALL_SYS_SVGS['SYS-ARCH-FILESTORE-000']}\`,
  metricsTsdbGorilla: () => \`${ALL_SYS_SVGS['SYS-ARCH-METRICS-000']}\`,
  paymentLedgerDoubleEntry: () => \`${ALL_SYS_SVGS['SYS-ARCH-PAYMENT-000']}\`,
  typeaheadTrie: () => \`${ALL_SYS_SVGS['SYS-ARCH-TYPEAHEAD-000']}\`,
  webCrawlerFrontier: () => \`${ALL_SYS_SVGS['SYS-ARCH-CRAWLER-000']}\`,
  concurrencyWorkerPool: () => \`${ALL_SYS_SVGS['SYS-LLD-CONCURRENCY-000']}\`,
  designPatternsStrategyFactory: () => \`${ALL_SYS_SVGS['SYS-LLD-PATTERNS-000']}\`,
  lldParkingLotCache: () => \`${ALL_SYS_SVGS['SYS-LLD-CASES-000']}\`,
  hexagonalCleanArchitecture: () => \`${ALL_SYS_SVGS['SYS-LLD-SOLID-001']}\`,
  messageDeliveryGuarantees: () => \`${ALL_SYS_SVGS['SYS-MSG-GUARANTEES-000']}\`,
  messageQueuesDLQ: () => \`${ALL_SYS_SVGS['SYS-MSG-QUEUES-001']}\`,
  apiGatewayBFF: () => \`${ALL_SYS_SVGS['SYS-RES-APIGW-000']}\`,
  loadBalancersL4L7: () => \`${ALL_SYS_SVGS['SYS-RES-LOADBAL-000']}\`,
  serviceMeshZeroTrust: () => \`${ALL_SYS_SVGS['SYS-RES-MESH-000']}\`,
  backOfEnvelopeEstimations: () => \`${ALL_SYS_SVGS['SYS-FND-ESTIMATION-000']}\`,
  systemDesign4StepFramework: () => \`${ALL_SYS_SVGS['SYS-FND-FRAMEWORK-000']}\`
`;

  // Check if distributedLockRedlock exists
  if (content.includes('distributedLockRedlock:')) {
    // Replace the end of distributedLockRedlock
    content = content.replace(
      /distributedLockRedlock:\s*\(\)\s*=>\s*`[\s\S]*?`\s*\n\};/,
      match => {
        return match.replace(/\n\};$/, `${extraGenerators}\n};`);
      }
    );
  }

  fs.writeFileSync(MEDIA_CATALOG_PATH, content, 'utf8');
  console.log('✅ media-catalog.js updated with all 56 SVG generators.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  updateMediaCatalog();
}
