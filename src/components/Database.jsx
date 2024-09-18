import React, { useState, useEffect } from 'react';

export default function Database() {
  const [breaches, setBreaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreaches = async () => {
      try {
        const response = await fetch('https://api.xposedornot.com/v1/breaches');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setBreaches(data.exposedBreaches);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBreaches();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Data Breaches</h1>
      <div className="space-y-4">
        {breaches.map(breach => (
          <div key={breach.breachID} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">{breach.domain}</h2>
            <img src={breach.logo} alt={breach.domain} className="w-32 h-32 mb-2" />
            <p><strong>Breached Date:</strong> {new Date(breach.breachedDate).toLocaleDateString()}</p>
            <p><strong>Industry:</strong> {breach.industry}</p>
            <p><strong>Exposed Data:</strong> {breach.exposedData.join(', ')}</p>
            <p><strong>Exposed Records:</strong> {breach.exposedRecords.toLocaleString()}</p>
            <p><strong>Description:</strong> {breach.exposureDescription}</p>
            {breach.referenceURL && (
              <a href={breach.referenceURL} className="text-blue-500" target="_blank" rel="noopener noreferrer">More Info</a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
