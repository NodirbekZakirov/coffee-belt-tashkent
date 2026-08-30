import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Allow any Google user to sign in so guests can reserve tables and leave reviews
      return true;
    },
    async session({ session, token }) {
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
