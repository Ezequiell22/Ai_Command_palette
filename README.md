# AI Command Palette para ERP

Solução completa de busca inteligente baseada em IA para ERP, com frontend React, backend Spring Boot e banco de dados PostgreSQL com PgVector.

## Como Rodar

1. Copie o arquivo `.env.example` para `.env` e configure a sua chave OpenAI:
   ```bash
   cp .env.example .env
   ```
   Edite `.env` e insira sua chave OpenAI em `OPENAI_API_KEY`

2. Execute o Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Acesse http://localhost:3000

4. Pressione `Ctrl+L` para abrir o Command Palette

## Arquitetura

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Java 21 + Spring Boot 3.4 + Spring AI
- **Banco de Dados**: PostgreSQL 16 + PgVector
- **AI**: OpenAI GPT-4o-mini (para ranking) + text-embedding-3-small (para embeddings)
- **Infra**: Docker + Docker Compose + Jenkins
