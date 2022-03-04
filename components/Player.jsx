import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import useSpotify from '../lib/useSpotify';
import { currentTrackState, isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../lib/useSongInfo';
import { SwitchHorizontalIcon, RefreshIcon, VolumeOffIcon } from '@heroicons/react/outline';
import { FastForwardIcon, PlayIcon, RewindIcon, PauseIcon, VolumeUpIcon } from '@heroicons/react/solid';
import { debounce } from 'lodash';

function Player() {
    const spotifyAPI = useSpotify();
    const songInfo = useSongInfo();
    const {data: session, status } = useSession();
    const [trackId, setTrackId] = useRecoilState(currentTrackState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyAPI.getMyCurrentPlayingTrack().then((data) => {setTrackId(data.body?.item?.id)})
            spotifyAPI.getMyCurrentPlaybackState().then((data) => {
                setIsPlaying(data.body?.is_playing)
            })
        }
    }

    useEffect(() => {
        if(spotifyAPI.getAccessToken() && !trackId){
            fetchCurrentSong();
            setVolume(50);
        }
    }, [ trackId, spotifyAPI, session ]);

    useEffect(() => {
      if (volume > 0 && volume < 100){
        AdjustVolume(volume);
      }
    }, [volume]);
    
    const AdjustVolume = useCallback(
        debounce((volume) => {
            spotifyAPI.setVolume(volume).catch((err) => {});
        }, 200)
    );

    // useEffect(() => {
    //     const script = document.createElement("script");
    //     script.src = "https://sdk.scdn.co/spotify-player.js";
    //     script.async = true;
    //     document.body.appendChild(script);
    //     window.onSpotifyWebPlaybackSDKReady = () => {
    //         const player = new window.Spotify.Player({
    //             name: 'Web Playback SDK',
    //             getOAuthToken: cb => { cb(spotifyAPI.getAccessToken()); },
    //             volume: 0.5
    //         });
    //         setPlayer(player);
    //         player.connect();
    
    //     };
    // }, [spotifyAPI, session]);

    const handlePlay = () => {
        spotifyAPI.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing){
                spotifyAPI.pause();
                setIsPlaying(false);
            } else {
                spotifyAPI.play();
                setIsPlaying(true);
            }
        })
    };

    return (
        <div className='grid grid-cols-3 text-sm md:text-base px-2 md:px-8 h-24 bg-gradient-to-b from-black to-gray-900 text-white'>
            <div className='flex items-center space-x-4'>
                <img className='hidden md:inline h-12 w-12' src={songInfo?.album.images[0].url} alt="img"/>
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            <div className='flex items-center justify-evenly'>
                <SwitchHorizontalIcon className='button'/>
                <RewindIcon className='button'/>
                
                {isPlaying ? (
                    <PauseIcon onClick={handlePlay} className='button w-10 h-10'/>
                ):(
                    <PlayIcon onClick={handlePlay} className='button w-10 h-10'/>
                )}
                <FastForwardIcon className='button'/>
                <RefreshIcon className='button'/>
            </div>
            <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
                <VolumeOffIcon onClick={() => setVolume(0)} className='button'/>
                <input className='w-14 md:w-28' type='range' value={volume} min={0} max={100} onChange={(e) => setVolume(Number(e.target.value))}/>
                <VolumeUpIcon onClick={() => volume <= 90 && setVolume(volume + 10)} className='button'/>
            </div>
        </div>
    )
}

export default Player