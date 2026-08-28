# Estratégia de Qualidade — Portfolio

Atualizado em 2026-08-28 para navegação interna do menu e rodapé, pipeline de oito etapas, runner em faixa própria, seção compacta de seis projetos, CI, GitHub Pages e app shell `portfolio-v23`.

## Escopo e riscos

- Conteúdo PT-BR padrão e tradução integral para inglês americano.
- Tema escuro padrão e tema claro persistente.
- Pipeline interativa: Descoberta, Privacidade, Desenvolvimento, UI/UX, Code Review, Estratégia QA, Automação e Entrega.
- Card único de evidências conectado ao rótulo ativo, horizontal no desktop e inserido após a etapa ativa no fluxo compacto.
- Pulso decorativo percorrendo a rota horizontal/vertical.
- Runner pixel art decorativo com três frames 288 × 192 em uma faixa própria na linha inferior do header, posição e direção guiadas por scroll.
- Wordmark, âncoras internas do menu, skip link e “Voltar ao início” permanecem no documento atual; perfis, repositórios, email e demais links externos usam nova aba com `noreferrer`.
- Divisores editoriais curvos e tracejados full-width, inspirados em mapas do tesouro, com terminal em X.
- PWA cache-first com atualização atômica e os três frames disponíveis offline.

Riscos prioritários: sobreposição do card com rótulos, overflow em PT/EN, runner saindo do header, regressão de teclado/ARIA, nova aba sem proteção, animação sob movimento reduzido e mistura de assets entre versões do Service Worker.

## Matriz de casos

| ID | Pri. | Tipo | Verificação | Critério de aceite |
|---|---|---|---|---|
| PIPE-01 ★ | P0 | Node + unit | Parsear os oito controles e os dicionários PT/EN. | Ordem exata aprovada; quatro evidências por etapa; nenhuma chave ausente. |
| PIPE-02 ★ | P0 | Unit | Ativar cada etapa por clique, foco e `pointerenter`; alternar idioma. | Exatamente um `aria-pressed=true`; painel único acompanha a etapa e preserva estado no idioma novo. |
| CARD-01 | P0 | Manual/E2E geométrico | Medir rótulo, conector e painel em 390, 768, 1050/1051 e 1440 px, PT/EN e zoom 200%. | Card fica abaixo do rótulo correspondente, sem cobrir texto, cortar conteúdo ou gerar overflow. |
| PIPE-03 ★ | P0 | Node | Procurar endpoints/CTAs antigos e chaves órfãs. | Ausência de `project-destination`, `route-actions`, `route.explore` e `experience.period`; projetos continuam na seção própria. |
| PRJ-01 ★ | P0/P1 | Node + manual | Validar a seção Projetos em PT/EN e 390/1050/1440px. | Um VerbaJus em destaque, cinco linhas editoriais, quatro links públicos seguros e dois projetos privados com contato, sem cards gigantes repetidos ou overflow. |
| PULSE-01 ★ | P1 | Node + manual | Conferir markup, motion gate e percurso horizontal/vertical. | Um único pulso percorre a trilha sem encobrir ícones/rótulos e deixa de animar em reduced motion. |
| ICON-01 | P1 | Manual | Inspecionar os oito nós em dark/light. | Somente SVGs ficam visíveis; não há círculos, pseudo-dots ou halos atrás dos ícones. |
| LINK-01 ★ | P0 | Node | Inspecionar todos os anchors. | Wordmark, links internos do menu e “Voltar ao início” não usam `_blank`/`noreferrer` e levam às seções corretas; links externos preservam nova aba segura. |
| MAIL-01 ★ | P0 | Node + manual | Validar `mailto:vinnitog@gmail.com`. | Email é visível, acessível e abre o compositor sem substituir a aba do portfólio. |
| DIV-01 ★ | P1 | Node + manual | Inspecionar `.section::before/::after` em dark/light e mobile. | Caminho SVG mascarado é curvo, tracejado, mede 100vw, não cria scroll horizontal e termina em X com contraste suficiente. |
| HERO-ALIGN-01 ★ | P1 | Node + manual | Comparar resumo, título e introdução da pipeline em desktop e layout compacto. | Os três blocos compartilham o mesmo gutter; abaixo de 1050px o recuo zera em conjunto. |
| RUN-01 ★ | P0 | Node | Validar markup, dimensões, alpha e proveniência dos frames. | Um runner `aria-hidden`; três PNGs 288 × 192, não vazios, com `.origin.txt`. |
| RUN-02 ★ | P0 | Unit | Simular scroll crescente/decrescente. | Sequência frame 1 → 2 → 3 → 1 e reverso determinística; direção muda somente com `abs(delta) > 1`. |
| RUN-03 ★ | P0 | Unit + CSS | Variar `scrollY`, altura da página, largura do header e resize. | X é finito, monotônico, limitado a `headerWidth - runnerWidth`, recalculado por RAF e o personagem permanece na faixa abaixo dos controles. |
| RUN-04 ★ | P1 | Unit com relógio falso | Gerar rajadas e avançar 159/160 ms. | Scroll coalesce em um RAF; `is-running` sai aos 160 ms do último movimento significativo. |
| MOT-01 ★ | P0 | Unit + CSS | Carregar com `prefers-reduced-motion: reduce`. | Runner fica oculto e não instala listeners/RAF/timers; pulso não executa ciclo perceptível. |
| THEME-01 ★ | P0 | Unit | Limpar/corromper storage e alternar dark/light. | Dark/PT são padrões; preferências persistem separadamente; `theme-color` e ARIA sincronizam. |
| I18N-01 ★ | P0 | Unit | Alternar PT → EN → PT em todos os elementos, metadados, ARIA e pipeline. | Paridade total, `pt-BR`/`en-US`, sem `undefined`, duplicação ou perda da etapa ativa. |
| NAV-01 ★ | P0 | Unit + teclado | Operar menu compacto, Escape, links e resize. | `aria-expanded`, label e classe sincronizam; Escape devolve foco somente quando necessário. |
| BACK-01 ★ | P1 | Unit + teclado | Ativar “Voltar ao início” após Contato estar atual. | Navega para `#inicio`, limpa `aria-current` obsoleto e restaura foco no wordmark visível sem novo scroll. |
| AX-01 ★ | P0 | Node | Validar landmarks, IDs, headings, ARIA e elementos decorativos. | Um `h1.sr-only`; referências resolvidas; SVGs/runner não duplicam conteúdo assistivo. |
| CT-01 ★ | P0 | Node | Conferir fatos, links, email e ausência de claims inventados. | Conteúdo aprovado permanece; não entram métricas, prêmios ou resultados sem fonte. |
| CI-01 ★ | P0 | Node | Inspecionar gatilhos e permissões do workflow de validação. | Push em `develop` e PR para `main` executam a suíte com acesso somente de leitura e sem permissão de deploy. |
| SW23-01 ★ | P0 | Unit SW | Instalar `portfolio-v23` em cache vazio. | `addAll` precede `skipWaiting`; app shell contém HTML/CSS/JS, manifest, ícones, avatar, fontes e três frames. |
| SW23-02 ★ | P0 | Unit SW | Ativar sobre cache anterior e responder offline. | Somente caches antigos `portfolio-v*` são removidos; caches de outros projetos permanecem, clientes são reivindicados e respostas cacheadas dispensam rede. |
| VP-390 | P0 | Manual visual | Percorrer a página e operar menu, pipeline, preferências, projetos e contato. | Sem corte, sobreposição impeditiva ou scroll horizontal; alvos e foco continuam alcançáveis. |
| VP-1440 | P0 | Manual visual | Operar oito etapas e scroll no primeiro viewport. | Pipeline horizontal, card e runner permanecem alinhados e não competem com o conteúdo/menu. |

`★` indica cobertura automatizada em `unit/*.test.js` quando aplicável.

## Estado automatizado

- Comando preferencial no Windows: `.\test.cmd`.
- Resultado final desta mudança: **77/77 testes passando**.
- `node --check script.js` e `node --check tools\visual-check.mjs` passam.
- A suíte cobre pipeline, i18n, temas, seção compacta de seis projetos, workflows de CI e GitHub Pages, navegação interna do menu/rodapé, links externos/email, alinhamento do hero, rotas divisórias curvas, três frames, faixa e bounds do header, reduced motion e `portfolio-v23`.

## Validação manual pendente

A inspeção visual automatizada local não foi concluída porque o servidor não estava ativo (`ERR_CONNECTION_REFUSED`); conforme `AGENTS.md`, a tentativa não foi repetida. Permanecem como inspeção manual: geometria renderizada do conector/card em todos os nós, cadência visual dos três frames, pulso e X em ambos os temas, expansão PT/EN, abertura real das novas abas e do cliente de email.

VerbaJus e Casa dos Coleus estavam privados na verificação de 2026-08-28. Enquanto permanecerem assim, o portfólio deve apresentar o status privado e uma ação de contato, nunca um link anônimo para o repositório.

## Critérios de saída

- Todos os P0 automatizados passam e não há regressão P1 conhecida.
- Nenhum artefato vigente menciona pipeline de quatro nós, endpoints antigos, runner fixo, idle de 140 ms ou cache anterior como vigente.
- App shell v23 instala atomicamente com os três frames disponíveis offline e preserva caches sem o namespace do portfólio.
- Mudanças permanecem limitadas ao pedido e a documentação acompanha o comportamento entregue.
