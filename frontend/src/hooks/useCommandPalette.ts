import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { search, SearchResult } from '../services/api';
import catalogData from '../catalog.json';
import { CatalogItem as CatalogItemType } from '../types/catalog';

export const useCommandPalette = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const lastSearchedQuery = useRef<string>('');

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    setSelectedIndex(-1);
    lastSearchedQuery.current = '';
  }, []);

  const searchLocal = (q: string): SearchResult[] => {
    const lowerQ = q.toLowerCase();
    return (catalogData as CatalogItemType[])
      .filter(item => 
        item.title.toLowerCase().includes(lowerQ) ||
        item.description.toLowerCase().includes(lowerQ) ||
        item.aliases.some(a => a.toLowerCase().includes(lowerQ)) ||
        item.keywords.some(k => k.toLowerCase().includes(lowerQ)) ||
        item.module.toLowerCase().includes(lowerQ)
      )
      .map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        module: item.module,
        route: item.route,
        confidence: 1.0
      }));
  };

  const handleSearch = useCallback(async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setResults([]);
      setSelectedIndex(-1);
      lastSearchedQuery.current = '';
      return;
    }
    if (trimmedQuery === lastSearchedQuery.current) {
      return;
    }
    lastSearchedQuery.current = trimmedQuery;
    setLoading(true);
    try {
      const data = await search(trimmedQuery);
      setResults(data);
      setSelectedIndex(data.length > 0 ? 0 : -1);
    } catch (err) {
      console.log('Backend indisponível, usando busca local');
      const localResults = searchLocal(trimmedQuery);
      setResults(localResults);
      setSelectedIndex(localResults.length > 0 ? 0 : -1);
    } finally {
      setLoading(false);
    }
  }, [query]);

  const handleSetQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
    if (!newQuery.trim()) {
      setResults([]);
      setSelectedIndex(-1);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        isOpen ? close() : open();
      }
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, open, close]);

  const navigateDown = () => {
    if (results.length > 0) {
      setSelectedIndex(prev => (prev + 1) % results.length);
    }
  };

  const navigateUp = () => {
    if (results.length > 0) {
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    }
  };

  const selectResult = (index: number) => {
    if (results[index]) {
      navigate(results[index].route);
      close();
    }
  };

  return {
    isOpen,
    query,
    setQuery: handleSetQuery,
    results,
    loading,
    selectedIndex,
    open,
    close,
    navigateDown,
    navigateUp,
    selectResult,
    handleSearch,
  };
};
