# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: HTML, CSS e JavaScript vanilla com Service Worker, conforme recomendação do developer kit para uma experiência estática, rápida, responsiva e simples de publicar.

## Users

- Público primário (confirmado): recrutadores e lideranças de engenharia avaliando experiência, profundidade técnica e aderência a posições de Quality Engineering.
- Públicos secundários (confirmados): times de produto, desenvolvedores e potenciais colaboradores interessados em automação, IA aplicada e ferramentas para desenvolvimento.
- Situação principal (inferida do briefing): visita rápida, muitas vezes pelo celular ou a partir de um link no LinkedIn/GitHub, com necessidade de compreender posicionamento e provas de trabalho em poucos minutos.

## Product Purpose

Apresentar Vinícius Tognoli como QA Engineer com forte atuação em automação, IA e qualidade end-to-end. O portfólio deve transformar uma trajetória que hoje aparece de forma limitada no LinkedIn em uma narrativa clara, verificável e memorável, conduzindo o visitante aos projetos e aos canais de contato.

Sucesso (inferido do briefing): o visitante entende rapidamente o posicionamento, reconhece a amplitude de atuação entre banco de dados e frontend, explora pelo menos um case e segue para LinkedIn, GitHub ou contato por email.

## Positioning

O diferencial confirmado é a combinação de Quality Engineering, automação e desenvolvimento aplicada à validação de produtos inteiros — banco de dados, backend, APIs, integrações e frontend — somada à criação prática de bots e uso de IA para acelerar análise e qualidade.

## Operating Context

- Experiência na Ricochet360 desde setembro de 2019.
- Mais de 10 anos de experiência em tecnologia e qualidade de software.
- Trabalho cotidiano com validação end-to-end, investigação de falhas, critérios de aceitação, riscos, automação, bots e IA aplicada.
- Ecossistema técnico confirmado: JavaScript, TypeScript, Python, SQL/PostgreSQL, Supabase, Playwright, GitHub Actions, PWAs e Edge Functions.

## Capabilities and Constraints

- Site institucional estático, sem login, banco de dados, coleta de dados ou formulário de contato.
- App shell instalável, com arquivos essenciais disponíveis offline por Service Worker.
- Deve ser mobile-first, acessível, responsivo e publicável em hospedagem estática.
- Deve oferecer navegação clara para experiência, projetos e contato.
- Deve oferecer português do Brasil como idioma padrão e tradução integral para inglês americano, preservando a preferência localmente.
- Deve oferecer tema escuro como padrão e tema claro opcional, com alternância acessível e preferência persistida localmente.
- O hero deve apresentar um pipeline de projeto com oito etapas — Descoberta, Privacidade, Desenvolvimento, UI/UX, Code Review, Estratégia QA, Automação e Entrega — adaptado das regras de workflow observadas no `bita-calc`.
- Cada etapa do pipeline deve abrir um único card de evidências conectado ao rótulo ativo; o card acompanha o nó em desktop e entra imediatamente depois dele no fluxo mobile.
- Os ícones da rota são os únicos marcadores, sem círculos de contêiner, pseudo-dots ou halo; um pulso percorre a linha quando movimento é permitido.
- O wordmark, as âncoras internas do menu, o skip link e “Voltar ao início” navegam no documento atual. O retorno pelo rodapé limpa o estado da seção anterior e restaura foco visível no wordmark. Perfis, repositórios, email e demais links externos abrem em nova aba com `noreferrer`.
- Os links externos devem abrir os perfis e repositórios públicos reais fornecidos pelo usuário. Projetos privados devem ser identificados com clareza e oferecer contato por `mailto:vinnitog@gmail.com`, sem encaminhar visitantes para páginas 404.
- Divisores editoriais devem atravessar a viewport com traço pontilhado e um X terminal.
- O app shell `portfolio-v23` deve manter os três frames do runner disponíveis offline e limpar somente versões antigas com o namespace `portfolio-v`.
- Não inventar métricas, clientes, depoimentos ou resultados comerciais.
- O blog é uma evolução futura e não faz parte desta primeira entrega.

## Brand Commitments

- Nome público: Vinícius Tognoli.
- Posicionamento: “QA Engineer com forte atuação em automação, IA e qualidade end-to-end.”
- Headline fornecida: “QA Engineer | Test Automation & AI | End-to-End Quality: Database, Backend, APIs & Frontend | Bots and Developer Tools”.
- Personalidade desejada: clean, profissional, informativa, interativa e lúdica.
- Avatar profissional oficial: `assets/avatar-vinicius.jpg` (fonte original fornecida em `C:\Users\Togszera\Downloads\avatar-togs-gemini.jpg`).
- Idioma principal: português do Brasil, com inglês americano opcional e termos técnicos consolidados preservados quando apropriado.
- A abertura resume a trajetória em tom direto e informal; a experiência na Ricochet360 integra essa narrativa sem uma faixa ou seção introdutória redundante.
- Um personagem pixel art inspirado na referência aprovada percorre a linha inferior do cabeçalho em três frames, guiado pelo progresso e pela direção do scroll, sem interferir no conteúdo e respeitando movimento reduzido.

## Evidence on Hand

- Perfil LinkedIn: https://www.linkedin.com/in/vin%C3%ADcius-tognoli-8b028765/
- Perfil GitHub: https://github.com/vinnitog
- Case TX Raio-X: https://github.com/vinnitog/TX-Raio-X — PWA para traduzir transações EVM, com Supabase Auth, ledger de créditos, Edge Functions, Mercado Pago em ambiente de teste, controles de segurança e testes.
- Case RDP Pro: https://github.com/vinnitog/RDP-Pro — PWA B2B para Registro de Pensamentos em TCC, com experiências distintas para paciente e psicólogo, convites, autenticação, RLS, Edge Functions e compatibilidade de rotas.
- Case VerbaJus: https://github.com/vinnitog/VerbaJus — PWA pronta para uso voltada a cálculos trabalhistas, com autenticação, casos protegidos no Supabase, memória por rubrica, 30 modelos em glossário, assinaturas Stripe, Edge Functions e Sentry. Repositório privado no momento da verificação.
- Projeto Togs Heads Up: https://github.com/vinnitog/togs-heads-up — dashboard PWA em React/Vite para clima, alertas regionais, notícias de Marília-SP e registros de bolas de fogo da NASA/JPL, com estados independentes por fonte.
- Projeto Jogos de Hoje: https://github.com/vinnitog/jogos-de-hoje — PWA mobile-first em JavaScript para agenda, placares, transmissões e competições, com Service Worker e degradação offline.
- Projeto Casa dos Coleus: https://github.com/vinnitog/Casa-dos-Coleus — MVP Node.js de atendimento por regras, catálogo configurável, painel protegido, base para WhatsApp Cloud API e cotações Jadlog. Repositório privado no momento da verificação.
- Texto profissional, experiência atual e lista de competências fornecidos diretamente pelo usuário.
- Avatar quadrado aprovado pelo usuário, versionado em `assets/avatar-vinicius.jpg` e destinado ao hero e aos metadados sociais do portfólio.
- Três frames 288 × 192 do runner, com proveniência individual: `assets/scroll-runner.png`, `assets/scroll-runner-frame-2.png` e `assets/scroll-runner-frame-3.png`.
- Não há métricas de impacto, depoimentos ou cases visuais aprovados; não fabricar esses elementos.

## Product Principles

1. Provar amplitude técnica com detalhes concretos, sem transformar o portfólio em uma lista de buzzwords.
2. Tornar a qualidade end-to-end visível como sistema: dados, backend, APIs e interface fazem parte do mesmo fluxo.
3. Equilibrar credibilidade profissional com interações autorais e memoráveis.
4. Manter conteúdo escaneável para avaliação rápida e profundidade opcional para quem quiser explorar.
5. Priorizar performance, acessibilidade e manutenção simples como demonstrações implícitas de qualidade.

## Accessibility & Inclusion

Meta inferida para esta entrega: WCAG 2.2 AA nas escolhas essenciais de contraste, foco, navegação por teclado, semântica, movimento reduzido e touch targets.
