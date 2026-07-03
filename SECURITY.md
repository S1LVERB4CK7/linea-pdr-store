# Segurança — LINEA PDR Store

Esse é um site global, processando dados pessoais e pagamentos de clientes
em múltiplos países. Este documento resume as práticas adotadas e o que
falta configurar antes de ir pra produção.

## Já implementado no código

- **Senhas**: hash com bcrypt (12 rounds), nunca armazenadas em texto puro.
- **Autenticação**: JWT de acesso curto (15min) + refresh token (7 dias),
  segredos separados e validados no boot (`config/env.ts`).
- **Rate limiting**: limite geral por IP + limite bem mais agressivo em
  `/api/auth/*` (10 tentativas / 15min) contra brute-force e credential stuffing.
- **CORS**: allowlist explícita de domínios via `CORS_ALLOWED_ORIGINS`, nunca `*`.
- **Headers de segurança**: Helmet com CSP explícito, X-Frame-Options,
  Referrer-Policy, Permissions-Policy (bloqueia câmera/mic/geo por padrão).
- **Validação de input**: todo body de request passa por schema Zod antes
  de tocar o banco — nada de confiar em `req.body` cru.
- **SQL Injection**: Prisma usa queries parametrizadas por padrão; nunca
  usar `$queryRawUnsafe` com interpolação de string.
- **HTTP Parameter Pollution**: bloqueado via `hpp`.
- **Enumeração de contas**: mensagens de erro genéricas em login/registro
  (não revela se o e-mail existe na base).
- **Logs**: campos sensíveis (senha, token, cartão) são redigidos
  automaticamente antes de qualquer log (`lib/logger.ts`).
- **Dinheiro**: preços sempre em centavos (Int), nunca float — evita erro
  de arredondamento que vira brecha de negócio.
- **Dependências**: CodeQL rodando em todo PR + semanalmente, Dependabot
  abrindo PR automático de update, `npm audit` quebrando o CI em
  vulnerabilidade alta/crítica.

## Pendente antes de produção (checklist)

- [ ] WAF na frente (Cloudflare ou equivalente) — proteção DDoS básica
- [ ] Secrets em vault de produção (Render/Vercel env vars), nunca em `.env` commitado
- [ ] 2FA para contas de admin/distribuidor
- [ ] Webhook do Stripe validado por assinatura (`STRIPE_WEBHOOK_SECRET`)
- [ ] Política de retenção de dados + LGPD (Brasil) / GDPR (UE) — como é
      site global, GDPR se aplica a qualquer visitante da UE
- [ ] Pentest ou scan automatizado (ex: OWASP ZAP) antes do lançamento
- [ ] Rotação de secrets JWT documentada
- [ ] HTTPS forçado em todos os domínios (HSTS)
- [ ] Backup automático do banco (Supabase já oferece — confirmar frequência)

## Reportando uma vulnerabilidade

Enquanto o projeto não tem um e-mail de segurança dedicado, abra uma issue
privada ou entre em contato direto com o mantenedor do repositório —
**nunca** abra uma issue pública detalhando uma falha de segurança ativa.
