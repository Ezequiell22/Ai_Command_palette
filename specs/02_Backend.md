# Backend - AI Command Palette

## Estrutura do Projeto Java

```
backend/
├── pom.xml
├── src/
│   ├── main/
│   │   ├── java/com/agroerp/ai/
│   │   │   ├── AiCommandPaletteApplication.java
│   │   │   ├── catalog/
│   │   │   │   ├── CatalogItem.java
│   │   │   │   ├── CatalogLoader.java
│   │   │   │   └── CatalogService.java
│   │   │   ├── search/
│   │   │   │   ├── SearchController.java
│   │   │   │   ├── SearchService.java
│   │   │   │   ├── VectorStoreService.java
│   │   │   │   ├── IntentRanker.java
│   │   │   │   └── OpenAIRanker.java
│   │   │   └── config/
│   │   │       ├── OpenAIConfig.java
│   │   │       └── VectorStoreConfig.java
│   │   └── resources/
│   │       ├── application.yml
│   │       └── catalog.json (gerado pelo pipeline)
```

## APIs

### POST /api/search
```json
Request: { "query": "emitir nota fiscal" }
Response: { "results": [ { "id": 1001, "title": "...", "route": "...", "confidence": 0.98 } ] }
```
