import OAuthCredentialsStorageService from "@/lib/auth";
import { NextAuthOptions } from "next-auth";

export default async function getMastodonConfig(
  serverBaseUrl: string,
  callbackBaseUrl: string,
): Promise<NextAuthOptions> {
  const serverStorage = OAuthCredentialsStorageService.createStorage();
  const credentials = await serverStorage.getCredentials(serverBaseUrl);

  const config: NextAuthOptions = {
    providers: [
      {
        id: "mastodon",
        name: "Mastodon",
        type: "oauth",
        authorization: {
          url: serverBaseUrl + "/oauth/authorize",
          params: {
            response_type: "code",
            redirect_uri: callbackBaseUrl + "/api/auth/callback/mastodon",
            scope: "read",
          },
        },
        token: serverBaseUrl + "/oauth/token",
        clientId: credentials?.clientId,
        clientSecret: credentials?.clientSecret,
        userinfo: serverBaseUrl + "/api/v1/accounts/verify_credentials",
        profile: (data: any) => {
          return {
            id: data.id,
            name: data.username,
          };
        },
      },
    ],
    callbacks: {
      async jwt({ token, user, account, profile, isNewUser }) {
        if (account?.access_token) {
          token.access_token = account.access_token;
        }
        return token;
      },

      async session({ session, token }) {
        console.log(token);
        if (token.access_token) {
          session.access_token = token.access_token;
        }
        return session;
      },
    },
    pages: {
      signIn: "/auth/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
  };

  return config;
}
