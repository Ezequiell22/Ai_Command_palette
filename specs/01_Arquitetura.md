# Arquitetura do AI Command Palette

## Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| Frontend | React + TypeScript + Vite |
| Backend | Java 21 + Spring Boot 3.4 |
| Banco de Dados | PostgreSQL 16 + PgVector |
| Embeddings | OpenAI text-embedding-3-small |
| LLM | OpenAI GPT-5 nano (gpt-4o-mini fallback) |
| Containerização | Docker + Docker Compose |
| CI/CD | Jenkins |

## Estrutura de Pastas

```
Buscador Inteligente de menus/
├── specs/
├── catalog.json
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── Dockerfile
│   └── vite.config.ts
├── backend/
│   ├── src/
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/resources/
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```
