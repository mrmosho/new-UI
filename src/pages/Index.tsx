
import React, { useState } from 'react';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import { fetchData } from '../api';

const Index = () => {
  const [query, setQuery] = useState("");
  const [keywords, setKeywords] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const data = await fetchData(query, keywords, dateFrom, dateTo);
      setResults(data);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ 
      margin: 0,
      fontFamily: "'Segoe UI', sans-serif",
      backgroundColor: '#fff',
      textAlign: 'left',
      padding: '40px',
      position: 'relative'
    }}>
      <img src="/logo.jpg" alt="Logo" style={{
        width: '120px',
        textAlign: 'left',
        marginBottom: '60px'
      }} />

      <div style={{
        width: '1000px',
        margin: '0 auto',
        textAlign: 'left'
      }}>
        <div style={{
          fontSize: '35px',
          fontStyle: 'italic',
          color: '#144c6c',
          marginBottom: '20px'
        }}>Vector Search</div>

        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-start',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #0d5b80',
            borderRadius: '10px',
            overflow: 'hidden',
            width: '700px',
            height: '60px',
            backgroundColor: '#f4f6fb'
          }}>
            <div style={{
              fontSize: '24px',
              padding: '10px',
              color: '#0d5b80'
            }}>
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
              disabled={loading}
              style={{
                border: 'none',
                padding: '15px',
                flex: 1,
                fontSize: '16px',
                letterSpacing: '3px',
                outline: 'none',
                background: 'none',
                color: '#144c6c'
              }}
            />
            <div 
              onClick={() => setShowDateFilter(!showDateFilter)}
              style={{
                fontSize: '20px',
                padding: '10px',
                color: '#0d5b80',
                cursor: 'pointer',
                borderLeft: '1px solid #ccc'
              }}
            >
              <FaCalendarAlt />
            </div>
            <button 
              onClick={handleSearch} 
              disabled={loading || (!query.trim() && !keywords.trim())}
              style={{
                backgroundColor: '#0d5b80',
                height: '60px',
                color: 'white',
                border: 'none',
                padding: '15px 25px',
                fontSize: '16px',
                borderRadius: '0 9px 9px 0',
                cursor: 'pointer'
              }}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          <div style={{ flex: 1, maxWidth: '260px' }}>
            <input
              type="text"
              placeholder="Keywords (optional)..."
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
              disabled={loading}
              style={{
                width: '100%',
                height: '60px',
                border: '2px solid #0d5b80',
                borderRadius: '10px',
                padding: '15px',
                fontSize: '16px',
                letterSpacing: '2px',
                outline: 'none',
                backgroundColor: '#f4f6fb',
                color: '#144c6c',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {showDateFilter && (
          <div style={{
            backgroundColor: '#f4f6fb',
            border: '2px solid #0d5b80',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '20px',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <div style={{
              display: 'flex',
              gap: '30px',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <label style={{
                  fontSize: '16px',
                  color: '#144c6c',
                  fontWeight: '500',
                  minWidth: '50px'
                }}>From:</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={e => setDateFrom(e.target.value)}
                  disabled={loading}
                  style={{
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: 'white',
                    color: '#144c6c'
                  }}
                />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <label style={{
                  fontSize: '16px',
                  color: '#144c6c',
                  fontWeight: '500',
                  minWidth: '50px'
                }}>To:</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={e => setDateTo(e.target.value)}
                  disabled={loading}
                  style={{
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: 'white',
                    color: '#144c6c'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div style={{
            color: 'red',
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#ffe6e6',
            borderRadius: '5px'
          }}>{error}</div>
        )}
        {results && (
          <div style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '5px',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        )}
      </div>

      <div style={{
        position: 'absolute',
        right: 0,
        top: '150px',
        width: '33px',
        height: '33px',
        borderTop: '150px solid transparent',
        borderBottom: '150px solid transparent',
        borderLeft: '250px solid #38a4d4',
        zIndex: -1
      }}></div>
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        width: '280px',
        height: '80px',
        backgroundColor: '#0d5b80',
        zIndex: -2
      }}></div>
      <div style={{
        position: 'absolute',
        right: 0,
        top: '550px',
        width: '280px',
        height: '80px',
        backgroundColor: '#0d5b80',
        zIndex: -2
      }}></div>
    </div>
  );
};

export default Index;
