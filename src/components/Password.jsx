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

        console.log('API URL:', apiUrl); // Log the API URL for debugging

        const response = await fetch(apiUrl);
        console.log('Response Status:', response.status); // Log the response status

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
    <div>
      <h1>Password Check</h1>
      <input 
        type="password" 
        placeholder="Enter password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={checkPassword}>Check Password</button>

      {error && (
        <div style={{ color: 'red' }}>
          <h3>Error:</h3>
          <pre>{error}</pre>
        </div>
      )}

      {result && (
        <div>
          <h3>Result:</h3>
          {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
          {result.message && <p>{result.message}</p>}
          {result.SearchPassAnon && (
            <div>
              <h4>Characteristics:</h4>
              <p><strong>Anon:</strong> {result.SearchPassAnon.anon}</p>
              <p><strong>Char:</strong> {result.SearchPassAnon.char}</p>
              <p><strong>Count:</strong> {result.SearchPassAnon.count}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
