/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import strapiClient from '@/lib/clients/strapiClient';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        const { email, password }: any = credentials;

        try {
          const res = await strapiClient.post('/api/auth/local', {
            identifier: email,
            password,
          });

          const {
            data: { user, jwt },
          } = res;
          return {
            ...user,
            jwt,
          };
        } catch (error: any) {
          if (error?.response?.status === 400) {
            throw new Error('Usuario o contraseña incorrectos');
          } else {
            throw new Error('Error inesperado');
          }
        }
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(authOptions);
