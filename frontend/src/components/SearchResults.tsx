import { SearchResult } from '../services/api';

interface SearchResultsProps {
  results: SearchResult[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  loading: boolean;
}

export const SearchResults = ({ results, selectedIndex, onSelect, loading }: SearchResultsProps) => {
  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">
        Buscando...
      </div>
    );
  }
  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Nenhum resultado encontrado
      </div>
    );
  }
  return (
    <ul className="max-h-80 overflow-y-auto">
      {results.map((result, index) => (
        <li
          key={result.id}
          onClick={() => onSelect(index)}
          className={`p-3 cursor-pointer border-b border-gray-100 transition-colors ${
            index === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
          }`}
        >
          <div className="font-medium text-gray-900">{result.title}</div>
          <div className="text-sm text-gray-600">{result.description}</div>
          <div className="text-xs text-gray-400 mt-1">{result.module} • {(result.confidence * 100).toFixed(0)}%</div>
        </li>
      ))}
    </ul>
  );
};
