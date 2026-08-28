import { svgWrapper } from '../cs-svg-base.js';

export const RUNTIMES_SVGS = {
  // === memory-allocation-escape-analysis ===
  'CS-RNT-ALLOC-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Alocação de Memória: Stack vs Heap</text>
  <g transform="translate(50, 48)">
    <!-- Stack -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="135" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Stack Allocation (Pilha)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Custo de Alocação: O(1) (Apenas move RSP)</text>
    <text x="135" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Desalocação Gratuita no retorno da função</text>
    <text x="135" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Localidade de Cache L1/L2 perfeita | Sem GC</text>

    <!-- Heap -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="445" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Heap Allocation (Monte)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Custo de Alocação: Gerenciamento de blocos livres</text>
    <text x="445" y="60" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Exige Garbage Collection ou free() manual</text>
    <text x="445" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Risco de fragmentação e pressão sobre o GC</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Alocar na Stack é dezenas de vezes mais rápido que alocar na Heap em qualquer linguagem moderna.</text>
`),

  'CS-RNT-ALLOC-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Análise de Escape (Escape Analysis) no Compilador</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">O Compilador rastreia se o ciclo de vida do objeto ultrapassa o escopo da função</text>
    <text x="280" y="45" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">NÃO escapa (Uso local) → Alocado 100% na Stack (Zero overhead de GC)</text>
    <text x="280" y="65" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">ESCAPA (Retorna ponteiro, interface{}, closure) → Move objeto para a Heap ("escapes to heap")</text>
  </g>
  <text x="340" y="155" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">No Go: inspecione decisões com 'go build -gcflags="-m"'; reduza escapes para zerar pausas de runtime.</text>
`),

  'CS-RNT-ALLOC-003': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Reutilização de Objetos com sync.Pool no Go</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="280" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">sync.Pool: Cache de objetos concorrente thread-safe sem travas globais</text>
    <text x="280" y="45" fill="#f8fafc" font-size="10" text-anchor="middle">Pede com pool.Get() e devolve com pool.Put(buf) após o uso.</text>
    <text x="280" y="65" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Recicla buffers de bytes e structs reduzindo a taxa de novas alocações na Heap a quase ZERO.</text>
  </g>
  <text x="340" y="155" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Atenção: Objetos no pool são limpos automaticamente pelo GC a cada ciclo; não use para conexões persistentes.</text>
`),

  // === go-runtime-gc ===
  'CS-RNT-GO-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Coletor Tricolor Concorrente (Tri-Color Mark-Sweep) do Go</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#64748b"/>
    <text x="85" y="22" fill="#cbd5e1" font-size="11" font-weight="bold" text-anchor="middle">Branco (White)</text>
    <text x="85" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Objetos não visitados</text>
    <text x="85" y="60" fill="#fca5a5" font-size="9" font-weight="bold" text-anchor="middle">Candidatos a Coleta</text>

    <rect x="195" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="280" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Cinza (Grey)</text>
    <text x="280" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Alcançáveis / Na Fila</text>
    <text x="280" y="60" fill="#fef3c7" font-size="9" font-weight="bold" text-anchor="middle">Filhos ainda não varridos</text>

    <rect x="390" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#10b981"/>
    <text x="475" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Preto (Black)</text>
    <text x="475" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Vivos e Confirmados</text>
    <text x="475" y="60" fill="#a7f3d0" font-size="9" font-weight="bold" text-anchor="middle">Todos os filhos verificados</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Write Barrier (Write Barrier Híbrido) previne que ponteiros pretos apontem para brancos sem passar por cinza.</text>
`),

  'CS-RNT-GO-001': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Modelo GMP do Go Runtime: Goroutines (G), Threads (M) e Processadores (P)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#38bdf8"/>
    <text x="85" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">G (Goroutine)</text>
    <text x="85" y="44" fill="#f8fafc" font-size="9" text-anchor="middle">Stack de 2 KB + PC + status</text>
    <text x="85" y="60" fill="#a7f3d0" font-size="9" text-anchor="middle">Milhões em memória</text>

    <rect x="195" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#10b981"/>
    <text x="280" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">P (Processador Lógico)</text>
    <text x="280" y="44" fill="#f8fafc" font-size="9" text-anchor="middle">Recurso de Execução</text>
    <text x="280" y="60" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">GOMAXPROCS (Fila Local LRQ)</text>

    <rect x="390" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="475" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">M (OS Thread Real)</text>
    <text x="475" y="44" fill="#f8fafc" font-size="9" text-anchor="middle">Thread do Kernel do Linux</text>
    <text x="475" y="60" fill="#fef3c7" font-size="9" text-anchor="middle">Executa instruções na CPU</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Work-Stealing: Se a fila local de um P esvazia, ele rouba 50% das Goroutines da fila de outro processador em O(1).</text>
`),

  'CS-RNT-GO-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Tuning de GC no Go: GOGC e GOMEMLIMIT (Go 1.19+)</text>
  <g transform="translate(50, 48)">
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">GOGC (Padrão 100)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Dispara GC quando a Heap cresce 100%</text>
    <text x="135" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">Problema: Não sabe o limite de RAM do contêiner</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Causa OOM Kills em picos de tráfego</text>

    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">GOMEMLIMIT (Soft Memory Limit)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Define teto de memória (ex: GOMEMLIMIT=3800MiB)</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Ajusta o GC dinamicamente para evitar OOM</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Permite elevar GOGC para economizar CPU</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Boas Práticas em Kubernetes: Defina GOMEMLIMIT em ~90% do Memory Limit do Pod.</text>
`),

  // === jvm-memory-gc ===
  'CS-RNT-JVM-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Layout de Memória da JVM: Heap, Metaspace e Stacks</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="200" height="75" rx="5" fill="#065f46" stroke="#10b981"/>
    <text x="100" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">JVM Heap (-Xmx / -Xms)</text>
    <text x="100" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Objetos e Arrays</text>
    <text x="100" y="58" fill="#a7f3d0" font-size="9" text-anchor="middle">Gerenciado pelo Garbage Collector</text>

    <rect x="215" y="0" width="160" height="75" rx="5" fill="#1e3a8a" stroke="#3b82f6"/>
    <text x="295" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Metaspace (Off-Heap)</text>
    <text x="295" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Metadados de Classes</text>
    <text x="295" y="58" fill="#bae6fd" font-size="9" text-anchor="middle">Alocado na RAM nativa</text>

    <rect x="390" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="475" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Thread Stacks (-Xss)</text>
    <text x="475" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">~1 MB por thread nativa</text>
    <text x="475" y="58" fill="#fef3c7" font-size="9" text-anchor="middle">Frames, primitivos e referências</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">O consumo total de RAM da JVM = Heap + Metaspace + (Threads × Xss) + Code Cache + Direct Buffers.</text>
`),

  'CS-RNT-JVM-001': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Coletores Modernos da JVM: G1GC vs ZGC (Pausas Sub-Milissegundo)</text>
  <g transform="translate(50, 48)">
    <!-- G1GC -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">G1GC (Garbage-First - Padrão)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Divide heap em ~2048 regiões independentes</text>
    <text x="135" y="60" fill="#a7f3d0" font-size="10" text-anchor="middle">Pausas STW controladas (-XX:MaxGCPauseMillis)</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Pausas típicas: ~10 a 50 ms</text>

    <!-- ZGC -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">ZGC / Generational ZGC (Ultra-Low Latency)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Colored Pointers &amp; Load Barriers concorrentes</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Pausas STW estritamente &lt; 1 ms para Heaps até 16 TB!</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Ideal para Trading, Bancos e Serviços Críticos</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">No Java 21 LTS: Ative com '-XX:+UseZGC -XX:+ZGenerational' para eliminar pausas perceptíveis de Garbage Collection.</text>
`),

  'CS-RNT-JVM-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Hipótese Geracional Fraca: A Maioria dos Objetos Morre Jovem</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="260" height="80" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="130" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Young Generation (Eden + Survivor)</text>
    <text x="130" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">>95% dos objetos morrem logo após criação</text>
    <text x="130" y="62" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Minor GC rápido (Copia sobreviventes em O(Vivos))</text>

    <rect x="300" y="0" width="260" height="80" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="430" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Old Generation (Tenured)</text>
    <text x="430" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Objetos promovidos após sobreviver a N ciclos</text>
    <text x="430" y="62" fill="#fef3c7" font-size="10" text-anchor="middle">Major / Full GC mais pesado e espaçado</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">A separação geracional evita que o coletor precise varrer a memória inteira a cada ciclo de alocação.</text>
`),

  'CS-RNT-JVM-003': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fases do GC e SafePoints: Pausas Stop-The-World (STW)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="280" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">SafePoint: Ponto no código onde todas as threads da JVM pausam com segurança</text>
    <text x="280" y="45" fill="#f8fafc" font-size="10" text-anchor="middle">Permite ao coletor inspecionar raízes (Stack Roots) e mover objetos na memória sem race conditions.</text>
    <text x="280" y="65" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Cuidado com SafePoint Bias: Laços não-contáveis (int loops) podem demorar para atingir o SafePoint.</text>
  </g>
  <text x="340" y="155" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Coletores modernos tornam a grande maioria das fases (Mark e Relocate) concorrentes, reduzindo o STW a frações de ms.</text>
`)
};
