import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Demo() {
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/get-data/')
            .then((response) => {
                setData(response.data.message);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div>
            <h1>{data}</h1>
        </div>
    );
}

export default Demo;