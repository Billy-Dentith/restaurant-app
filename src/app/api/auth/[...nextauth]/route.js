import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

export const authOptions = {
    adapter: PostgresAdapter(pool), 
    session: {
        strategy: "jwt"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
          }),
    ],
    callbacks: {
        async session({token, session, user}) {
            if (user) {                
                session.is_admin = user.is_admin;
            }
            return { ...token, ...session };
        },
        async jwt({ token, user }) {
            if (user) {
                token.is_admin = user.is_admin;
            }
            return { ...token, ...user }; 
        }
    }
}

export const getAuthSession = () => getServerSession(authOptions)

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};