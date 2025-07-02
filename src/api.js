
// Call the real vector search API endpoint
export const fetchData = async (query, keywords = "", dateFrom = "", dateTo = "") => {
  try {
    // Build URL with all parameters
    let url = `http://192.168.162.228:8000/search?q=${encodeURIComponent(query)}`;
    
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
