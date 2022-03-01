import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import spotifyAPI from './spotify';

function useSpotify() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session){
            if (session.error === 'Refresh Token Error'){
                signIn();
            }

            spotifyAPI.setAccessToken(session.user.accessToken);
        }
    }, [session]);

    return spotifyAPI;
}

export default useSpotify;