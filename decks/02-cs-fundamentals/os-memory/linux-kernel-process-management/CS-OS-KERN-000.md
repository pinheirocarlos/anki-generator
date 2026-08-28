---
id: CS-OS-KERN-000
title: "Criação de Processos com fork() e Copy-On-Write (COW)"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
Como a otimização de **Copy-On-Write (COW)** torna a syscall **`fork()`** praticamente instantânea mesmo para processos com muitos gigabytes de RAM?

## Resposta
### Quick Answer
**Solução Direta**:
- Ao executar **`fork()`**, o Linux cria um novo processo filho duplicando apenas a Tabela de Páginas do pai, **sem duplicar a memória física real**.
- **Mecanismo Copy-On-Write (COW)**:
  1. Todas as páginas de memória física são marcadas na MMU como **Somente Leitura (`Read-Only`)** e compartilhadas entre pai e filho.
  2. Enquanto ambos apenas lerem dados, compartilham a mesma RAM física com **zero custo de cópia**.
  3. No instante em que o pai ou o filho tentar modificar um byte, a MMU dispara uma interrupção de proteção (*Page Fault COW*).
  4. O kernel intercepta a interrupção, aloca um novo bloco físico de 4 KB, copia os dados daquela página específica, atualiza a tabela do processo escritor com permissão de escrita e retoma a instrução.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Criação de Processos com fork() e Copy-On-Write (COW)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="280" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Após fork(): Processo Filho duplica apenas a Tabela de Páginas (PTEs read-only)</text>
    <text x="280" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Páginas de dados permanecem compartilhadas em RAM física sem cópia inicial (Criação em O(1))</text>
    <text x="280" y="66" fill="#f59e0b" font-size="10" font-weight="bold" text-anchor="middle">No primeiro write(): A MMU gera Page Fault e duplica fisicamente apenas aquela página de 4 KB modificada.</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Base do snapshotting do Redis (BGSAVE) e isolamento instantâneo de processos em contêineres Linux.</text>

</svg>

| Fase do Processo | Estado das Páginas na MMU | Memória RAM Física |
|---|---|---|
| **Imediatamente após `fork()`** | Somente Leitura (`RO`) | 100% compartilhada entre Pai e Filho |
| **Após Escrita do Filho** | Página modificada vira Leitura/Escrita | Apenas a página de 4 KB modificada é copiada |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como o Redis Executa Snapshots em Segundo Plano (BGSAVE)
- O Redis grava snapshots de persistência no disco chamando `fork()`.
- O processo filho varre a memória em segundo plano e grava o arquivo RDB no disco com uma visão estática imutável no tempo, enquanto o processo pai continua atendendo milhares de clientes em tempo real, mutando apenas as páginas necessárias via Copy-On-Write.

#### Key Takeaways
- `fork()` seguido imediatamente de `execve()` não sofre penalidade de cópia de memória, pois o `execve` descarta o espaço de endereçamento antigo.

</details>
