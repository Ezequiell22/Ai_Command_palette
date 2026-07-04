package com.agroerp.ai.search;

import com.agroerp.ai.catalog.CatalogItem;
import com.agroerp.ai.catalog.CatalogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class VectorStoreService {
    private final VectorStore vectorStore;
    private final EmbeddingModel embeddingModel;
    private final CatalogService catalogService;

    @PostConstruct
    public void init() {
        List<CatalogItem> items = catalogService.getAllItems();
        if (!items.isEmpty()) {
            List<Document> docs = items.stream()
                    .map(item -> new Document(
                            item.getId().toString(),
                            item.toSearchText(),
                            Map.of(
                                    "id", item.getId(),
                                    "title", item.getTitle(),
                                    "module", item.getModule(),
                                    "route", item.getRoute()
                            )
                    ))
                    .collect(Collectors.toList());
            vectorStore.add(docs);
            log.info("Vector store initialized with {} documents", docs.size());
        }
    }

    public List<CatalogItem> searchCandidates(String query, int topK) {
        List<Document> docs = vectorStore.similaritySearch(SearchRequest.query(query).withTopK(topK));
        return docs.stream()
                .map(doc -> catalogService.getItem(Integer.parseInt(doc.getId())))
                .filter(item -> item != null)
                .collect(Collectors.toList());
    }
}
