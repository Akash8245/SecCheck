import React, { useEffect, useState } from 'react';

export default function Database() {
  const [breaches, setBreaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // Add a delay before making the request
      await new Promise(resolve => setTimeout(resolve, 1000));

      try {
        const response = await fetch('https://xon-api-test.xposedornot.com/v1/breaches');
        
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        
        const data = await response.json();
        setBreaches(data.exposedBreaches); 
      } catch (error) {
        setError(error.message);
        console.error('Fetch error:', error);
        
        // If we've already retried, stop trying again
        if (retryCount >= 3) {
          setLoading(false);
          return;
        }
        
        // Wait for 5 seconds before retrying
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        setRetryCount(prevCount => prevCount + 1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8 bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Data Breaches</h1>
      {breaches.length > 0 ? (
        <ul className="space-y-4">
          {breaches.map((breach) => (
            <li key={breach.breachID} className="bg-gray-100 p-4 rounded-lg">
              {/* ... rest of the breach item rendering ... */}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600 mt-8">No breaches found.</p>
      )}
    </div>
  );
}
