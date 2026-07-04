# Jenkins Pipeline

## Estágios

1. **Checkout**: Código fonte
2. **Build Frontend**: Gera catalog.json automaticamente + build Vite
3. **Gerar Embeddings**: Gera catalog_embeddings.bin via OpenAI
4. **Build Backend**: Maven package
5. **Build Docker Images**: frontend e backend
6. **Deploy**: (opcional)

## catalog.json Generation

Extrai rotas/components de código React e gera o catálogo.
