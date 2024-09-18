import React, { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  const [showNoBreaches, setShowNoBreaches] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (email) => {
    setIsLoading(true);

    try {
      const res = await fetch(`https://api.xposedornot.com/v1/check-email/${email}`);
      const data = await res.json();

      console.log(data);

      // Use breaches directly as an array
      setData(data.breaches || []);
      setShowNoBreaches(data.breaches.length === 0);
    } catch (err) {
      console.error(err);
      setData([]);
      setShowNoBreaches(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      fetchData(email);
    }
  };

  return (
    <div className='container mx-auto p-8 bg-gradient-to-b from-blue-100 to-purple-50 min-h-screen'>
      <div className='flex flex-col items-center justify-between md:flex-row md:space-x-16 mb-12'>
        <div className='w-full md:w-1/2 mb-8 md:mb-0'>
          <h1 className='text-4xl font-bold text-center md:text-left mb-6 text-blue-800'>
            Check if someone's compromised an online account linked to your email!
          </h1>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-700'>Enter email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className='w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200'
              disabled={isLoading}
            >
              {isLoading ? 'Checking...' : 'Check Breaches'}
            </button>
          </form>
        </div>
        <div className='w-full md:w-1/2'>
          <video
            src="https://example.com/video.mp4"
            className='md:w-full max-w-screen-lg mx-auto'
            loop muted playsInline
          />
        </div>
      </div>

      {data.length > 0 ? (
        <div className='bg-white p-6 rounded-lg shadow-lg max-h-80 overflow-y-auto mb-8'>
          <ul className='space-y-2'>
            {data.map((breach, index) => (
              <li key={index} className='border-b border-gray-200 p-2'>
                <span style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{breach}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : showNoBreaches ? (
        <p className='text-red-500 text-center'>No breaches found or invalid email</p>
      ) : null}

      {!isLoading && data.length === 0 && (
        <p className='text-gray-500 text-center'>Enter an email address to check for breaches</p>
      )}
    </div>
  );
}
