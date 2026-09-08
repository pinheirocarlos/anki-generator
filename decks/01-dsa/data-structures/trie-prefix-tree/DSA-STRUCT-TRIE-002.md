---
id: DSA-STRUCT-TRIE-002
title: "Operações de Inserção, Busca Exata e Verificação de Prefixo em Trie em O(L)"
tags:
  - level::l3-junior
  - topic::dsa::trie-prefix-tree
  - company::amazon
  - freq::high
---

## Pergunta
Como uma Trie executa as operações de **inserção**, **busca exata** e **`startsWith`** em tempo $O(L)$ proporcional ao tamanho da palavra?

## Resposta
### Quick Answer
**Solução Direta**:
- **`insert(word)`**: Percorre cada caractere da palavra a partir da raiz; se o nó filho para o caractere atual não existe, aloca-o. No último caractere, marca `isEndOfWord = true` ($O(L)$).
- **`search(word)`**: Percorre os nós correspondentes aos caracteres; se algum caractere não existir, retorna `false`. No final, retorna `curr.isEndOfWord` ($O(L)$).
- **`startsWith(prefix)`**: Idêntico ao `search`, mas no final retorna `true` se alcançar o último caractere do prefixo, sem exigir que seja o fim de uma palavra ($O(P)$).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Busca de Prefixo (startsWith) vs Busca de Palavra Completa (search)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="230" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="115" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">startsWith("ca")</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Percorre 'c' → 'a'</text>
    <text x="15" y="60" fill="#34d399" font-size="10">Retorna true se o nó existe</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">search("ca")</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Percorre 'c' → 'a'</text>
      <text x="15" y="60" fill="#f87171" font-size="10">Retorna node.isEndOfWord (false se só "cat")</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Compartilhamento de prefixos reduz drasticamente a redundância na memória</text>

</svg>
<p>Visualização: Comparação entre startsWith (verifica apenas existência do caminho) e search (exige confirmação da flag isEndOfWord).</p>

| Operação em Trie | Critério de Sucesso | Complexidade de Tempo |
|---|---|---|
| **`insert(word)`** | Todos os nós criados + `isEnd=true` | $O(L)$ |
| **`search(word)`** | Caminho existe e `isEnd == true` | $O(L)$ |
| **`startsWith(p)`** | Caminho existe (ignora `isEnd`) | $O(P)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Classe Trie
```java
public class Trie {
  private static class Node {
    Node[] children = new Node[26];
    boolean isEndOfWord = false;
  }

  private final Node root = new Node();

  public void insert(String word) {
    Node curr = root;
    for (char c : word.toCharArray()) {
      int idx = c - 'a';
      if (curr.children[idx] == null) curr.children[idx] = new Node();
      curr = curr.children[idx];
    }
    curr.isEndOfWord = true;
  }

  public boolean search(String word) {
    Node node = findPrefixNode(word);
    return node != null && node.isEndOfWord;
  }

  public boolean startsWith(String prefix) {
    return findPrefixNode(prefix) != null;
  }

  private Node findPrefixNode(String str) {
    Node curr = root;
    for (char c : str.toCharArray()) {
      int idx = c - 'a';
      if (curr.children[idx] == null) return null;
      curr = curr.children[idx];
    }
    return curr;
  }
}
```

#### Key Takeaways
- A operação `startsWith` é a grande vantagem da Trie sobre Tabelas Hash, permitindo consultas instantâneas de prefixos.

</details>
