import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistInstanceState, playlistState } from '../atoms/playlistAtom';
import useSpotify from "../lib/useSpotify";
import Songs from "./Songs";

const colors = [
    'from-indigo-500',
    'from-pink-500',
    'from-yellow-500',
    'from-blue-500',
    'from-red-500',
    'from-purple-500',
    'from-green-500'
];

function Center() {
    const { data: session } = useSession();
    const [color, setColor] = useState(null);
    const spotifyAPI = useSpotify();
    const [ playlist, setPlaylist ] = useRecoilState(playlistState);
    const playlistInstance = useRecoilValue(playlistInstanceState);

    useEffect(() => {
      setColor(shuffle(colors).pop());
    }, [playlistInstance]);

    useEffect(() => {
        spotifyAPI.getPlaylist(playlistInstance).then((data) => {
            setPlaylist(data.body)
        }).catch((error) => console.log("Something went wrong!", error))
      }, [spotifyAPI, playlistInstance])
  return (
    <div className="flex-grow text-white">
        <header className="absolute top-5 right-8">
            <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                <img src={session?.user.image} className='w-10 h-10 rounded-full' alt={session?.user.name}/>
                <h2>{session?.user.name}</h2>
                <ChevronDownIcon className="h-5 w-5"/>
            </div>
        </header>

        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
            <img className='w-44 h-44 shadow-2xl' src={playlist?.images?.[0]?.url} alt='Playlist image'/>
            <div>
                <p>PLAYLIST</p>
                <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
            </div>
        </section>
        <div>
            <Songs/>
        </div>
    </div>
  )
}

export default Center
