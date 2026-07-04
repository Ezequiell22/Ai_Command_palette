package com.agroerp.ai.search;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SearchController {
    private final SearchService searchService;

    @PostMapping("/search")
    public SearchResponse search(@RequestBody SearchRequest request) {
        return new SearchResponse(searchService.search(request.query()));
    }

    public record SearchRequest(String query) {}
    public record SearchResponse(List<SearchService.SearchResult> results) {}
}
