package com.agroerp.ai.search;

import com.agroerp.ai.catalog.CatalogItem;
import com.agroerp.ai.catalog.CatalogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
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

        List<SearchResult> results = ranked.stream()
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

        if (results.isEmpty()) {
            log.info("No results from AI search, falling back to local text search");
            return fallbackSearch(query);
        }

        return results;
    }

    private List<SearchResult> fallbackSearch(String query) {
        String lowerQuery = query.toLowerCase(Locale.ROOT);
        List<CatalogItem> allItems = catalogService.getAllItems();
        List<CatalogItem> matches = new ArrayList<>();

        for (CatalogItem item : allItems) {
            if (item.getTitle().toLowerCase(Locale.ROOT).contains(lowerQuery) ||
                item.getDescription().toLowerCase(Locale.ROOT).contains(lowerQuery) ||
                (item.getAliases() != null && item.getAliases().stream().anyMatch(a -> a.toLowerCase(Locale.ROOT).contains(lowerQuery))) ||
                (item.getKeywords() != null && item.getKeywords().stream().anyMatch(k -> k.toLowerCase(Locale.ROOT).contains(lowerQuery))) ||
                item.getModule().toLowerCase(Locale.ROOT).contains(lowerQuery)) {
                matches.add(item);
            }
        }

        return matches.stream()
                .map(item -> new SearchResult(
                        item.getId(),
                        item.getTitle(),
                        item.getDescription(),
                        item.getModule(),
                        item.getRoute(),
                        0.8
                ))
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
