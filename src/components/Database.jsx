import React, { useEffect, useState } from 'react';

export default function Database() {
  const [breaches, setBreaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://xon-api-test.xposedornot.com/v1/breaches');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBreaches(data.exposedBreaches); 
      } catch (error) {
        setError(error.message);
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
    <div>
      <h1>Data Breaches</h1>
      <ul>
        {breaches.map((breach) => (
          <li key={breach.breachID} className="border-b p-4">
            <img src={breach.logo} alt={breach.domain} className="w-16 h-16 object-contain mb-2"/>
            <h2 className="text-xl font-bold">{breach.domain}</h2>
            <p><strong>Date:</strong> {new Date(breach.breachedDate).toLocaleDateString()}</p>
            <p><strong>Exposed Records:</strong> {breach.exposedRecords.toLocaleString()}</p>
            <p><strong>Industry:</strong> {breach.industry}</p>
            <p><strong>Description:</strong> {breach.exposureDescription}</p>
            <p><strong>Password Risk:</strong> {breach.passwordRisk}</p>
            {breach.referenceURL && (
              <p><strong>Reference:</strong> <a href={breach.referenceURL} target="_blank" rel="noopener noreferrer">More Info</a></p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
