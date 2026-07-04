package com.agroerp.ai.catalog;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
@RequiredArgsConstructor
public class CatalogLoader {
    private final ObjectMapper objectMapper;

    @Value("classpath:catalog.json")
    private Resource catalogResource;

    private Map<Integer, CatalogItem> catalog;

    @PostConstruct
    public void load() {
        try (InputStream is = catalogResource.getInputStream()) {
            List<CatalogItem> items = objectMapper.readValue(is, new TypeReference<List<CatalogItem>>() {});
            catalog = new ConcurrentHashMap<>();
            for (CatalogItem item : items) {
                catalog.put(item.getId(), item);
            }
            log.info("Loaded {} catalog items", catalog.size());
        } catch (Exception e) {
            log.error("Failed to load catalog", e);
            catalog = new ConcurrentHashMap<>();
        }
    }

    public Map<Integer, CatalogItem> getCatalog() {
        return catalog;
    }

    public CatalogItem getById(Integer id) {
        return catalog.get(id);
    }
}
