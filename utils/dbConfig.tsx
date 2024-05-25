import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'
const sql = neon('postgresql://soccerteriadb_owner:pyWmOcrs3gM5@ep-still-snowflake-a5u5bmnf.us-east-2.aws.neon.tech/soccerteriadb?sslmode=require')
export const db = drizzle(sql, { schema })
