import NextAuth from "next-auth/next";
import SpotifyProvider from 'next-auth/providers/spotify';

import spotifyAPI,  { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
    try{
        spotifyAPI.setAccessToken(token.accessToken);
        spotifyAPI.setRefreshToken(token.refreshToken);

        const { body: refreshedToken } = await spotifyAPI.refreshAccessToken();

        return{
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpired: Date.now() - refreshedToken.expired_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
        }
    } catch( error ){
       console.log( error )
       return {
           ...token,
           error: 'Refresh Token Error'
       } 
    }
}

export default NextAuth({
    providers: [
        SpotifyProvider({
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        authorization: LOGIN_URL
      }),
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({ token, account, user }){
            // Initial
            if (account && user){
                return{
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpired: account.expires_at * 1000
                }
            }

            // Not expired
            if (Date.now() < token.accessTokenExpired){
                return token;
            }

            // Expired
            return await refreshAccessToken(token)
        },

        async session({ session, token}) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;

            return session;
        }
    }
})