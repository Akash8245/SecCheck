import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Domain = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post('https://api.xposedornot.com/v1/domain-breaches/', {
        headers: {
          'x-api-key': 'YOUR_API_KEY_HERE',
          'Content-Length': '0',
        },
      });

      if (!response.data.status === 'success') {
        throw new Error('API returned an error');
      }

      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen bg-red-500 text-white p-4 rounded">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Domain Breaches</h1>
      
      {data && Object.keys(data.metrics).length === 0 ? (
        <div className="flex justify-center items-center mt-16">
          <p>No breaches found.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <BreachSummary data={data} />
          <BreachesDetails data={data} />
          <DetailedBreachInfo data={data} />
          <DomainSummary data={data} />
          <Top10Breaches data={data} />
          <YearlyMetrics data={data} />
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center mt-16">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

const BreachSummary = ({ data }) => {
  const breachSummaries = data.metrics.Breach_Summary || {};
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Breach Summary</h2>
      <ul className="list-disc pl-5 space-y-2">
        {Object.entries(breachSummaries).map(([breach, count]) => (
          <li key={breach}>{breach}: {count}</li>
        ))}
      </ul>
    </div>
  );
};

const BreachesDetails = ({ data }) => {
  const breaches = data.metrics.Breaches_Details || [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Breaches Details</h2>
      <ul className="list-disc pl-5 space-y-2">
        {breaches.map((breach) => (
          <li key={breach.breach}>
            {breach.breach}: {breach.domain}
          </li>
        ))}
      </ul>
    </div>
  );
};

const DetailedBreachInfo = ({ data }) => {
  const breachInfo = data.metrics.Detailed_Breach_Info || {};

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Detailed Breach Info</h2>
      <ul className="list-disc pl-5 space-y-2">
        {Object.keys(breachInfo).map((breach) => (
          <li key={breach}>
            <strong>{breach.charAt(0).toUpperCase() + breach.slice(1)}:</strong> {breachInfo[breach]}
          </li>
        ))}
      </ul>
    </div>
  );
};

const DomainSummary = ({ data }) => {
  const domainSummaries = data.metrics.Domain_Summary || {};
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Domain Summary</h2>
      <ul className="list-disc pl-5 space-y-2">
        {Object.keys(domainSummaries).map((domain) => (
          <li key={domain}>{domain}: {domainSummaries[domain]}</li>
        ))}
      </ul>
    </div>
  );
};

const Top10Breaches = ({ data }) => {
  const top10 = data.metrics.Top10_Breaches || {};
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Top 10 Breaches</h2>
      <ul className="list-disc pl-5 space-y-2">
        {Object.keys(top10).map((breach) => (
          <li key={breach}>{breach}: {top10[breach]}</li>
        ))}
      </ul>
    </div>
  );
};

const YearlyMetrics = ({ data }) => {
  const yearlyMetrics = data.metrics.Yearly_Metrics || {};
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Yearly Metrics</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4">Year</th>
            <th className="py-2 px-4">Number of Breaches</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(yearlyMetrics).map(([year, count]) => (
            <tr key={year} className="hover:bg-gray-100">
              <td className="py-2 px-4">{year}</td>
              <td className="py-2 px-4">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Domain;
