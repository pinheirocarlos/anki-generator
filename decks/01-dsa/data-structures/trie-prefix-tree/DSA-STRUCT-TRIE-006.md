---
id: DSA-STRUCT-TRIE-006
title: "Intuição Fundamental de Trie: O Autocomplete do Dicionário e Teclado"
tags:
  - level::l2-fundamental
  - topic::dsa::trie-prefix-tree
  - company::google
  - freq::high
---

## Pergunta
Qual é o princípio fundamental de uma árvore de prefixos (Trie) e como o compartilhamento de caracteres acelera o autocomplete de palavras?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Trie** armazena palavras letra por letra em uma árvore, onde palavras que começam com as mesmas letras **compartilham o mesmo caminho inicial (prefixo)**.
- O tempo de busca depende apenas do **tamanho da palavra buscada ($O(L)$)**, e não da quantidade de milhões de palavras cadastradas no dicionário.

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />

  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Árvore Trie: Compartilhando o Prefixo "CA-" entre "CARRO", "CASA" e "CÃO"</text>

  <!-- Galhos -->
  <line x1="300" y1="50" x2="300" y2="85" stroke="#3b82f6" stroke-width="2" />
  <line x1="300" y1="85" x2="300" y2="125" stroke="#3b82f6" stroke-width="2" />
  
  <line x1="300" y1="125" x2="200" y2="165" stroke="#10b981" stroke-width="2" />
  <line x1="300" y1="125" x2="300" y2="165" stroke="#10b981" stroke-width="2" />
  <line x1="300" y1="125" x2="400" y2="165" stroke="#10b981" stroke-width="2" />

  <!-- Raiz Vazia -->
  <circle cx="300" cy="50" r="14" fill="#334155" stroke="#64748b" stroke-width="1.5" />
  <text x="300" y="54" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">root</text>

  <!-- Letra C -->
  <circle cx="300" cy="85" r="16" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
  <text x="300" y="90" fill="#ffffff" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">'C'</text>

  <!-- Letra A (Prefixo comum) -->
  <circle cx="300" cy="125" r="16" fill="#0f766e" stroke="#14b8a6" stroke-width="2" />
  <text x="300" y="130" fill="#ccfbf1" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">'A'</text>

  <!-- Ramificações: R, S, O -->
  <circle cx="200" cy="165" r="16" fill="#065f46" stroke="#10b981" stroke-width="2" />
  <text x="200" y="170" fill="#ffffff" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">'R' ➔ carro</text>

  <circle cx="300" cy="165" r="16" fill="#065f46" stroke="#10b981" stroke-width="2" />
  <text x="300" y="170" fill="#ffffff" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">'S' ➔ casa</text>

  <circle cx="400" cy="165" r="16" fill="#065f46" stroke="#10b981" stroke-width="2" />
  <text x="400" y="170" fill="#ffffff" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">'O' ➔ cão</text>
</svg>
<p>Visualização: Analogia do dicionário e teclado preditivo compartilhando o prefixo comum 'CA-' para filtrar palavras candidatas.</p>

| Operação | Complexidade | Explicação |
|---|---|---|
| **Buscar Prefixo (`startsWith`)** | $O(L)$ ($L$ = letras do prefixo) | Caminha na árvore letra por letra |
| **Inserir Palavra** | $O(L)$ ($L$ = tamanho da palavra) | Reutiliza nós existentes e cria apenas as novas letras |
| **Espaço de Memória** | Altamente compactado | Prefixos comuns são armazenados uma única vez |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Mental do Dicionário Físico
Ao folhear um dicionário procurando por *"computador"*:
1. Você abre na aba da letra **C**.
2. Depois vai para as páginas que combinam **CO**.
3. Depois filtra por **COM**.

Você nunca lê o dicionário inteiro do começo. Você afunila pelo prefixo.

#### A Magia do Autocomplete do Google e Celular
Quando você digita `"prog"` na barra de busca, o mecanismo caminha 4 passos na Trie (`P ➔ R ➔ O ➔ G`) e imediatamente encontra todos os ramos que descem daquele nó: *"programação"*, *"programa do faustão"*, *"prognóstico"*.

#### Key Takeaways
- Ideal para busca de prefixos, corretores ortográficos, autocomplete e roteamento de URLs.
- Não compara strings inteiras: compara um caractere por nível de profundidade.

</details>
