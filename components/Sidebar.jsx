import { HeartIcon, HomeIcon, LibraryIcon, PlusCircleIcon, RssIcon, SearchIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';

function Sidebar() {
    const { data: session, status } = useSession();
  return (
    <div className='text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen'>
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

            <p className='cursor-pointer hover:text-white'>
                Playlist
            </p>
            <p className='cursor-pointer hover:text-white'>
                Playlist
            </p>
            <p className='cursor-pointer hover:text-white'>
                Playlist
            </p>
            <p className='cursor-pointer hover:text-white'>
                Playlist
            </p>
            <p className='cursor-pointer hover:text-white'>
                Playlist
            </p>
            <p className='cursor-pointer hover:text-white'>
                Playlist
            </p>
        </div>
    </div>
  )
}

export default Sidebar
