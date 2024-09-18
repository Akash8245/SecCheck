import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

export default function Password() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle password check
  const checkPassword = async () => {
    try {
      // Hash the password using SHA3-keccak-512
      const hashedPassword = CryptoJS.SHA3(password, { outputLength: 512 }).toString(CryptoJS.enc.Hex);
      const first10Chars = hashedPassword.slice(0, 10);

      console.log('Hashed Password:', hashedPassword); // Log to verify hash
      console.log('First 10 Chars:', first10Chars); // Log to verify first 10 chars

      // API endpoint
      const apiUrl = `https://passwords.xposedornot.com/v1/pass/anon/${first10Chars}`;
      console.log('API URL:', apiUrl);

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setResult(data);
      setError(null);
    } catch (error) {
      setError(error.message);
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
          <pre>{JSON.stringify(result, null, 2)}</pre>
          <div>
            <h4>Characteristics:</h4>
            <p><strong>Anon:</strong> {result.SearchPassAnon.anon}</p>
            <p><strong>Char:</strong> {result.SearchPassAnon.char}</p>
            <p><strong>Count:</strong> {result.SearchPassAnon.count}</p>
          </div>
        </div>
      )}
    </div>
  );
}
