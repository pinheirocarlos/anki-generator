---
id: SYS-ARCH-TYPEAHEAD-000
title: "Autocompletar de Busca (Google Typeahead): Estrutura Trie em Memória e Cache Top-K"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::google
  - freq::high
---

## Pergunta
Como uma Árvore de Prefixos (Trie) em memória combinada com pré-computação Top-K responde a sugestões de autocompletar em menos de 10 ms?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema da Busca Ingênua**: Percorrer toda a subárvore a cada tecla digitada pelo usuário e ordenar todos os termos filhos por frequência de busca tem complexidade $O(\text{subárvore} \log N)$, inviável para 100k QPS.
- **Trie Otimizada com Top-K em Cada Nó**:
  - Cada nó da Trie armazena uma lista fixa dos **Top-5 ou Top-10 termos mais populares** que compartilham aquele prefixo.
  - Ao digitar o prefixo (ex: `"sys"`), o servidor navega até o nó do prefixo em tempo **$O(L)$** (onde $L = \text{comprimento da string} \le 20$) e retorna o Top-5 **instantaneamente em $O(1)$** sem precisar varrer os nós filhos.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/typeahead-trie-topk-cache-lookup-loop.webm">
    <p>Visualização: Árvore Trie em memória armazenando as K sugestões mais frequentes em cada nó para retorno em O(1).</p>
  </video>
</div>

| Estrutura de Autocomplete | Tempo de Resposta | Complexidade Algorítmica |
|---|---|---|
| **Trie sem Cache Top-K** | Lento (~50-100 ms sob alta carga) | $O(\text{tamanho da subárvore} + K \log K)$ |
| **Trie com Top-K nos Nós** | **Ultra-rápido (< 5 ms em RAM)** | **$O(L)$ onde $L \le 20$ (Tempo constante na prática)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Visual do Nó
- Nó do caractere `'s'` $\rightarrow$ Nó `'y'` $\rightarrow$ Nó `'s'`:
  - `top_5`: `["system design", "system of a down", "system32", "sysadmin", "systemctl"]`

</details>
