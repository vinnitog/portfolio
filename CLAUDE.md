# CLAUDE.md - Portfolio

## Workspace Obrigatorio

Use sempre este workspace:

```text
C:\Users\Togszera\Desktop\Portfolio
```

Antes de ler, editar, testar, commitar ou fazer push, confirme que o terminal esta nesse diretorio.

## Contexto Compartilhado

Leia `PROJECT_CONTEXT.md` e `SKILLS.md` antes de alterar o projeto. Eles registram objetivo, stack, capacidades e decisoes iniciais.

## Stack Inicial

```text
HTML + CSS + JavaScript vanilla + Service Worker
```

Motivo:

Para PWA simples, mobile e offline, vanilla reduz build step e facilita deploy estatico.

Alternativas rejeitadas:

React/Vite: valido se surgirem muitas telas/estado. Electron: rejeitado; PWA deve ser tentado primeiro.

Antes da primeira feature real, valide se a stack continua adequada ao objetivo do app.

## Workflow Obrigatorio

Siga sempre esta ordem:

1. Descoberta de produto, quando aplicavel
   - Use `brainstorm-ideas-new` ou `brainstorm-ideas-existing` conforme a maturidade do produto.
   - Use `business-model`, `monetization-strategy` e `pricing-strategy` para decisoes de negocio e preco.

2. Privacidade antes do codigo, quando houver dados pessoais
   - Use `lgpd-legal-basis` em features novas e `lgpd-audit` em auditorias amplas ou sistemas legados.
   - Exija revisao juridica humana nos checkpoints indicados pelas skills.

3. `senior-dev`
   - Use para qualquer ajuste, melhoria, bug, ideia nova, funcionalidade nova ou desenvolvimento.

4. `impeccable`, quando houver front-end
   - Use a skill vendorizada em criacao, redesign, auditoria ou refinamento de interface.
   - Siga o workflow e os limites de verificacao da propria skill.

5. `code-reviewer`
   - Revise minuciosamente alteracoes, riscos, regressao, fluxo quebrado e falta de testes.
   - Corrija o que for necessario antes de QA.

6. `qa-senior`
   - Faca analise de impacto.
   - Defina testes manuais, regressivos e automatizados.
   - Se mexeu em algo existente, teste regressivo e obrigatorio.

7. `qa-automate`
   - Crie ou ajuste testes automatizados com base nos casos definidos pelo QA senior.

8. Validacao final
   - Rode `.\test.cmd` ou `npm.cmd test`.
   - Revise diff e escopo.

9. Git
   - Trabalhe em `develop`.
   - Nunca faca push direto para `main`.
   - Use staging explicito.
   - Commit e push para `develop`.
   - Abra ou atualize PR `develop -> main` para aprovacao.

Se alguma dessas funcoes nao existir como agent real na sessao, execute como etapa explicita e registre no resumo final.

## Windows

No PowerShell, prefira:

```powershell
.\test.cmd
npm.cmd test
```

Nao use `npm test` se houver risco de bloqueio por ExecutionPolicy.

## Browser

Nao use Browser para `file://`, `localhost` ou `127.0.0.1`, salvo pedido explicito. Se aparecer `ERR_BLOCKED_BY_CLIENT`, pare a tentativa visual e cubra a validacao com testes automatizados ou inspecao estatica.

