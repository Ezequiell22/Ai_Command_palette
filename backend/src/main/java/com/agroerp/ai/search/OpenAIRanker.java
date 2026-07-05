package com.agroerp.ai.search;

import com.agroerp.ai.catalog.CatalogItem;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenAIRanker implements IntentRanker {
    private final ChatModel chatModel;
    private final ObjectMapper objectMapper;

    @Override
    public List<RankedResult> rank(String query, List<CatalogItem> candidates) {
        if (candidates.isEmpty()) return List.of();

        String candidatesJson = candidates.stream()
                .map(item -> {
                    try {
                        return String.format("{\"id\": %d, \"title\": \"%s\", \"description\": \"%s\", \"module\": \"%s\", \"aliases\": %s, \"keywords\": %s}",
                                item.getId(),
                                escapeJson(item.getTitle()),
                                escapeJson(item.getDescription()),
                                escapeJson(item.getModule()),
                                item.getAliases() != null ? objectMapper.writeValueAsString(item.getAliases()) : "[]",
                                item.getKeywords() != null ? objectMapper.writeValueAsString(item.getKeywords()) : "[]");
                    } catch (Exception e) {
                        log.error("Error serializing catalog item", e);
                        return String.format("{\"id\": %d, \"title\": \"%s\", \"description\": \"%s\"}",
                                item.getId(),
                                escapeJson(item.getTitle()),
                                escapeJson(item.getDescription()));
                    }
                })
                .reduce((a, b) -> a + "," + b)
                .map(s -> "[" + s + "]")
                .orElse("[]");

        String promptText = String.format("""
            Você é um assistente especializado em encontrar funcionalidades em um ERP agrícola.
            
            Consulta do usuário: "%s"
            
            Candidatos disponíveis: %s
            
            Instruções:
            1. Analise a consulta e encontre os candidatos mais relevantes (incluindo sinônimos, aliases e palavras-chave).
            2. Retorne SOMENTE um JSON com a estrutura {"results": [{"id": <number>, "confidence": <number>}]}.
            3. Confidence deve ser entre 0 e 1:
               - 1.0 = perfeito match
               - 0.7-0.9 = muito relevante
               - 0.4-0.6 = parcialmente relevante
               - < 0.4 = não inclua
            4. Não inclua explicações, markdown ou texto extra.
            5. Não invente IDs que não existem na lista de candidatos.
            6. Se houver candidatos relevantes, retorne-os ordenados por confidence (maior primeiro).
            7. Se nenhum candidato for relevante, retorne {"results": []}.
            """, query, candidatesJson);

        try {
            String response = chatModel.call(new Prompt(new UserMessage(promptText))).getResult().getOutput().getContent();
            response = response.replaceAll("```json|```", "").trim();
            RankResponse rankResponse = objectMapper.readValue(response, RankResponse.class);
            return rankResponse.results();
        } catch (Exception e) {
            log.error("Failed to rank candidates, returning all candidates with basic confidence", e);
            return candidates.stream()
                    .limit(10)
                    .map(item -> new RankedResult(item.getId(), 0.7))
                    .toList();
        }
    }

    private String escapeJson(String s) {
        return s != null ? s.replace("\"", "\\\"").replace("\n", " ").replace("\r", " ") : "";
    }

    private record RankResponse(List<RankedResult> results) {}
}
