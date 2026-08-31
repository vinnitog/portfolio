# PROJECT_CONTEXT.md - Portfolio

Gerado em: 2026-08-22 13:20:43

## Descricao

Portfólio profissional de Vinícius Tognoli, QA Engineer especializado em automação, IA e qualidade end-to-end.

## Objetivo

Apresentar posicionamento profissional, experiência, competências e projetos de forma clara, interativa, acessível e responsiva.

## Publico Alvo

Recrutadores, lideranças de engenharia, times de produto e potenciais colaboradores.

## Caracteristicas Informadas

- Interface visual: Sim
- Login/autenticacao: Nao
- Banco de dados: Nao
- Offline/PWA: Sim, com app shell estatico instalavel `portfolio-v24` e navegacao principal disponivel offline
- Mobile: Sim
- Dashboard/graficos: Nao
- API propria: Nao
- Integracoes externas: Nao
- Multiusuario: Nao
- Dados pessoais/LGPD: Nao

## Stack Escolhida

```text
HTML + CSS + JavaScript vanilla + Service Worker
```

## Motivo Da Stack

Para PWA simples, mobile e offline, vanilla reduz build step e facilita deploy estatico.

## Alternativas Rejeitadas

React/Vite: valido se surgirem muitas telas/estado. Electron: rejeitado; PWA deve ser tentado primeiro.

## Revisao Obrigatoria De Stack

Antes da primeira feature real, o `senior-dev` deve validar se a stack escolhida ainda faz sentido.

Se houver front-end, `impeccable` deve conduzir a criacao ou revisao visual e de UX.

Se houver tratamento de dados pessoais, `lgpd-legal-basis` deve entrar antes da implementacao; para auditoria ampla, use `lgpd-audit`.

O `code-reviewer` deve apontar risco de stack inadequada, excesso de complexidade ou falta de base para evolucao.

## Workflow Padrao

1. Skills de descoberta/negocio, quando aplicavel
2. Skills LGPD antes do codigo, quando houver dados pessoais
3. `senior-dev`
4. `impeccable`, quando houver front-end
5. `code-reviewer`
6. `qa-senior`
7. `qa-automate`
8. Validacao final com testes e diff
9. Commit/push em `develop` e PR `develop -> main`

## Comandos De Validacao

```powershell
.\test.cmd
npm.cmd test
git diff --check
```

## Notas De Escopo

- Trabalhar sempre em `develop`.
- Nunca fazer push direto para `main`.
- Preservar alteracoes existentes do usuario.
- Fazer staging explicito por arquivo.
- Manter documentacao de contexto versionada neste arquivo.

## Contrato Atual Da Interface

- Tema escuro por padrao; tema claro opcional. PT-BR por padrao; EN-US opcional. As duas preferencias persistem de forma independente.
- Hero com resumo profissional informal e um unico `h1` visualmente oculto para semantica.
- Pipeline de oito etapas, adaptado das regras observadas no `bita-calc`: Descoberta, Privacidade, Desenvolvimento, UI/UX, Code Review, Estrategia QA, Automacao e Entrega.
- Cada etapa ativa move um unico card de evidencias para baixo do rotulo correspondente; em mobile, o card entra no fluxo logo depois do no ativo.
- A rota usa icones SVG sem circulos de container, pseudo-dots ou halo e inclui um pulso horizontal/vertical somente quando movimento e permitido.
- Secoes editoriais sao separadas por caminhos curvos e tracejados full-width, inspirados em mapas do tesouro e finalizados por um X terminal.
- Runner pixel art decorativo com tres frames 288 x 192 em uma faixa exclusiva na linha inferior do header, sem cruzar os textos do menu, guiado por progresso e direcao do scroll, com RAF compartilhado, idle de 160 ms e remocao completa sob `prefers-reduced-motion: reduce`.
- O wordmark, as ancoras internas do menu, o skip link e "Voltar ao inicio" navegam no documento atual. Ao retornar pelo rodape, o tracking limpa a secao anterior e o foco volta ao wordmark visivel. Perfis, repositorios, email e demais links externos abrem em nova aba com `noreferrer`. Os contatos abrem o compositor web do Gmail ja enderecado a `vinnitog@gmail.com`, com assunto contextual.
- A secao Projetos usa um unico case principal para o VerbaJus, pronto para uso, seguido por um indice editorial compacto com TX Raio-X, RDP Pro, Togs Heads Up, Jogos de Hoje e Casa dos Coleus. Repositorios publicos permanecem externos e seguros; VerbaJus e Casa dos Coleus sao identificados como privados e oferecem contato sem encaminhar visitantes para paginas 404.
- App shell `portfolio-v24` precacheia os tres PNGs do runner e seus demais assets essenciais; cada PNG tem arquivo de proveniencia. A ativacao remove somente caches antigos com o prefixo `portfolio-v`, preservando caches de outros projetos na mesma origem GitHub Pages.

