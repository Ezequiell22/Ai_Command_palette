import { useRef, useEffect } from 'react';
import { SearchResults } from './SearchResults';
import { useCommandPalette } from '../hooks/useCommandPalette';

export const CommandPalette = () => {
  const {
    isOpen,
    query,
    setQuery,
    results,
    loading,
    selectedIndex,
    close,
    navigateDown,
    navigateUp,
    selectResult,
    handleSearch,
  } = useCommandPalette();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateDown();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateUp();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results.length > 0) {
        selectResult(selectedIndex);
      } else {
        handleSearch();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={close}
      />
      <div className="relative w-full max-w-xl bg-white rounded-lg shadow-2xl border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="O que você deseja fazer? Pressione Enter para buscar (Ctrl+L)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 outline-none text-lg text-gray-800"
            />
          </div>
        </div>
        <SearchResults
          results={results}
          selectedIndex={selectedIndex}
          onSelect={selectResult}
          loading={loading}
        />
      </div>
    </div>
  );
};
