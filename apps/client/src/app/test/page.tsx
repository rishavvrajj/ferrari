import { auth } from '@clerk/nextjs/server';
import React from 'react'

export default async function TestPage() {
    const { getToken } = await auth()
    const token = await getToken();

    const resProduct = await fetch('http://localhost:8000/test', {
        headers: {
            authorization: `Bearer ${token}`
        },
    });

    const dataProduct = await resProduct.json()
    console.log(dataProduct);

    const resOrder = await fetch('http://localhost:8001/test', {
        headers: {
            authorization: `Bearer ${token}`
        },
    });

    const dataOrder = await resOrder.json()
    console.log(dataOrder);

    return (
        <div>TestPage</div>
    )
}