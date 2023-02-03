import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const View = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState();
    useEffect(() => {
        if (location.state) {
            const { data } = location.state;
            setData(data)
        }
        else {
            navigate("/")
        }
    })
    console.log(data)
    return (
        <div className='container'>
            <h3 className='text-uppercase text-center text-decoration-underline p-2'>{data?.name}</h3>
            <div dangerouslySetInnerHTML={{ __html: data?.description }} />
        </div>
    )
}

export default View