import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import bcrypt from "bcryptjs";
import "dotenv/config";

// Redefine table here to avoid import issues
const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").unique().notNull(),
    password: text("password").notNull(),
    role: text("role").default("admin").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

async function main() {
    if (!process.env.DATABASE_URL) {
        console.error("DATABASE_URL is missing");
        process.exit(1);
    }

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    const db = drizzle(pool);

    const username = "admin";
    const password = "adminpassword";

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(`Creating user: ${username}...`);

    try {
        await db.insert(users).values({
            username,
            password: hashedPassword,
            role: "admin",
        });
        console.log("Success! Gebruiker aangemaakt.");
        console.log(`User: ${username}`);
        console.log(`Pass: ${password}`);
    } catch (error: any) {
        if (error.code === '23505') {
            console.log("Fout: Gebruiker bestaat al.");
        } else {
            console.error("Fout bij aanmaken gebruiker:", error);
        }
    } finally {
        process.exit();
    }
}

main();
