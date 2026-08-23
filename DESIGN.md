---
name: "Portfólio de Vinícius Tognoli"
description: "Um dossiê editorial técnico que transforma qualidade end-to-end em uma rota contínua de evidências."
colors:
  route-green: "#05543d"
  route-mist: "#dbe8e3"
  project-coral: "#d95036"
  project-amber: "#956000"
  paper: "#f9f6f5"
  raised-paper: "#fffdfb"
  technical-ink: "#07111e"
  softened-ink: "#42505c"
  editorial-rule: "#aab0ae"
  night-paper: "#0f1719"
  night-raised-paper: "#172326"
  night-technical-ink: "#e8eeec"
  night-softened-ink: "#b5c2be"
  night-route-green: "#78c9aa"
  night-route-mist: "#29463e"
  night-project-coral: "#ff8069"
  night-project-amber: "#e2b86b"
  night-editorial-rule: "#53645f"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(1.8rem, 3.2vw, 3.15rem)"
    fontWeight: 530
    lineHeight: 1.22
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.8rem, 6vw, 5.5rem)"
    fontWeight: 720
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.6rem)"
    fontWeight: 730
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  pipeline-title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(1.45rem, 2.25vw, 2.2rem)"
    fontWeight: 720
    lineHeight: 0.98
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1rem, 1.45vw, 1.24rem)"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 650
    lineHeight: 1
rounded:
  button: "8px"
  evidence: "12px"
  diagram: "16px"
  pill: "999px"
spacing:
  tight: "0.55rem"
  compact: "0.75rem"
  component: "1rem"
  comfortable: "1.25rem"
  layout: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.night-route-green}"
    textColor: "{colors.night-raised-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0.75rem 1.25rem"
    height: "3.25rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.night-route-green}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0.75rem 1.25rem"
    height: "3.25rem"
  evidence-panel:
    backgroundColor: "{colors.night-raised-paper}"
    textColor: "{colors.night-softened-ink}"
    rounded: "{rounded.evidence}"
    padding: "1rem 1.1rem"
  technical-tag:
    backgroundColor: "transparent"
    textColor: "{colors.night-technical-ink}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 0.75rem"
  language-switcher:
    backgroundColor: "{colors.night-raised-paper}"
    textColor: "{colors.night-softened-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0.2rem 0.3rem"
    height: "2.8rem"
  language-switcher-active:
    backgroundColor: "{colors.night-route-mist}"
    textColor: "{colors.night-route-green}"
    typography: "{typography.label}"
    rounded: "5px"
    size: "2.75rem"
  theme-toggle:
    backgroundColor: "{colors.night-raised-paper}"
    textColor: "{colors.night-route-green}"
    rounded: "{rounded.pill}"
    size: "2.8rem"
  scroll-runner:
    width: "clamp(3.4rem, 4.1vw, 4.25rem)"
---

# Design System: Portfólio de Vinícius Tognoli

## Overview

**Creative North Star: "O Mapa de Evidências"**

O Mapa de Evidências trata o portfólio como um dossiê editorial percorrível: a qualidade nasce em uma rota contínua, atravessa as camadas técnicas e desemboca em trabalho verificável. A interface é clara e arejada, mas não neutra; linhas, ícones técnicos, diagramas e recortes fazem a estrutura carregar a personalidade.

A voz visual é editorial técnica, precisa e humana, com ludicidade contida. A densidade alterna uma abertura dominante com pausas generosas e seções de prova ritmadas por regras finas, evitando tanto a frieza de um dashboard quanto a repetição de uma grade de cards genéricos.

Nome e avatar funcionam como assinatura discreta. Um resumo informal abre a conversa, a rota organiza as camadas e os projetos lideram a prova; o `h1` existe para estrutura e leitores de tela, não como peça visual. O scroll runner pixel art adiciona presença autoral ao progresso sem subir acima do conteúdo.

**Key Characteristics:**

- Hierarquia conduzida por proposta, rota técnica e projetos verificáveis.
- Campo noturno por padrão, papel quente opcional e verde de rota como eixo persistente.
- Geometria editorial de rotas curvas tracejadas, ícones técnicos sem contêiner circular e um X terminal nas divisões de seção.
- Elevação estrutural reservada ao painel de evidências e aos diagramas que realmente precisam de separação.
- Movimento breve, controlado por scroll e integralmente removível.
- Preferências bilíngues e de tema tratadas como parte persistente da experiência, não como decoração do cabeçalho.

## Colors

A paleta usa o campo noturno como apresentação padrão e oferece o papel quente como alternativa clara. Em ambos, o verde institucional conduz a rota; o âmbar marca foco, pulso e destino, enquanto o coral permanece um acento secundário reservado.

### Primary

- **Verde de Rota** (#05543d): conduz linhas, nós ativos, títulos funcionais, links prioritários e ações primárias.
- **Névoa de Rota** (#dbe8e3): sustenta trilhas inativas e divisões suaves ligadas ao percurso.

### Secondary

- **Coral de Projeto** (#d95036): acento secundário reservado a evidências visuais futuras e verificadas; não conduz a navegação nem diferencia as linhas do ledger atual.

### Tertiary

- **Âmbar de Evidência** (#956000): sustenta focos visíveis, o pulso da rota, o X terminal e pequenos marcadores de atenção.

### Neutral

- **Papel Editorial** (#f9f6f5): campo principal contínuo da experiência.
- **Papel Elevado** (#fffdfb): superfícies que precisam se separar do campo sem parecer modais.
- **Tinta Técnica** (#07111e): títulos, contornos fortes e conteúdo de máxima hierarquia.
- **Tinta Suavizada** (#42505c): corpo, explicações e metadados secundários.
- **Regra Editorial** (#aab0ae): divisores, bordas discretas e estrutura tabular.

### Default Dark Theme

O tema escuro é o estado inicial, inclusive quando storage está vazio, inválido ou indisponível. Ele mantém os mesmos papéis semânticos e a mesma hierarquia, trocando papel por superfícies azul-esverdeadas profundas e clareando rota, acentos, tinta e regras para preservar contraste; light só entra por escolha explícita persistida.

- **Papel Noturno** (#0f1719): campo principal do tema escuro e cor do navegador via `theme-color`.
- **Papel Noturno Elevado** (#172326): controles e evidências que precisam se separar do campo.
- **Tinta Técnica Noturna** (#e8eeec): títulos, conteúdo principal e contornos de maior contraste.
- **Tinta Suavizada Noturna** (#b5c2be): corpo, descrições e metadados secundários.
- **Verde de Rota Noturno** (#78c9aa): rota, links, nós ativos e ações primárias sobre superfícies escuras.
- **Névoa de Rota Noturna** (#29463e): trilhas e estado ativo do seletor de idioma.
- **Coral de Projeto Noturno** (#ff8069): equivalente noturno do acento secundário reservado.
- **Âmbar de Evidência Noturno** (#e2b86b): pulso, X terminal e foco visível no escuro.
- **Regra Editorial Noturna** (#53645f): bordas, divisores e estrutura linear no escuro.

### Named Rules

**The Route Owns Attention Rule.** O verde de rota conduz interação e estrutura; ele não vira preenchimento decorativo em grandes áreas.

**The Project Accent Rule.** Âmbar comunica foco, progresso ou destino; coral só entra com uma evidência visual aprovada. Nenhum dos dois substitui o Verde de Rota nem cria categorias artificiais entre projetos.

**The Semantic Theme Rule.** O tema escuro remapeia papéis, não inverte a página: cada superfície, tinta, regra, rota e acento recebe seu equivalente noturno explícito, sem filtros globais nem perda da assinatura editorial.

**The Instant Palette Rule.** A troca entre dark e light é imediata: cores, fundos, bordas e sombras não recebem transição. Movimento continua reservado a relações espaciais, navegação e ao scroll runner.

## Typography

**Display Font:** Archivo (with sans-serif)

**Body Font:** Manrope (with sans-serif)

**Character:** Archivo comprime e dá autoridade editorial às proposições, enquanto Manrope mantém leitura humana, aberta e precisa. O contraste vem de escala, peso e espaço — não de excesso de famílias tipográficas.

### Hierarchy

- **Display** (peso 530, `clamp(1.8rem, 3.2vw, 3.15rem)`, entrelinha 1.22): resumo informal visível do primeiro viewport, limitado a 37 caracteres por linha e com `text-wrap: pretty`.
- **Headline** (peso 720, `clamp(2.8rem, 6vw, 5.5rem)`, entrelinha 0.98): títulos de seção com até aproximadamente 13–15 caracteres por linha visual.
- **Title** (peso 730, `clamp(2rem, 4vw, 3.6rem)`, entrelinha 0.98): cargos, projetos e blocos internos que iniciam uma evidência.
- **Body** (peso 400, `clamp(1rem, 1.45vw, 1.24rem)`, entrelinha 1.65): explicação contínua, normalmente limitada a 56–62 caracteres por linha.
- **Label** (peso 650, 0.9rem, entrelinha 1): navegação, nós, metadados e ações compactas.

### Named Rules

**The Proposition Before Identity Rule.** O resumo informal, a rota e as evidências conduzem a abertura; nome, avatar e metadados pessoais permanecem compactos. O único `h1` é `.sr-only`, traduzível e sem duplicação visual.

**The Bilingual Fit Rule.** Português do Brasil e inglês americano têm a mesma autoridade visual. Títulos podem rebalancear linhas, enquanto botões e evidências usam `overflow-wrap: anywhere` e nunca dependem de uma largura rígida que corte a tradução.

## Layout

O sistema usa um contêiner fluido de 94% da viewport limitado a 1480px, reduzido para 90% e 42rem abaixo de 760px. O desktop alterna composições assimétricas de duas colunas, rotas horizontais e grandes intervalos verticais; o conteúdo não se converte em uma grade uniforme de módulos.

As seções recebem respiro vertical fluido entre 6rem e 11rem e terminam em caminhos SVG curvos, tracejados e responsivos que atravessam 100vw como rotas de mapa do tesouro. Um X âmbar de 1.15rem fecha cada percurso no lado direito. O hero combina resumo informal e pipeline alinhados pelo mesmo gutter fluido, sem uma seção Sobre ou faixa de experiência intermediária; Experiência é a primeira seção editorial seguinte. Cabeçalhos combinam texto dominante com contexto lateral. Projetos apresenta VerbaJus como único case principal e comprime TX Raio-X, RDP Pro, Togs Heads Up, Jogos de Hoje e Casa dos Coleus em um índice editorial linear; listas de competência mantêm uma estrutura fácil de varrer.

Em até 1050px, a rota passa a ser vertical e os layouts principais colapsam para uma coluna. O índice de projetos passa de quatro para duas colunas. Em até 760px, a navegação vira um menu explícito, ações ocupam a largura disponível, o case principal e cada linha de projeto preservam a sequência vertical, e os alvos táteis mantêm pelo menos 48px de altura.

Os controles PT/EN e sol/lua permanecem agrupados após os links e o avatar no cabeçalho. No menu mobile, o grupo ocupa uma linha própria com margem segura; nenhuma tradução pode criar rolagem horizontal. Em grids e flex layouts, colunas textuais preservam `minmax(0, 1fr)` e conteúdo variável quebra de forma segura; a validação deve cobrir expansão entre idiomas, palavras técnicas longas e zoom de texto sem clipping ou sobreposição.

O scroll runner é absoluto dentro do header sticky e percorre somente a largura calculada do cabeçalho, alinhado à sua regra inferior. O header reserva uma faixa inferior exclusiva com 7rem de altura total e 1.75rem de padding inferior no desktop; em mobile usa 6rem e 1.35rem. Os controles permanecem centralizados acima dessa faixa, e o runner em `z-index: 1` nunca cruza os textos, intercepta navegação ou abandona a linha.

**The Expansion Without Compression Rule.** Texto traduzido pode aumentar a altura do componente, mas não pode reduzir alvos táteis, escapar do contêiner ou ser truncado para preservar uma composição fixa.

## Elevation & Depth

A profundidade é híbrida, estrutural e discreta. O campo, as seções e a maior parte do conteúdo permanecem planos, separados por contraste tonal e regras; sombras entram apenas para destacar o painel de evidência e diagramas que precisam se separar do campo.

### Shadow Vocabulary

- **Evidência Estrutural** (`box-shadow: 0 16px 35px rgba(7, 17, 30, 0.12)`): painel contextual associado ao nó ativo.
- **Evidência Estrutural Noturna** (`box-shadow: 0 18px 40px rgba(0, 0, 0, 0.38)`): substitui a elevação da evidência no tema escuro.
- **Sombra Pixel** (`filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.34))`): separa o sprite da regra do header sem transformar o runner em superfície elevada.

### Named Rules

**The Structural Lift Rule.** Uma sombra deve explicar hierarquia, seleção ou conexão; superfícies comuns continuam planas.

## Shapes

A linguagem combina precisão linear e pontos de passagem táteis. Regras e conectores têm 1–3px; os ícones técnicos são SVGs sem círculo de contêiner, pseudo-dot ou halo. Botões e o seletor segmentado de idioma usam cantos moderados de 8px; o estado ativo de idioma usa 5px; o botão de tema é circular. Painéis de evidência usam 12px quando a separação espacial é necessária. O X terminal dos divisores é construído por duas diagonais âmbar, não por glyph ou imagem.

Ícones são SVGs autorados de traço uniforme, com terminações e junções arredondadas; emoji e iconografia preenchida não fazem parte do sistema.

## Components

### Hero Summary

A abertura visual é um parágrafo informal em Archivo, peso 530, entrelinha 1.22 e largura máxima de 37ch. Ele traduz a trajetória sem se apresentar como slogan. O único `h1` é `.sr-only`, fornece estrutura semântica e acompanha PT/EN; não deve reaparecer como headline visual nem ser seguido por uma seção Sobre redundante.

### Buttons

Táteis, seguros e diretos, sem acabamento brilhante.

- **Shape:** retângulo de cantos moderados (8px), altura mínima de 3.25rem e preenchimento de 0.75rem por 1.25rem.
- **Primary:** fundo Verde de Rota, texto em Papel Elevado e peso 750 para ações de progressão.
- **Hover / Focus:** deslocamento vertical de 2px no hover; foco âmbar de 3px com afastamento de 4px; a ação primária usa #033f2e no light e #95d9bf no dark, sem transição cromática entre temas.
- **Secondary:** fundo transparente, contorno e texto em Verde de Rota; no hover, recebe o preenchimento primário.

### Chips

Compactos e informativos, nunca decorativos.

- **Style:** fundo transparente, borda de 1px em Regra Editorial, formato pílula e texto de 0.78rem com peso 750.
- **State:** representam tecnologias confirmadas e não possuem seleção ou estado inventado.

### Project Feature + Ledger

A seção Projetos evita repetir seis cards grandes. VerbaJus ocupa um destaque editorial único, dividido entre narrativa e metadados, com regras superior e inferior e sem fundo de card. Os outros cinco projetos formam uma lista linear separada por regras finas: nome, resumo verificável, stack e ação externa. Em até 1050px cada linha usa duas colunas; em até 760px vira uma coluna, preservando a ordem semântica. O ledger expõe semântica de lista, e cada ação possui nome acessível específico do projeto, além de `target="_blank"` e `noreferrer`.

### Cards / Containers

Contêineres existem para evidência, não como unidade padrão de toda seção.

- **Corner Style:** evidências usam 12px; diagramas usam 16px.
- **Background:** Papel Elevado para evidências; diagramas usam uma variação quente local (#f2eee9).
- **Shadow Strategy:** somente os papéis definidos em Elevation & Depth recebem sombra.
- **Border:** 1px em Tinta Suavizada ou Regra Editorial quando a estrutura precisa permanecer visível.
- **Internal Padding:** de 1rem em evidências compactas a 3.5rem por 2rem em diagramas amplos.

### Navigation

O cabeçalho é uma regra editorial sticky com nome compacto, links espaçados, avatar circular de 2.8rem e controles de preferência agrupados. Links usam peso 650 e revelam uma linha Verde de Rota de 2px no hover ou estado atual; o wordmark e as âncoras internas do menu navegam no documento atual e preservam o scroll suave, enquanto perfis e demais destinos externos abrem em nova aba com `noreferrer`. Em mobile, o menu se torna uma lista de largura integral sob o cabeçalho, acionada por um botão circular de 3rem, e os controles permanecem alcançáveis dentro do menu. O contato direto usa `mailto:vinnitog@gmail.com` com o contrato de nova aba. No rodapé, “Voltar ao início” reutiliza `#inicio`, limpa o `aria-current` da seção anterior e devolve o foco ao wordmark visível sem provocar um segundo scroll.

### Preference Controls

Os controles são compactos, táteis e integralmente acessíveis; seus estados visuais repetem os papéis semânticos do sistema.

- **Language:** PT e EN vivem em um grupo segmentado de 2.8rem de altura, com botões mínimos de 2.75rem, peso 750 e `aria-pressed`; o idioma ativo recebe Névoa de Rota e Verde de Rota. Português do Brasil é o padrão, e a troca atualiza conteúdo, labels acessíveis, título, metadados sociais e a evidência ativa.
- **Theme:** o alternador é um botão circular de 2.8rem com ícones SVG autorados de sol e lua. O ícone visível reflete o tema atual, `aria-pressed` comunica o estado escuro e o label anuncia a ação seguinte. Tema escuro é o padrão; light é opcional. Todos os tokens semânticos e o `theme-color` mudam imediatamente, sem transição de cor, fundo, borda ou sombra.
- **Persistence:** idioma e tema são armazenados em `portfolio_language` e `portfolio_theme`. A restauração essencial acontece antes do stylesheet para evitar flash de preferência incorreta; se `localStorage` estiver indisponível, os controles continuam funcionais durante a sessão.
- **Motion:** a troca de tema não anima. Transições permanecem apenas em transformações de hover, sublinhado de navegação e opacidade/movimento do runner; `prefers-reduced-motion` remove movimento não essencial.

**The Preference Before Paint Rule.** Tema e idioma persistidos são aplicados antes da pintura sempre que o armazenamento estiver disponível; falha de persistência nunca bloqueia conteúdo ou controles.

### Route Stage

O pipeline é o componente assinatura e adapta as regras de workflow observadas no `bita-calc` em oito etapas: Descoberta, Privacidade, Desenvolvimento, UI/UX, Code Review, Estratégia QA, Automação e Entrega. Cada nó usa um ícone técnico de 3.5rem sem círculo de contêiner; o ícone é o único marcador e não existe pseudo-dot, preenchimento auxiliar ou halo. Hover e seleção elevam o ícone em 0.2rem e mudam o traço para âmbar.

Foco, ponteiro e clique ativam o nó, atualizam `aria-pressed`, trocam título e quatro itens no `aria-live` e movem o painel único de evidências para imediatamente depois do nó ativo. No desktop, `--evidence-x` ancora o card de até 14rem sob o rótulo correspondente e um conector tracejado de 4.5rem explicita a relação; na rota vertical, a ordem do DOM coloca o card logo depois da etapa ativa, sem duplicar conteúdo. Trocar PT/EN preserva a etapa ativa e apenas traduz sua evidência.

Um pulso âmbar percorre a trilha em 4.8s quando `.has-motion` está presente: horizontal no desktop e vertical abaixo de 1050px. Ele é decorativo, fica dentro da linha e deixa de animar sob movimento reduzido.

### Scroll Runner

O runner é um personagem pixel art decorativo composto por três PNGs de 288 × 192 px que materializam o progresso da leitura em uma faixa exclusiva na linha inferior do header sem competir ou passar atrás dos controles.

- **Scale:** desktop usa `clamp(3.4rem, 4.1vw, 4.25rem)` com `bottom: -0.18rem`; até 760px usa 3.1rem e `bottom: -0.15rem`.
- **Layering:** o container é absoluto dentro do header, ocupa `z-index: 1`, fica abaixo dos demais filhos em `z-index: 2` e usa `pointer-events: none`.
- **Visibility:** fica em opacidade 0.36 no estado inicial, recebe 0.72 após 8px de scroll e chega a 0.95 enquanto corre; o trail usa opacidade 0.62 somente em movimento.
- **Frames:** `scroll-runner.png`, `scroll-runner-frame-2.png` e `scroll-runner-frame-3.png` alternam a cada 28px de scroll significativo; os dois frames adicionais são pré-carregados.
- **Direction & Progress:** a posição horizontal acompanha `scrollY / scrollRange` dentro da largura real do header; deltas maiores que 1 invertem direção, trail e sprite.
- **Scheduling:** scroll passivo e resize compartilham um único `requestAnimationFrame`; o estado `is-running` termina 160ms após o último render.
- **Reduced Motion:** quando `prefers-reduced-motion: reduce` está ativo, o setup não registra listeners e o CSS remove o runner por completo.
- **Offline:** os três PNGs e os demais arquivos essenciais pertencem ao app shell `portfolio-v22`; cada frame mantém proveniência individual e a limpeza preserva caches externos ao namespace `portfolio-v`.

## Do's and Don'ts

### Do:

- **Do** preserve o pipeline de oito etapas e a conexão visual entre cada rótulo ativo e seu card de evidências.
- **Do** use tipografia de display para proposições e títulos, mantendo corpo e controles em Manrope.
- **Do** reserve sombras para evidência ativa, destino ou outro papel estrutural equivalente.
- **Do** keep estados de foco visíveis, alvos táteis seguros e todo o conteúdo estático sob `prefers-reduced-motion`.
- **Do** let conteúdo real, tecnologias confirmadas e links verificáveis liderarem a composição.
- **Do** remap todos os papéis semânticos no tema escuro, incluindo superfícies, tinta, rota, acentos, regras, sombras e `theme-color`.
- **Do** preserve preferências de PT/EN e claro/escuro sem tornar `localStorage` uma dependência para usar o portfólio.
- **Do** test traduções, palavras técnicas e zoom com `overflow-wrap: anywhere` nos controles e evidências suscetíveis a expansão.
- **Do** keep o painel de evidências único, traduzido e fisicamente associado ao nó ativo em desktop e mobile.
- **Do** apply dark como padrão e trocar a paleta instantaneamente, preservando light apenas como preferência explícita.
- **Do** keep o `h1` semanticamente disponível em `.sr-only` e deixar o resumo informal conduzir o primeiro viewport.
- **Do** keep o runner na regra inferior do header, limitado à largura do cabeçalho e alternando os três frames conforme o scroll.

### Don't:

- **Don't** turn o sistema em dashboard, bento grid ou coleção de cards idênticos.
- **Don't** let nome, avatar ou ornamentação competir com resumo, rota, camadas e projetos.
- **Don't** invent métricas, selos, status, depoimentos ou evidências para preencher espaço.
- **Don't** use emoji, ícones de estilos misturados ou grandes massas de coral e âmbar.
- **Don't** add sombra a superfícies comuns quando regra, espaço ou contraste tonal resolvem a hierarquia.
- **Don't** invert, dessaturate ou filtrar a interface inteira para simular tema escuro.
- **Don't** truncate traduções ou encolher controles abaixo do alvo tátil para preservar uma linha.
- **Don't** duplicate painéis de evidência por etapa; um único painel acompanha a seleção e mantém `aria-live` coerente.
- **Don't** reintroduce seção Sobre, Experience Rail, pseudo-dots ou halo nos Route Stages.
- **Don't** animate cores, fundos, bordas ou sombras durante a troca de tema.
- **Don't** fix o runner no viewport, deixá-lo escapar da largura do header ou permitir que ele capture ponteiro.
