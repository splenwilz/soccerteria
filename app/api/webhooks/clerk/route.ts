import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { User } from '@/lib/types'
import { createUser } from '@/lib/user'
import { getUserCountry } from '@/lib/get_country'
import { countryToCurrencyMap } from '@/lib/country_currency'


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
        const { id, email_addresses, first_name, last_name, image_url, created_at } = evt.data
        console.log(evt.data)
        if (!id || !email_addresses) {
            return new Response('Error occurred -- missing data', {
                status: 400
            })
        }

        //         id: serial("id").primaryKey(),
        //   userId: text("userId").notNull().unique(),
        //   email: text("email").notNull().unique(),
        //   firstName: text("firstName"),
        //   lastName: text("lastName"),
        //   imageUrl: text("imageUrl"),
        //   gender: text("gender"),
        //   address: text("address"),
        //   street: text("street"),
        //   city: text("city"),
        //   state: text("state"),
        //   postcode: text("postcode"),
        //   country: text("country"),
        //   countryCode: text("countryCode"),
        //   currency: text("currency"),
        //   phone: text("phone"),
        //   role: text("role").notNull().$type<"admin" | "user">().default("user"),




        const userCountry = await getUserCountry();
        const currency = countryToCurrencyMap[userCountry?.country_code2 || "US"] || "USD";

        const user = {
            userId: id,
            email: email_addresses[0].email_address,
            ...(first_name ? { firstName: first_name } : {}),
            ...(last_name ? { lastName: last_name } : {}),
            ...(image_url ? { imageUrl: image_url } : {}),
            gender: '',
            address: '',
            role: 'user',
            ...(created_at ? { createdAt: created_at } : {}),
            street: '',
            city: userCountry?.city,
            state: userCountry?.state_prov,
            postcode: userCountry?.zipcode,
            country: userCountry?.country_name,
            countryCode: userCountry?.country_code2,
            currency: userCountry?.currency.code || currency,
            currencySymbol: userCountry?.currency.symbol,
            phone: '',
        }


        await createUser(user as User)
        console.log('User created:', user)
    }

    return new Response('', { status: 200 })
}