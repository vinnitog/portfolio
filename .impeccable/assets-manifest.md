# Manifesto de assets — `index.html`

Estado sincronizado em 2026-08-23. A interface permanece predominantemente semântica; texto, pipeline, ícones, divisores, estados, cards e diagramas não devem ser rasterizados.

| Asset | Meio | Uso e dimensão | Proveniência | Estado vigente |
|---|---|---|---|---|
| Estrutura editorial, pipeline e diagramas | HTML/CSS/SVG inline | Conteúdo fluido; pipeline horizontal no desktop e vertical no mobile | Implementação autorada a partir do brief aprovado e das regras de workflow observadas no `bita-calc` | **Semântico.** Oito etapas, ícones sem círculo de contêiner, pulso, card conectado ao rótulo e divisores tracejados full-width com X. |
| Comp `mix-rota-evidencias-revisada.png` | PNG de referência | 1537×1023; fora do runtime | Sidecars `.prompt.txt` e `.json` | **Referência somente.** Não publicar, precachear ou usar como background. |
| `assets/avatar-vinicius.jpg` | JPEG master | 2048×2048; fonte arquival | Fornecido e aprovado pelo usuário; `.origin.txt` registrado | **Arquival.** Não pertence ao app shell. |
| `assets/avatar-vinicius-128.jpg` | JPEG derivado | 128×128; avatar circular no header | Derivado do master; `.origin.txt` registrado | **Runtime e app shell v22.** |
| `assets/social-card.png` | PNG derivado | 1200×630; Open Graph | Exportação controlada com proveniência registrada | **Runtime.** Ligado às metatags sociais. |
| `assets/icon.svg` | SVG autorado | `viewBox 0 0 512 512`; favicon e fonte dos ícones PWA | Vetor original do projeto | **Runtime e app shell v22.** |
| `assets/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | PNGs derivados | 192×192, 512×512 e 512×512 maskable | Exportações determinísticas do SVG; proveniência individual | **Runtime e app shell v22.** Declarados no manifest. |
| `assets/scroll-runner.png` | PNG pixel art | 288×192; primeiro frame na faixa inferior exclusiva do header | Referência visual fornecida pelo usuário, normalizada por `tools/build-assets.py`; `.origin.txt` registrado | **Runtime e app shell v22.** |
| `assets/scroll-runner-frame-2.png` | PNG pixel art | 288×192; segundo frame do ciclo | Gerado com OpenAI ImageGen a partir do primeiro frame; transparência e dimensão normalizadas; `.origin.txt` registrado | **Runtime e app shell v22.** Pré-carregado pelo JS. |
| `assets/scroll-runner-frame-3.png` | PNG pixel art | 288×192; terceiro frame do ciclo | Gerado com OpenAI ImageGen a partir dos frames anteriores; transparência e dimensão normalizadas; `.origin.txt` registrado | **Runtime e app shell v22.** Pré-carregado pelo JS. |
| Archivo e Manrope | WOFF2 runtime + TTF arquival | Display e corpo | Famílias sob SIL OFL 1.1; licenças versionadas | **Runtime otimizado.** WOFF2 no app shell v22; TTF mantido como fonte-mãe. |

## Contrato do runner

- Os três frames medem exatamente 288×192 e alternam conforme o scroll significativo; não formam spritesheet.
- O runner é decorativo, `aria-hidden`, `pointer-events: none` e absoluto em uma faixa inferior exclusiva dentro do header, nunca fixo no viewport nem sobre os textos do menu.
- `prefers-reduced-motion: reduce` impede listeners/RAF/timer e remove o runner visualmente.
- O idle ocorre 160ms após o último render de movimento.

## Gate de mídia

- Obrigatório: manter proveniência individual dos três frames, avatar derivado, social card, ícones e fontes.
- Obrigatório: manter os três PNGs do runner no `APP_SHELL` de `portfolio-v22` para consistência offline.
- Proibido: rasterizar pipeline, tipografia, ícones técnicos, pulso, divisores, cards de evidência ou diagramas.
- Futuras capturas reais de cases exigem aprovação, origem e registro de ambiente/commit; não fabricar demonstrações.

## Ações resolvidas no build

- Avatar leve, social card, ícones PWA e WOFF2 estão gerados e integrados.
- O glyph de terceiro do GitHub foi removido; CTAs usam texto e seta do sistema.
- Os três frames do runner têm dimensão, transparência, proveniência e precache validados.
- App shell vigente: `portfolio-v22`.
