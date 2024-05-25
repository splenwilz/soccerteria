import { User } from "./types"
import { db } from "../utils/dbConfig"
import { UserSchema } from "../utils/schema"
export const createUser = async (userdata: User) => {
    // db.delete(user)
    const userresult = await db
        .insert(UserSchema)
        .values([userdata])
        .returning({
            id: UserSchema.id,
            first_name: UserSchema.firstName,
            last_name: UserSchema.lastName,
            email: UserSchema.email,
        })

    console.log(userresult[0])
}