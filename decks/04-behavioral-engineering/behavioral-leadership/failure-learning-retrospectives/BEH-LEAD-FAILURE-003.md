---
id: BEH-LEAD-FAILURE-003
title: "Estruturação de Resposta para 'Fale Sobre uma Falha Grave' em Entrevistas"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
Como estruturar uma resposta de alto impacto para a pergunta de entrevista *"Fale sobre uma falha técnica grave que você cometeu"*?

## Resposta
### Quick Answer
**Solução Direta**:
- **Os 4 Componentes de uma Resposta de Alto Impacto**:
  1. **Escolha de um Erro Real e Relevante**: Evite respostas clichês (ex: *"meu erro é ser perfeccionista"*). Escolha um erro técnico real em que você tenha sido protagonista.
  2. **Assumir Total Responsabilidade (Ownership)**: Sem transferir culpa para terceiros ou sistemas legados.
  3. **Ação Imediata de Mitigação**: Demonstrar calma e velocidade para estancar o sangramento em minutos (rollback, alerta, contenção).
  4. **Prevenção Sistêmica Definitiva**: Explicar os testes automatizados, guardrails e processos implementados para garantir que o erro nunca mais se repita.

### Dual Coding Visual
| Etapa da Resposta | Postura Esperada | O que Evitar |
|---|---|---|
| **Apresentação do Erro** | Transparência e assunção de autoria | Culpar colegas ou infraestrutura |
| **Mitigação & Resolução** | Foco em velocidade e foco no cliente | Paralisia ou tentativa de ocultar |
| **Lições Aprendidas** | Criação de guardrails e testes no CI | Dizer apenas que "ficou mais atento" |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo no Modelo STAR
```text
[S] "No deploy de uma nova tabela, esqueci de adicionar timeout na conexão com o banco."
[T] "O tráfego de pico saturou as threads do servidor e causou erro 504 no checkout."
[A] "Assumi o incidente, fiz o rollback em 4 minutos e restabeleci o serviço. Em seguida,
     configurei timeout padrão na biblioteca de banco e adicionei teste de carga no CI."
[R] "O sistema suportou a Black Friday com zero outages e o teste evitou 3 bugs semelhantes."
```

#### Key Takeaways
- Entrevistadores utilizam perguntas sobre erros para avaliar maturidade emocional, humildade intelectual e a capacidade do candidato de transformar falhas em melhorias estruturais.

</details>
