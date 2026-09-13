'use client'

import { UserButton } from '@clerk/nextjs'
import { ShoppingBagIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function ProfileButton() {
    const router = useRouter()
    return (
        <UserButton>
            <UserButton.MenuItems>
                <UserButton.Action
                    label='See Orders'
                    labelIcon={<ShoppingBagIcon className='w-4 h-4' />}
                    onClick={() => router.push("/orders")}
                />
            </UserButton.MenuItems>
        </UserButton>
    )
}