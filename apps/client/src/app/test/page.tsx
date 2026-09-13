import { auth } from '@clerk/nextjs/server';
import React from 'react'

export default async function TestPage() {
    const { getToken } = await auth()
    const token = await getToken();

    console.log(token)
    const res = await fetch('http://localhost:8000/test', {
        headers: {
            authorization: `Bearer ${token}`
        },
    });

    const data = await res.json()
    console.log(data);
    return (
        <div>TestPage</div>
    )
}