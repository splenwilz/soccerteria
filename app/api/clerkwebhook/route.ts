// import { NextResponse } from "next/server";

// export async function POST(req: NextResponse) {
//     const json = await req.json();
//     console.log(json);
//     return new Response("", { status: 200 });
// }

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { User } from '@/lib/types'
import { createUser } from '@/lib/user'
// import { createUser } from '@/lib/users'
// import { User } from '@prisma/client'



export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error(
            'Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
        )
    }

    // Get the headers
    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error occurred', {
            status: 400
        })
    }

    const eventType = evt.type

    if (eventType === 'user.created') {
        const { id, email_addresses, first_name, last_name, image_url, created_at, gender } = evt.data

        if (!id || !email_addresses) {
            return new Response('Error occurred -- missing data', {
                status: 400
            })
        }

        // {
        //     "data": {
        //       "birthday": "",
        //       "created_at": 1654012591514,
        //       "email_addresses": [
        //         {
        //           "email_address": "example@example.org",
        //           "id": "idn_29w83yL7CwVlJXylYLxcslromF1",
        //           "linked_to": [],
        //           "object": "email_address",
        //           "verification": {
        //             "status": "verified",
        //             "strategy": "ticket"
        //           }
        //         }
        //       ],
        //       "external_accounts": [],
        //       "external_id": "567772",
        //       "first_name": "Example",
        //       "gender": "",
        //       "id": "user_29w83sxmDNGwOuEthce5gg56FcC",
        //       "image_url": "https://img.clerk.com/xxxxxx",
        //       "last_name": "Example",
        //       "last_sign_in_at": 1654012591514,
        //       "object": "user",
        //       "password_enabled": true,
        //       "phone_numbers": [],
        //       "primary_email_address_id": "idn_29w83yL7CwVlJXylYLxcslromF1",
        //       "primary_phone_number_id": null,
        //       "primary_web3_wallet_id": null,
        //       "private_metadata": {},
        //       "profile_image_url": "https://www.gravatar.com/avatar?d=mp",
        //       "public_metadata": {},
        //       "two_factor_enabled": false,
        //       "unsafe_metadata": {},
        //       "updated_at": 1654012591835,
        //       "username": null,
        //       "web3_wallets": []
        //     },
        //     "object": "event",
        //     "type": "user.created"
        //   }

        const user = {
            clerkUserId: id,
            email: email_addresses[0].email_address,
            ...(first_name ? { firstName: first_name } : {}),
            ...(last_name ? { lastName: last_name } : {}),
            ...(image_url ? { imageUrl: image_url } : {}),
            ...(gender ? { gender } : {}),
            address: '',
            role: 'user',
            ...(created_at ? { createdAt: created_at } : {})
        }


        await createUser(user as User)
        console.log('User created:', user)
    }

    return new Response('', { status: 200 })
}