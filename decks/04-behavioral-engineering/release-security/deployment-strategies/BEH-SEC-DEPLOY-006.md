---
id: BEH-SEC-DEPLOY-006
title: "Intuição Fundamental de Estratégias de Deploy: Atualizar Sistemas em Voo sem Derrubar Usuários"
tags:
  - level::l2-fundamental
  - topic::behavioral::release-security
  - company::netflix
  - freq::high
---

## Pergunta
Qual é a intuição fundamental por trás das estratégias de deploy modernas (Blue-Green, Canary, Rolling Updates e Feature Flags)?

## Resposta
### Quick Answer
**Solução Direta**:
- Em engenharia de software de alta escala, **"janelas de manutenção com sistema fora do ar" são inaceitáveis**:
  - **A Metáfora do Avião**: O software precisa ser reformado enquanto está em pleno voo com passageiros a bordo.
  - **As 4 Principais Estratégias**:
    - **Blue-Green**: Manter dois ambientes idênticos (Blue = versão antiga no ar; Green = versão nova pronta). O roteador de tráfego troca 100% dos usuários em 1 segundo. Rollback instantâneo.
    - **Canary Release**: Direcionar uma pequena fatia de usuários reais (ex: 2%) para a nova versão. Se métricas de erro subirem, aborta-se; se estiver estável, expande-se gradualmente para 100%.
    - **Rolling Update**: Substituir pods/instâncias antigas por novas uma a uma em lote (ex: 25% por vez) dentro do cluster Kubernetes.
    - **Feature Flags**: Separar o *Deploy de Código* (subir o binário para os servidores) do *Release de Negócio* (ligar a funcionalidade para os usuários via painel).

### Dual Coding Visual
<svg viewBox="0 0 600 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="230" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Comparativo das Estratégias de Lançamento Zero-Downtime</text>

  <!-- Blue Green -->
  <g transform="translate(25, 45)">
    <rect x="0" y="0" width="165" height="120" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="8" />
    <text x="82" y="24" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">Blue-Green Deploy</text>
    <text x="82" y="46" fill="#f8fafc" font-size="10" text-anchor="middle">Troca Instantânea (100%)</text>
    <text x="82" y="68" fill="#64748b" font-size="9" text-anchor="middle">Blue (v1): Ativo</text>
    <text x="82" y="86" fill="#10b981" font-size="9" text-anchor="middle">Green (v2): Pronto</text>
    <text x="82" y="104" fill="#93c5fd" font-size="9" text-anchor="middle">Rollback em 1 clique</text>
  </g>

  <!-- Canary -->
  <g transform="translate(210, 45)">
    <rect x="0" y="0" width="175" height="120" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="8" />
    <text x="87" y="24" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Canary Release (Canário)</text>
    <text x="87" y="46" fill="#ffffff" font-size="10" text-anchor="middle">Exposição Progressiva</text>
    <text x="87" y="68" fill="#34d399" font-size="9" text-anchor="middle">98% tráfego na v1 estável</text>
    <text x="87" y="86" fill="#f59e0b" font-size="9" text-anchor="middle">2% tráfego na v2 teste</text>
    <text x="87" y="104" fill="#a7f3d0" font-size="9" text-anchor="middle">Monitora erros antes de 100%</text>
  </g>

  <!-- Feature Flags -->
  <g transform="translate(405, 45)">
    <rect x="0" y="0" width="170" height="120" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="8" />
    <text x="85" y="24" fill="#fde68a" font-size="11" font-weight="bold" text-anchor="middle">Feature Flags</text>
    <text x="85" y="46" fill="#f8fafc" font-size="10" text-anchor="middle">Deploy ≠ Release</text>
    <text x="85" y="68" fill="#fbbf24" font-size="9" text-anchor="middle">Código dorme desligado</text>
    <text x="85" y="86" fill="#fbbf24" font-size="9" text-anchor="middle">Ativação por usuário/região</text>
    <text x="85" y="104" fill="#fde68a" font-size="9" text-anchor="middle">Kill switch instantâneo</text>
  </g>

  <text x="300" y="195" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">O segredo do deploy moderno é reduzir o raio de impacto de qualquer eventual bug.</text>
</svg>

| Estratégia | Mecânica Operacional | Vantagem Decisiva |
|---|---|---|
| **Blue-Green** | Dois ambientes completos idênticos com troca instantânea de rota | Rollback em 1 clique caso surja anomalia |
| **Canary** | Direciona 1% a 5% do tráfego para a nova versão antes de 100% | Limita o impacto de falhas a um grupo minúsculo |
| **Rolling Update** | Atualiza instâncias/pods em lotes sequenciais no cluster | Custo zero de infraestrutura duplicada |
| **Feature Flag** | Desacopla o deploy físico do release comercial para usuários | Ativação/desativação imediata sem novo build |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Origem Histórica do Nome "Canary"
O termo *Canary* vem dos mineiros de carvão do século XIX, que levavam canários para o fundo das minas: como os pássaros eram muito mais sensíveis ao gás tóxico inodoro do que os humanos, se o canário parasse de cantar, os mineiros sabiam que precisavam evacuar imediatamente. No software, os 2% dos usuários funcionam como o canário: se apresentarem erros 500, a automação aborta o lançamento antes de afetar os outros 98%.

#### Key Takeaways
- Desacoplar o deploy de infraestrutura da ativação do recurso para o usuário é a prática de engenharia que mais acelera a entrega de software sem sacrificar a estabilidade.

</details>
