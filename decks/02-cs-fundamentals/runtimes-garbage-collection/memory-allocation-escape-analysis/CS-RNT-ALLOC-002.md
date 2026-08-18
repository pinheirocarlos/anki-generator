---
id: CS-RNT-ALLOC-002
title: "Análise de Escape (Escape Analysis) e Otimizações do Compilador"
tags:
  - level::l3-junior
  - topic::cs::runtimes
  - company::google
  - freq::high
---

## Pergunta
O que é **Análise de Escape (Escape Analysis)** e como o compilador determina se uma variável pode ficar na Stack ou deve escapar para o Heap?

## Resposta
### Quick Answer
**Solução Direta**:
- **Escape Analysis**: É uma análise estática realizada pelo compilador durante a compilação do código para determinar se o escopo de uma variável ou ponteiro **escapa** dos limites da função onde foi declarada.
- **Regras de Decisão**:
  - **Não Escapa $\to$ Aloca na Stack**: Se o objeto for usado apenas dentro do método e nenhuma referência a ele for acessível após o método retornar.
  - **Escapa $\to$ Aloca no Heap**:
    1. Retornar um ponteiro ou referência para uma variável local.
    2. Atribuir a variável a uma struct global ou campo de objeto de vida mais longa.
    3. Passar a variável para parâmetros do tipo interface (`interface{}` / `any` em Go).
    4. O tamanho da variável é dinâmico ou grande demais para a Stack.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/runtimes/escape-analysis-stack-heap-loop.webm">
    <p>Visualização: Ponteiros que não escapam do escopo da função são alocados diretamente no stack frame sem overhead de GC.</p>
  </video>
</div>

| Padrão de Código | O Objeto Escapa? | Local de Alocação |
|---|---|---|
| `func f() int { x := 10; return x }` | **Não** (Retorna cópia por valor) | **Stack** |
| `func f() *int { x := 10; return &x }` | **Sim** (Ponteiro sobrevive à função) | **Heap (GC)** |
| `fmt.Println(x)` | **Sim** (Passa para interface `any`) | **Heap (GC)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Inspecionar a Análise de Escape em Go
```bash
# Compila exibindo os diagnósticos de otimização e flags de escape:
go build -gcflags="-m" main.go

# Saída típica do compilador:
# ./main.go:8:6: &x escapes to heap
# ./main.go:7:2: moved to heap: x
```

#### Key Takeaways
- Em Go, diferentemente de C, retornar um ponteiro para uma variável local declarada dentro da função é 100% seguro: o compilador detecta o escape e promove a variável para o Heap automaticamente.

</details>
