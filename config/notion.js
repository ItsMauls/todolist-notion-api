import dotenv from 'dotenv'
import { Client } from '@notionhq/client'

dotenv.config();

export const notion = new Client({ auth: process.env.NOTION_API_KEY });
export const databaseId = process.env.NOTION_DATABASE_ID;

