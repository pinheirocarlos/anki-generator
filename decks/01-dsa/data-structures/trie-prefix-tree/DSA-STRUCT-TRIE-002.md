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
