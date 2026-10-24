// One-off: apply a SQL file from db/ to the Neon database in DATABASE_URL.
//   node --env-file=.env.local scripts/apply-sql.mjs db/002_activity_responses.sql
import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const file = process.argv[2];
if (!file) throw new Error("usage: apply-sql.mjs <file.sql>");
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set (vercel env pull .env.local)");
const sql = neon(process.env.DATABASE_URL);
await sql.query(readFileSync(file, "utf8"));
console.log("applied", file);
const cols = await sql.query("select column_name, data_type from information_schema.columns where table_name = 'activity_responses' order by ordinal_position");
console.log(cols.map((c) => `${c.column_name}:${c.data_type}`).join(", "));
