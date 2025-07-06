
// Call the real vector search API endpoint
export const fetchData = async (query, keywords = "", dateFrom = "", dateTo = "") => {
  try {
    // Build URL with all parameters
    let url = `https://817f-62-193-124-9.ngrok-free.app/search?q=${encodeURIComponent(query)}`;
    
    if (keywords.trim()) {
      url += `&keywords=${encodeURIComponent(keywords)}`;
    }
    
    if (dateFrom) {
      url += `&date_from=${encodeURIComponent(dateFrom)}`;
    }
    
    if (dateTo) {
      url += `&date_to=${encodeURIComponent(dateTo)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
