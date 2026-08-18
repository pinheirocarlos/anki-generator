# Phase 0 Research: Atomic Flashcards, Multimedia Integration & Foundations Tier

**Feature**: `002-atomic-media-foundations` | **Date**: 2026-08-17

---

## 1. Atomic Flashcard Decomposition Strategy (Piotr Wozniak / SuperMemo Principles)

### Decision
Decompor sistematicamente todas as perguntas compostas em cartões uniconceituais (*single-concept cards*), onde a pergunta contém exatamente uma proposição interrogativa e a resposta primária (`Quick Answer`) pode ser avaliada com precisão em menos de 15 a 30 segundos.

### Rationale
- O algoritmo de repetição espaçada (SM-2 / FSRS) calcula intervalos baseado na retenção do cartão como um todo. Quando um cartão avalia 3 conceitos simultaneamente (ex: *Lock-Based vs Lock-Free* + *Problema ABA* + *LMAX Disruptor*), o estudante entra em um impasse de feedback se souber 2 conceitos e esquecer 1.
- Cartões atômicos reduzem o atrito mental e tornam o estudo em momentos de ociosidade (*mobile commuting*) viável e prazeroso.

### Alternatives Considered
- **Manter cartões compostos com bullet points de avaliação parcial**: Rejeitado porque o Anki não suporta pontuação parcial por cartão; degradaria as estatísticas de retenção do usuário.
- **Usar Cloze Deletion (Omissão de Palavras)**: Rejeitado para o modelo principal porque a retenção ativa baseada em perguntas conceituais (*Question-Answer*) estimula síntese mental superior para entrevistas técnicas do que apenas preencher lacunas de palavras.

---

## 2. Dual Coding & Visual Asset Standard (Micro-Vídeos & SVGs Responsivos)

### Decision
Estabelecer um pipeline de curadoria e injeção visual baseado na hierarquia estrita de 3 níveis:
1. **P1 - Micro-Vídeos em Loop (HTTPS)**: Trechos de 3 a 15 segundos em WebM/MP4 sem áudio com atributos `autoplay loop muted playsinline webkit-playsinline disableRemotePlayback` para processos dinâmicos (ex: rotações de árvores balanceadas, transições de estado TCP, particionamento de streams, algoritmos de ordenação).
2. **P2 - SVGs Vetoriais Declarativos com `viewBox`**: Diagramas estruturais responsivos com cores adaptáveis aos temas claro/escuro (`var(--text-primary)`, `var(--border-color)`), largura 100% e altura automática.
3. **P3 - Tabelas Markdown Compactas**: Utilizadas exclusivamente como resumo comparativo rápido (máximo 2 a 3 colunas) e sempre complementando ou servindo de fallback a uma mídia conceitual.

### Rationale
- A Teoria do Duplo Código (Paivio) estabelece que a informação processada simultaneamente pelos canais visual e verbal fixa na memória de longo prazo com o dobro da taxa de retenção.
- Micro-vídeos em loop transmitem fluxos temporais de forma imediata sem exigir leitura de parágrafos densos de texto.
- Manter vídeos hospedados remotamente em HTTPS preserva o arquivo `.apkg` leve e abaixo dos limites do AnkiWeb.

### Alternatives Considered
- **GIFs pesados embutidos no pacote local**: Rejeitado devido ao tamanho excessivo de arquivos GIF (>5MB por animação), o que saturaria a cota de 250MB do AnkiWeb e aumentaria o tempo de sincronização.
- **Diagramas Mermaid renderizados em runtime via JavaScript**: Rejeitado porque a Constituição v1.4.0 exige **zero JavaScript em runtime** no AnkiDroid/AnkiMobile para garantir 0ms de latência e compatibilidade 100% estática.

---

## 3. Foundations Tier (`level::l2-fundamental`) Architecture

### Decision
Introduzir formalmente o nível `level::l2-fundamental` como a porta de entrada obrigatória para cada subtópico do syllabus.

### Pedagogical Anatomy of L2 Cards
1. **Intuição Primeiro (Zero Jargão Prévio)**: Começa sempre explicando o problema real do mundo físico que motivou a invenção daquela tecnologia ou estrutura de dados.
2. **Analogia Concreta do Cotidiano**: Exemplos palpáveis (ex: cache como post-it na mesa vs estante na biblioteca; B-Tree como índice telefônico ou sumário de enciclopédia; Raft como votação de condomínio).
3. **Sem Sobrecarga de Código ou Fórmulas**: Não apresenta código complexo nem provas assintóticas pesadas; foca em *"Por que isso existe?"* e *"Qual o fluxo básico?"*.

### Rationale
- Candidatos com lacunas em ciência da computação ou engenheiros em transição sentem extrema dificuldade ao serem expostos diretamente a detalhes de implementação (`l4-pleno`) sem antes dominar o modelo mental básico.
- O nível `l2-fundamental` permite nivelamento suave e constrói a fundação necessária para que os níveis `l3-junior`, `l4-pleno` e `l5-senior` façam sentido imediato.
