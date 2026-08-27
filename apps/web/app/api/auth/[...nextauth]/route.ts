import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy_google_client_id",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || "dummy_google_client_secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
              headers: { "Content-Type": "application/json" },
            },
          );

          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Login failed");
          }

          const data = await res.json();
          if (data && data.user) {
            return {
              ...data.user,
              accessToken: data.access_token,
            };
          }
          return null;
        } catch (error) {
          throw new Error((error as Error).message || "Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google-verify`,
            {
              method: "POST",
              body: JSON.stringify({ email: user.email }),
              headers: { "Content-Type": "application/json" },
            },
          );

          if (!res.ok) {
            return false;
          }

          const dbUser = await res.json();
          user.id = dbUser.user.id;
          user.role = dbUser.user.role;
          user.name = dbUser.user.name;
          (user as any).permissions = dbUser.user.permissions || [];
          (user as any).accessToken = dbUser.access_token;
          return true;
        } catch {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.permissions = (user as any).permissions || [];
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).permissions = token.permissions || [];
        (session.user as any).accessToken = token.accessToken;
      }
      // Also expose at root level for easy access via getSession()
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_value",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
