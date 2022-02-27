import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-private',
    'user-follow-read',
    'user-library-read',
    'streaming',
    'user-read-playback-position',
    'playlist-modify-private',
    'playlist-read-collaborative',
    'user-read-email',
    'playlist-read-private',
    'user-top-read',
    'playlist-modify-public',
    'user-read-currently-playing',
    'user-read-recently-played'
].join(',');

const params = {
    scope: scopes
};

const queryParams = new URLSearchParams(params);
export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;

const spotifyAPI = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
})

export default spotifyAPI;
