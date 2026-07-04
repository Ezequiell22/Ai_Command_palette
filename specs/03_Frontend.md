# Frontend - AI Command Palette

## Funcionalidades Principais

1. Atalho Ctrl + L para abrir modal
2. Campo de busca com debounce
3. Lista de resultados com navegação por teclado (↑↓) e Enter
4. Fechar com Escape ou clique externo

## Estrutura

```
frontend/
├── src/
│   ├── components/
│   │   ├── CommandPalette.tsx
│   │   └── SearchResults.tsx
│   ├── services/
│   │   └── api.ts
│   ├── hooks/
│   │   └── useCommandPalette.ts
│   ├── App.tsx
│   └── main.tsx
```
