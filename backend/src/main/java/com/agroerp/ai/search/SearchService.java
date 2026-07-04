package com.agroerp.ai.search;

import com.agroerp.ai.catalog.CatalogItem;
import com.agroerp.ai.catalog.CatalogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchService {
    private final VectorStoreService vectorStoreService;
    private final IntentRanker intentRanker;
    private final CatalogService catalogService;

    public List<SearchResult> search(String query) {
        List<CatalogItem> candidates = vectorStoreService.searchCandidates(query, 20);
        List<IntentRanker.RankedResult> ranked = intentRanker.rank(query, candidates);

        return ranked.stream()
                .map(r -> {
                    CatalogItem item = catalogService.getItem(r.id());
                    if (item != null) {
                        return new SearchResult(
                                item.getId(),
                                item.getTitle(),
                                item.getDescription(),
                                item.getModule(),
                                item.getRoute(),
                                r.confidence()
                        );
                    }
                    return null;
                })
                .filter(r -> r != null)
                .collect(Collectors.toList());
    }

    public record SearchResult(
            Integer id,
            String title,
            String description,
            String module,
            String route,
            Double confidence
    ) {}
}
