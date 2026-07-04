import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

export interface SearchResult {
  id: number;
  title: string;
  description: string;
  module: string;
  route: string;
  confidence: number;
}

export const search = async (query: string): Promise<SearchResult[]> => {
  const response = await api.post<{ results: SearchResult[] }>('/search', { query });
  return response.data.results;
};
