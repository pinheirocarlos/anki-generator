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
