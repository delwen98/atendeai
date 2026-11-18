# AtendeAI

Painel SaaS de atendimento inteligente para pequenos negócios.

## Stack inicial
- React + Vite
- Lucide React
- Supabase (próxima etapa: autenticação, banco e isolamento por empresa)
- API oficial do WhatsApp Business (próxima etapa)
- API de IA (próxima etapa)

## Executar localmente
```bash
npm install
npm run dev
```

## Estado atual
Primeiro protótipo de interface. Os dados da tela são demonstrativos e ainda não há conexão real com WhatsApp, IA ou banco de dados.

## Próximas etapas
1. Autenticação e estrutura multiempresa no Supabase.
2. Persistência de contatos e conversas.
3. Integração segura com WhatsApp Cloud API.
4. Integração com provedor de IA no backend.
5. Regras de acesso e privacidade (RLS) por empresa.