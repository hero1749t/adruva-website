import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy_google_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_google_client_secret',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Login failed');
          }

          const user = await res.json();
          if (user && user.id) {
            return user;
          }
          return null;
        } catch (error) {
          throw new Error((error as Error).message || 'Invalid credentials');
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google-verify`, {
            method: 'POST',
            body: JSON.stringify({ email: user.email }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (!res.ok) {
            return false;
          }

          const dbUser = await res.json();
          user.id = dbUser.id;
          user.role = dbUser.role;
          user.name = dbUser.name;
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
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback_secret_value',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
