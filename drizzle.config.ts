import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: "./utils/schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://soccerteriadb_owner:pyWmOcrs3gM5@ep-still-snowflake-a5u5bmnf.us-east-2.aws.neon.tech/soccerteriadb?sslmode=require',
    },
    verbose: true,
    strict: true,
})