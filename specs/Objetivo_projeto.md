AI Command Palette para ERP Web
Objetivo

Desenvolver uma busca inteligente baseada em IA que permita ao usuário localizar rapidamente qualquer funcionalidade do sistema utilizando linguagem natural, eliminando a necessidade de memorizar menus, submenus ou caminhos de navegação.

A funcionalidade será semelhante ao Spotlight (macOS), Raycast e VS Code Command Palette, sendo ativada através do atalho Ctrl + L.

O usuário poderá simplesmente descrever o que deseja fazer.

Exemplos:

emitir nota fiscal
cadastrar cliente
alterar limite de crédito
gerar boleto
onde configuro o ICMS
cancelar nota
relatório de estoque

A IA interpretará a intenção do usuário e retornará as funcionalidades mais relevantes.

Problema

Nosso ERP possui milhares de funcionalidades distribuídas entre diversos módulos.

Mesmo usuários experientes frequentemente sabem o que desejam fazer, porém esquecem:

em qual módulo está a funcionalidade;
o nome correto do menu;
o caminho até a tela;
a nomenclatura utilizada pelo sistema.

Isso gera perda de produtividade e aumento da dependência do suporte.

A busca tradicional por texto é limitada, pois exige que o usuário conheça exatamente o nome da funcionalidade.

A proposta é permitir buscas por intenção.

Arquitetura Geral
                   React

            Ctrl + L

                │

                ▼

        AI Command Palette

                │

                ▼

         Search API (Java)

                │

      ┌─────────┴─────────┐

      ▼                   ▼

Catálogo             Busca Vetorial

      │                   │

      └─────────┬─────────┘

                ▼

             LLM API

                │

                ▼

           Guardrail

                │

                ▼

            React
Fluxo
1. Usuário pressiona Ctrl + L

É exibido um modal centralizado.

🔍 O que deseja fazer?

> emitir nota fiscal
2. React envia
{
    "query":"emitir nota fiscal"
}
3. Backend

O backend recebe apenas a frase digitada.

4. Busca Vetorial

O backend gera o embedding da frase pesquisada.

Esse embedding é consultado no banco vetorial.

Exemplo:

Pergunta

↓

Embedding

↓

PgVector

↓

20 candidatos mais próximos

Nenhum LLM recebe o catálogo inteiro.

5. LLM

O LLM recebe apenas os candidatos encontrados.

Exemplo:

Pergunta

"quero faturar uma venda"

Itens

145 Emitir Nota Fiscal

188 Cancelar Nota

240 Carta de Correção

310 Configuração Tributária

Prompt:

Escolha apenas os IDs mais relevantes.

Nunca invente IDs.

Retorne somente JSON.

Resposta:

{
    "results":[
        {
            "id":145,
            "confidence":0.98
        }
    ]
}
6. Guardrail

O backend nunca executa diretamente a resposta do LLM.

Primeiro valida todos os IDs.

145 existe?

Sim

↓

Retorna

Se o modelo responder um ID inexistente, ele será descartado.

Catálogo

Toda funcionalidade navegável do sistema fará parte de um catálogo.

Exemplo:

interface CatalogItem{

    id:number;

    title:string;

    description:string;

    aliases:string[];

    keywords:string[];

    module:string;

    category:string;

    route:string;

    component:string;

    onClick:string;

}

Exemplo:

{
    "id":145,

    "title":"Emitir Nota Fiscal",

    "description":"Emissão de NF-e.",

    "aliases":[
        "emitir nota",
        "faturar",
        "gerar nota",
        "emitir nfe"
    ],

    "keywords":[
        "xml",
        "danfe",
        "icms"
    ],

    "module":"Fiscal",

    "category":"Nota Fiscal",

    "route":"/fiscal/nfe",

    "component":"IssueInvoice",

    "onClick":"..."
}
Geração automática do catálogo

O catálogo não será mantido manualmente.

Durante o pipeline do Jenkins será executado um processo responsável por gerar automaticamente um arquivo:

catalog.json

Esse catálogo conterá todas as funcionalidades navegáveis do sistema.

Fluxo:

React

↓

Jenkins

↓

Build

↓

catalog.json

O catálogo será publicado junto com a aplicação.

Backend

Na inicialização do backend:

Backend inicia

↓

Carrega catalog.json

↓

Cria HashMap<ID,CatalogItem>

↓

Carrega embeddings

↓

Indexa PgVector

↓

Pronto

O catálogo é carregado uma única vez.

Nunca será lido novamente durante as pesquisas.

Estrutura em Memória

O backend manterá um índice em memória.

ConcurrentHashMap<Integer,CatalogItem>

Isso permite localizar qualquer item em tempo praticamente constante.

Mesmo com 50.000 funcionalidades o consumo de memória é baixo para um servidor corporativo.

Embeddings

Os embeddings serão gerados durante o pipeline do Jenkins.

Fluxo:

Build

↓

catalog.json

↓

Embedding Generator

↓

catalog_embeddings.bin

O backend apenas carregará os embeddings já prontos.

Não haverá geração de embeddings em produção.

Isso reduz significativamente o tempo de inicialização e elimina processamento desnecessário.

Busca Vetorial

Será utilizado:

PostgreSQL

+

PgVector

Cada funcionalidade possuirá um embedding.

Durante a pesquisa:

Usuário

↓

Embedding da pergunta

↓

PgVector

↓

20 candidatos

A busca vetorial será responsável apenas por recuperar candidatos semanticamente semelhantes.

Uso do LLM

O LLM não será responsável por pesquisar o ERP.

Sua única responsabilidade será interpretar a intenção do usuário e ordenar os candidatos retornados pela busca vetorial.

O modelo nunca receberá:

50.000 menus;
catálogo completo;
banco de dados.

Receberá apenas aproximadamente vinte candidatos.

Isso reduz:

custo;
latência;
consumo de tokens.
Modelo escolhido

A implementação será desacoplada através da interface:

interface IntentRanker{

    SearchResult rank(
        String query,
        List<Candidate> candidates
    );

}

Inicialmente será utilizada a API do GPT-5 nano, por oferecer excelente equilíbrio entre qualidade, velocidade e custo para tarefas de classificação de intenção.

A implementação deverá permanecer independente do fornecedor, permitindo substituição futura por outros modelos (Claude, Gemini, modelos locais via Ollama etc.) sem impacto na arquitetura.

Guardrails

A IA nunca executa ações.

Ela apenas retorna IDs.

Exemplo:

{
    "results":[145,220]
}

O backend valida:

Existe?

Possui rota?

Possui callback?

↓

Sim

↓

Retorna

Toda navegação é baseada exclusivamente no catálogo oficial.

Performance

A cada pesquisa:

React

↓

Backend

↓

Embedding

↓

PgVector

↓

20 candidatos

↓

LLM

↓

IDs

↓

HashMap

↓

React

Nenhum arquivo é carregado.

Nenhum JSON é lido.

Nenhum embedding é recalculado.

Todo o catálogo permanece em memória.

Escalabilidade

Mesmo com:

50.000 funcionalidades
10.000 pesquisas por dia
milhares de usuários simultâneos

a arquitetura permanece eficiente porque:

o catálogo é carregado apenas na inicialização;
o HashMap permite acesso em tempo constante (O(1));
a busca vetorial consulta apenas embeddings;
o LLM recebe somente 20 candidatos por pesquisa;
o guardrail valida apenas alguns IDs, sem percorrer o catálogo completo.
Benefícios
Busca por intenção, e não por palavras-chave.
Não exige conhecimento da estrutura de menus.
Reduz o tempo para localizar funcionalidades.
Diminui chamados ao suporte.
Melhora a experiência de novos usuários.
Escala para dezenas de milhares de funcionalidades.
Baixo custo operacional devido ao uso de busca vetorial e prompts pequenos.
Independência do fornecedor de LLM por meio da interface IntentRanker.
Segurança garantida por guardrails, impedindo alucinações e execuções indevidas.
Arquitetura preparada para evolução futura, incluindo novos modelos de IA, mecanismos de busca ou personalizações, sem necessidade de reescrever a solução.