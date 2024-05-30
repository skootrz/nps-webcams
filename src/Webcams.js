// src/Webcams.js

import React, { useEffect, useState } from 'react';

const API_URL = 'https://developer.nps.gov/api/v1/webcams';
const API_KEY = process.env.REACT_APP_NPS_API_KEY; // Assuming you've set this in your .env file

const Webcams = () => {
    const [webcams, setWebcams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWebcams = async () => {
            try {
                const response = await fetch(`${API_URL}?api_key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setWebcams(data.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchWebcams();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching webcams: {error.message}</p>;

    return (
        <div>
            <div className={'topbar'}>
                <h1 class='page-title'>National Park Webcams</h1>
            </div>
            <ul>
                {webcams.map((webcam) => {
                    if (webcam.images[0] != null) {
                        console.log(webcam.images[0].url + "no image available");
                        return (
                            <>

                            </>
                        );
                    } else {
                        return (
                            <li key={webcam.id}>
                                <h2>{webcam.title}</h2>
                                <iframe src={webcam.url} style={{ width: 1200, height: 600 }} />
                                <p>{webcam.description}</p>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default Webcams;