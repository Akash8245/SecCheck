import React, { useState } from 'react';

export default function Home() {
    const [email, setEmail] = useState('');
    const [data, setData] = useState([]);
    const [showNoBreaches, setShowNoBreaches] = useState(false);

    const fetchData = (email) => {
        fetch(`https://api.xposedornot.com/v1/check-email/${email}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // Check if breaches is a single string and split it
                const breaches = typeof data.breaches === 'string' ? data.breaches.split(/\s+/) : data.breaches || [];
                setData(breaches);
                setShowNoBreaches(breaches.length === 0);
            })
            .catch((err) => {
                console.error(err);
                setData([]);
                setShowNoBreaches(true); 
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            fetchData(email);
        }
    };

    return (
        <div className='p-8'>
            <h1 className='text-2xl font-bold mb-6'>
                Check if someone’s compromised an online account linked to your email!
            </h1>
            <form onSubmit={handleSubmit} className='mb-8'>
                <input
                    type="email"
                    placeholder="Enter email"
                    className='border border-gray-300 p-2 rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className='ml-4 px-4 py-2 border border-black rounded-md text-black bg-white hover:bg-red-500 hover:text-white transition ease-in-out duration-300 font-bold'
                >
                    Check Breaches
                </button>
            </form>

            {data.length > 0 ? (
                <div className='bg-gray-100 p-4 rounded-md max-h-80 overflow-y-auto'>
                    <ul>
                        {data.map((breach, index) => (
                            <li key={index} className='border-b border-gray-300 p-2'>{breach}</li>
                        ))}
                    </ul>
                </div>
            ) : showNoBreaches ? (
                <p className='text-red-500'>No breaches found or invalid email</p>
            ) : null}
        </div>
    );
}
