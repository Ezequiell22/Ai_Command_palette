package com.agroerp.ai.catalog;

import lombok.Data;
import java.util.List;

@Data
public class CatalogItem {
    private Integer id;
    private String module;
    private String category;
    private String title;
    private String description;
    private List<String> aliases;
    private List<String> keywords;
    private String route;
    private String component;
    private String permission;

    public String toSearchText() {
        return String.join(" ",
                title,
                description,
                String.join(" ", aliases != null ? aliases : List.of()),
                String.join(" ", keywords != null ? keywords : List.of())
        );
    }
}
