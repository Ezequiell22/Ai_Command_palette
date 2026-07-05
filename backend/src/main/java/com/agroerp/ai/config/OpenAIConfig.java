package com.agroerp.ai.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class OpenAIConfig {
    @Value("${spring.ai.openai.api-key:}")
    private final String apiKey;

    @PostConstruct
    void validateApiKey() {
        if (apiKey == null || apiKey.isBlank() || "demo".equals(apiKey.trim())) {
            log.error("OPENAI_API_KEY is missing or left at the default placeholder. LLM calls will fail.");
            throw new IllegalStateException("Adicione OPENAI_API_KEY ao ambiente antes de iniciar o backend.");
        }
    }
}
