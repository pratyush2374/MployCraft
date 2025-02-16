import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prismaClient";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                identifier: { label: "identifier", type: "text" },
                password: { label: "password", type: "password" },
            },

            async authorize(credentials: any): Promise<any> {
                const { identifier, password } = credentials;

                const user = await prisma.user.findFirst({
                    where: {
                        OR: [{ username: identifier }, { email: identifier }],
                    },
                });

                if (!user) {
                    throw new Error("User not found");
                }

                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!isPasswordValid) {
                    throw new Error("Incorrect password");
                }

                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, //7 days
    },
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.fullName = user.fullName;
                token.email = user.email;
            }

            return token;
        },

        async session({ token, session }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.fullName = token.fullName;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
