import { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';

import useSpotify from "./useSpotify"
import { currentTrackState } from '../atoms/songAtom';

function useSongInfo() {
    const spotifyAPI = useSpotify();
    const trackId = useRecoilValue(currentTrackState);
    const [ songInfo, setSongInfo ] = useState(null);

    useEffect(() => {
        const fetchInfo = async () => {
            if (trackId){
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${trackId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyAPI.getAccessToken()}`
                        }
                    }
                ).then(res => res.json());

                setSongInfo(trackInfo);
            }
        };
        fetchInfo();
    }, [ trackId, spotifyAPI ]);
    

    return songInfo;
}

export default useSongInfo