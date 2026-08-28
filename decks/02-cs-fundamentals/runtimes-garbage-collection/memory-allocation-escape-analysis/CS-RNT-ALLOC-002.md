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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Análise de Escape (Escape Analysis) no Compilador</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">O Compilador rastreia se o ciclo de vida do objeto ultrapassa o escopo da função</text>
    <text x="280" y="45" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">NÃO escapa (Uso local) → Alocado 100% na Stack (Zero overhead de GC)</text>
    <text x="280" y="65" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">ESCAPA (Retorna ponteiro, interface{}, closure) → Move objeto para a Heap ("escapes to heap")</text>
  </g>
  <text x="340" y="155" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">No Go: inspecione decisões com 'go build -gcflags="-m"'; reduza escapes para zerar pausas de runtime.</text>

</svg>

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
