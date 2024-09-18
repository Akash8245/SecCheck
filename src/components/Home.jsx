import React, { useState, useEffect } from 'react';

export default function Home() {
    const [email, setEmail] = useState('');
    const [data, setData] = useState([]);

    const fetchData = (email) => {
        fetch(`https://api.xposedornot.com/v1/check-email/${email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data.breaches[0] || []); 
            })
            .catch((err) => {
                console.error(err);
                setData([]);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            fetchData(email);
        }
    };

    return (
        <div>
            <h1>Check Breaches by Email</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Check Breaches</button>
            </form>

            {data && data.length > 0 ? (
                <ul>
                    {data.map((breach, index) => (
                        <li key={index}>{breach}</li>
                    ))}
                </ul>
            ) : (
                <p>No breaches found or invalid email</p>
            )}
        </div>
    );
}
