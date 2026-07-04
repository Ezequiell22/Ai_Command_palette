package com.agroerp.ai.catalog;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CatalogService {
    private final CatalogLoader catalogLoader;

    public Map<Integer, CatalogItem> getCatalog() {
        return catalogLoader.getCatalog();
    }

    public CatalogItem getItem(Integer id) {
        return catalogLoader.getById(id);
    }

    public List<CatalogItem> getAllItems() {
        return catalogLoader.getCatalog().values().stream().toList();
    }
}
