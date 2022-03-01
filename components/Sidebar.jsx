import { HeartIcon, HomeIcon, LibraryIcon, PlusCircleIcon, RssIcon, SearchIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useSpotify from '../lib/useSpotify';
import { playlistInstanceState } from '../atoms/playlistAtom';

function Sidebar() {
    const spotifyAPI = useSpotify();
    const { data: session, status } = useSession();
    const [ playlists, setPlaylists ] = useState([]);
    const [ playlistInstance, setPlaylistInstance ] = useRecoilState(playlistInstanceState);

    useEffect(() => {
        if (spotifyAPI.getAccessToken()) {
            spotifyAPI.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyAPI])

    return (
        <div className='text-gray-500 p-5 text-xm lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex'>
            <div className='space-y-4'>
                <button className='flex items-center space-x-2 hover:text-white cursor-pointer' onClick={() => signOut()}>
                    <p>Sign Out</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white cursor-pointer'>
                    <HomeIcon className='h-5 w-5' />
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white cursor-pointer'>
                    <SearchIcon className='h-5 w-5' />
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white cursor-pointer'>
                    <LibraryIcon className='h-5 w-5' />
                    <p>Your Library</p>
                </button>
                <hr className='border-t-[.1px] border-gray-900'/>

                <button className='flex items-center space-x-2 hover:text-white cursor-pointer'>
                    <PlusCircleIcon className='h-5 w-5' />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white cursor-pointer'>
                    <HeartIcon className='h-5 w-5' />
                    <p>Liked Songs</p>
                </button>
                <hr className='border-t-[.1px] border-gray-900'/>

                {playlists.map((playlist) => (
                    
                    <p key={playlist.id} className='cursor-pointer hover:text-white' onClick={() => setPlaylistInstance(playlist.id)}>
                        {playlist.name}
                    </p>
                    
                ))}
                
                
            </div>
        </div>
    )
}

export default Sidebar
