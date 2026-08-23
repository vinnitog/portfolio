---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Portfolio principal — Rota de Evidências

## Escopo e modo

- Alvo: `index.html`
- Modo: Experience
- Público: recrutadores, lideranças de engenharia, times de produto e potenciais colaboradores.
- Trabalho do visitante: compreender rapidamente o posicionamento, reconhecer a amplitude end-to-end, explorar um case e seguir para GitHub ou LinkedIn.

## Direção aprovada

- Comp aprovado: `.impeccable/mocks/mix-rota-evidencias-revisada.png`
- Mundo: dossiê editorial claro com uma rota técnica contínua.
- Memória central: uma linha parte de Quality Engineering, atravessa Database, Backend, APIs e Frontend e se ramifica nos cases TX Raio-X e RDP Pro.
- Identidade pessoal: nome compacto no cabeçalho e avatar de 48–64 px; nunca competir com a proposta profissional.
- Movimento: a rota progride uma vez e responde a foco/ponteiro; `prefers-reduced-motion` mantém tudo visível e estático.

## Sistema extraído do comp

- Ground amostrado: `#F9F6F5`; ink amostrado: `#07111E`; route amostrada: `#05543D`.
- Acentos de projeto: coral `#E35D3F` e âmbar `#E5A52C`.
- Tipografia: grotesca variável comprimida no display; sans humanista no corpo; display 72–96 px no desktop, 44–58 px no mobile; corpo 16–19 px; navegação 15–17 px.
- Componentes: regras de 1 px, nós circulares, tabs de projeto com canto recortado, botões retangulares de raio 8 px; elevação só nos painéis de evidência com sombra suave e deslocada.
- Densidade: um hero dominante, uma pausa editorial e seções de prova com ritmos alternados; sem bento grid ou coleção de cards iguais.

## Inventário de fidelidade

| Ingrediente | Compromisso | Meio de implementação |
|---|---|---|
| Cabeçalho | Nome discreto, navegação e avatar mínimo | HTML/CSS + raster existente `assets/avatar-vinicius.jpg` |
| Resumo de abertura | Trajetória informal como principal âncora de leitura; `h1` permanece sr-only | HTML semântico + fonte self-hosted |
| Rota e nós | Pipeline contínua de oito etapas com pulso e evidência móvel | SVG inline responsivo + botões semânticos |
| Ícones técnicos | Traço uniforme, sem emoji | SVG inline autorado |
| Evidência ativa | Painel único ligado ao nó em foco | HTML/CSS/JS; conteúdo real por camada |
| Projetos | VerbaJus como case principal e cinco projetos em ledger compacto | Lista e links semânticos + CSS responsivo |
| Movimento | Desenho inicial da rota e realce contextual | CSS/JS, removido sob reduced motion |
| Conteúdo posterior | Experiência, método, competências, projetos e contato | HTML semântico no mesmo mundo editorial |

## Restrições

- Não inventar métricas, resultados, depoimentos ou estados de validação.
- Não transformar o mapa em dashboard ou infográfico apertado.
- Mobile usa rota vertical e mantém a sequência compreensível.
- WCAG 2.2 AA, teclado, foco visível, touch targets e movimento reduzido.
- O comp é referência estrutural; textos rasterizados, pequenos status decorativos e imperfeições de geração não serão literalizados.
