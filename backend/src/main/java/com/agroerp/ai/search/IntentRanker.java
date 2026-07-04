package com.agroerp.ai.search;

import com.agroerp.ai.catalog.CatalogItem;

import java.util.List;

public interface IntentRanker {
    List<RankedResult> rank(String query, List<CatalogItem> candidates);

    record RankedResult(Integer id, Double confidence) {}
}
