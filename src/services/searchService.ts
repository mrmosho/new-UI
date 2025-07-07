export interface SearchResult {
  id: string;
  title: string;
  content: string;
  url?: string;
  score: number;
  date?: string;
  source?: string;
  resultNumber?: number;
  summary?: string;
}

const API_BASE_URL = 'https://c968-62-193-124-9.ngrok-free.app';

export const searchAPI = async (query: string): Promise<SearchResult[]> => {
  console.log(`Searching for: ${query}`);
  
  try {
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Full API response:', data);
    console.log('Results array:', data.results);
    
    // Extract the results array from your API response
    const resultsArray = data.results || [];
    console.log('Processing results:', resultsArray);
    
    // Map each result to your SearchResult interface
    const results: SearchResult[] = resultsArray.map((item: any, index: number) => {
      console.log(`Processing item ${index}:`, item);
      
      return {
        id: item.result_number?.toString() || `result-${index}`,
        title: item.title || 'Untitled',
        content: item.summary || item.content || 'No content available',
        url: item.url || undefined,
        score: item.score || item.relevance || (1 - index * 0.05), // Generate decreasing scores
        date: item.date || undefined,
        source: item.source || undefined,
        resultNumber: item.result_number || index + 1,
        summary: item.summary || undefined,
      };
    });
    
    console.log('Mapped results:', results);
    return results;
    
  } catch (error) {
    console.error('Search API error:', error);
    throw new Error('Failed to fetch search results');
  }
};
