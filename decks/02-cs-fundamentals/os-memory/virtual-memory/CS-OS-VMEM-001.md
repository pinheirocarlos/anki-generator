---
id: CS-OS-VMEM-001
title: "TLB (Translation Lookaside Buffer) e Adoção de HugePages"
tags:
  - level::l4-pleno
  - topic::cs::os-memory
  - company::netflix
  - freq::high
---

## Pergunta
O que é o **TLB (Translation Lookaside Buffer)** e por que bancos de dados de alta performance adotam **HugePages** de 2 MB ou 1 GB?

## Resposta
### Quick Answer
**Solução Direta**:
- **TLB (Translation Lookaside Buffer)**: É um cache associativo ultra-rápido de silício na CPU que memoriza as traduções recentes de *Endereço Virtual $\to$ Endereço Físico*.
  - *TLB Hit*: Tradução resolvida em **~0.5 a 1 ns** (1 ciclo de clock).
  - *TLB Miss*: Exige percorrer a tabela de páginas de 4 níveis na RAM (*Page Table Walk*), custando **~50 a 100 ns**.
- **O Problema com Páginas Padrão de 4 KB**: Um servidor com 256 GB de RAM possui **67 milhões de páginas de 4 KB**. Como o TLB da CPU só guarda ~1.500 a 3.000 entradas, grandes bancos de dados sofrem com taxas massivas de TLB Miss.
- **HugePages (2 MB / 1 GB)**: Reduz a quantidade total de entradas necessárias em até $512\times$ (para 2 MB) ou $262.144\times$ (para 1 GB), garantindo que quase todo o *Buffer Pool* caiba nas entradas do TLB, acelerando o throughput do banco em **10% a 30%**.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">TLB (Translation Lookaside Buffer) e HugePages (2 MB / 1 GB)</text>
  <g transform="translate(50, 48)">
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f59e0b"/>
    <text x="135" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Páginas Padrão de 4 KB</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">64 GB RAM = 16.000.000 páginas</text>
    <text x="135" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">TLB Miss frequente em bancos de dados</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Page Table Walk de 4 níveis consome ciclos</text>

    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">HugePages (2 MB ou 1 GB)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">64 GB RAM = apenas 32.000 páginas de 2MB</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">TLB Hit rate sobe para ~99.9%!</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Padrão em PostgreSQL, Oracle, Redis</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">HugePages reduzem drasticamente a sobrecarga de tradução de endereços da MMU em heap pesados.</text>

</svg>
<p>Visualização: Impacto de HugePages (2 MB / 1 GB) vs páginas padrão de 4 KB na redução dramática de entradas na TLB e mitigação de Page Walks caros.</p>

| Configuração de Página | Quantidade de Entradas para 64 GB | Cobertura Típica do TLB |
|---|---|---|
| **Página Padrão (4 KB)** | 16.777.216 páginas | < 0.1% da memória cabe no TLB |
| **HugePage (2 MB)** | 32.768 páginas | Quase 100% mapeável com poucas entradas |
| **HugePage (1 GB)** | 64 páginas | 100% no TLB (Zero TLB Misses) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Habilitar HugePages no Linux para PostgreSQL / Redis
```bash
# Reserva 2048 HugePages de 2 MB (Total de 4 GB dedicados):
sudo sysctl -w vm.nr_hugepages=2048

# Verifica a alocação de HugePages no sistema:
grep -i HugePages /proc/meminfo
```

#### Key Takeaways
- **Transparent Huge Pages (THP)** do kernel Linux tenta alocar páginas de 2 MB automaticamente, mas frequentemente causa picos de latência (*latency spikes*) em bancos de dados devido à compactação síncrona de memória; bancos como Redis e MongoDB recomendam desabilitar THP e usar HugePages estáticas.

</details>
