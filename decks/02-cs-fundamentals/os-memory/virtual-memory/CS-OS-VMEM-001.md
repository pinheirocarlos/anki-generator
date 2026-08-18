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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/os/virtual-memory-tlb-translation-loop.webm">
    <p>Visualização: Cache L1 de traduções na MMU e uso de HugePages (2MB/1GB) aumentando a área de memória por entrada da TLB.</p>
  </video>
</div>

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
