import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                const [user] = await db
                    .select()
                    .from(users)
                    .where(eq(users.username, credentials.username as string));

                if (!user) return null;

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isPasswordCorrect) return null;

                return {
                    id: user.id.toString(),
                    name: user.username,
                };
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isApiRoute = nextUrl.pathname.startsWith("/api");
            const isPublicRoute = nextUrl.pathname === "/login";

            if (isPublicRoute) {
                if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));
                return true;
            }

            return isLoggedIn;
        },
    },
});
