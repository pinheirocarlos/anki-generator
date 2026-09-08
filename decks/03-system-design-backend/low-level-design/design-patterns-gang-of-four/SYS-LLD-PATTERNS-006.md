---
id: SYS-LLD-PATTERNS-006
title: "Intuição Fundamental de Design Patterns (GoF): As Plantas Arquitetônicas Padronizadas"
tags:
  - level::l2-fundamental
  - topic::sys::lld
  - company::google
  - freq::high
---

## Pergunta
Qual é a intuição fundamental de por que usamos padrões de projeto (Design Patterns do GoF) e como eles fornecem um vocabulário comum para engenheiros de software?

## Resposta
### Quick Answer
**Solução Direta**:
- Em vez de reinventar a roda toda vez que surge um problema de design recorrente no código, usamos **Design Patterns** (soluções elegantes e testadas pelo tempo):
  - **Criacionais (ex: Factory / Builder)**: Criam objetos complexos passo a passo sem poluir o código com construtores gigantes.
  - **Estruturais (ex: Adapter / Decorator)**: Adaptam interfaces incompatíveis ou adicionam novos comportamentos sem alterar a classe original.
  - **Comportamentais (ex: Strategy / Observer)**: Permitem trocar algoritmos em tempo de execução (Strategy) ou notificar múltiplos ouvintes quando algo muda (Observer).
- Funcionam como plantas arquitetônicas: quando um engenheiro diz *"usamos uma Strategy aqui"*, todos entendem instantaneamente a estrutura sem precisar ler 500 linhas de código.

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">As 3 Famílias de Design Patterns (GoF)</text>

  <!-- Criacionais -->
  <g transform="translate(30, 50)">
    <rect x="0" y="0" width="165" height="95" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="82" y="22" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">1. Criacionais</text>
    <text x="82" y="44" fill="#f8fafc" font-size="9" text-anchor="middle">Factory, Builder, Singleton</text>
    <text x="82" y="66" fill="#64748b" font-size="8" text-anchor="middle">Como criar objetos</text>
    <text x="82" y="80" fill="#10b981" font-size="9" text-anchor="middle">Evita construtores gigantes</text>
  </g>

  <!-- Estruturais -->
  <g transform="translate(215, 50)">
    <rect x="0" y="0" width="165" height="95" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6" />
    <text x="82" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">2. Estruturais</text>
    <text x="82" y="44" fill="#f8fafc" font-size="9" text-anchor="middle">Adapter, Decorator, Facade</text>
    <text x="82" y="66" fill="#64748b" font-size="8" text-anchor="middle">Como conectar classes</text>
    <text x="82" y="80" fill="#34d399" font-size="9" text-anchor="middle">Adaptação e composição</text>
  </g>

  <!-- Comportamentais -->
  <g transform="translate(400, 50)">
    <rect x="0" y="0" width="165" height="95" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="6" />
    <text x="82" y="22" fill="#fde68a" font-size="11" font-weight="bold" text-anchor="middle">3. Comportamentais</text>
    <text x="82" y="44" fill="#f8fafc" font-size="9" text-anchor="middle">Strategy, Observer, Command</text>
    <text x="82" y="66" fill="#64748b" font-size="8" text-anchor="middle">Como classes conversam</text>
    <text x="82" y="80" fill="#fde68a" font-size="9" text-anchor="middle">Elimina blocos if/else</text>
  </g>

  <text x="300" y="175" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Composição é sempre preferível à herança profunda!</text>
</svg>
<p>Visualização: As três famílias clássicas de Design Patterns do Gang of Four (GoF): Criacionais, Estruturais e Comportamentais.</p>

| Pattern Clássico | Problema que Resolve | Analogia do Cotidiano |
|---|---|---|
| **Strategy** | Elimina `if/else` gigantes para escolher algoritmos | Trocar a rota do GPS de "Carro" para "Bicicleta" sem comprar outro celular. |
| **Adapter** | Conecta duas interfaces que têm assinaturas diferentes | O adaptador de tomada para conectar um plugue de 3 pinos numa tomada de 2 pinos. |
| **Observer** | Notifica múltiplos assinantes de um evento | Se inscrever em um canal do YouTube e receber uma notificação a cada vídeo novo. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo do Pattern Strategy em Ação
Em vez de:
```go
if type == "CREDIT_CARD" { payWithCard() }
else if type == "PIX" { payWithPix() }
```
Usamos:
```go
type PaymentStrategy interface { Pay(amount float64) }
func Process(strategy PaymentStrategy, amount float64) {
    strategy.Pay(amount) // Polimorfismo limpo e extensível
}
```

#### Key Takeaways
- Use padrões para simplificar o design quando o problema real exigir, evitando over-engineering em códigos triviais.

</details>
