import React, { useState } from 'react';
import { keccak_512 } from 'js-sha3'; 

export default function Password() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const keccakHash = (pwd) => {
    const hash = keccak_512(pwd);
    console.log('Hashed Password:', hash); 
    return hash.substring(0, 10); 
  };

  // Function to check the password
  const checkPassword = async () => {
    if (password.length > 0) {
      try {
        const pwdHash = keccakHash(password);
        const encodedPwdHash = encodeURIComponent(pwdHash);
        const apiUrl = `https://passwords.xposedornot.com/v1/pass/anon/${encodedPwdHash}`;

        console.log('API URL:', apiUrl); 

        const response = await fetch(apiUrl);
        console.log('Response Status:', response.status); 

        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data); // Log the API response
          setResult(data);
          setError(null);
        } else if (response.status === 404) {
          console.log('Password is safe');
          setResult({ message: 'Password is safe' });
          setError(null);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching the password check:', error); // Log the error
        setError(error.message);
        setResult(null);
      }
    } else {
      setError('Oops! Try again with a valid password.');
      setResult(null);
    }
  };

  return (
    <div className='flex flex-col items-center p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold mb-4 text-gray-800'>Password Check</h1>
      <div className='w-full max-w-md bg-white shadow-md rounded-lg p-6'>
        <input 
          type="password" 
          placeholder="Enter password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4'
        />
        <button 
          onClick={checkPassword} 
          className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Check Password
        </button>

        {error && (
          <div className='mt-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-md'>
            <h3 className='font-semibold'>Error:</h3>
            <pre>{error}</pre>
          </div>
        )}

        {result && (
          <div className='mt-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded-md'>
            <h3 className='font-semibold'>Result:</h3>
            {result.message && <p>{result.message}</p>}
            {result.SearchPassAnon && (
              <div className='mt-2'>
                <h4 className='font-semibold'>Characteristics:</h4>
                <p><strong>Anon:</strong> {result.SearchPassAnon.anon}</p>
                <p><strong>Char:</strong> {result.SearchPassAnon.char}</p>
                <p><strong>Count:</strong> {result.SearchPassAnon.count}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
