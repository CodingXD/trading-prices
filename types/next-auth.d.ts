import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's other info. */
      firstName: string;
      lastName: string;
      image: string | null;
      email: string;
    } & DefaultSession["user"];
  }
}
