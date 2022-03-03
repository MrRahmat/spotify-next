import useSpotify from '../lib/useSpotify';
import { time } from '../lib/time';
import { useRecoilState } from 'recoil';
import { currentTrackState, isPlayingState } from '../atoms/songAtom';

function Song({ order, track }) {
    const spotifyAPI = useSpotify();
    const [trackId, setTrackId] = useRecoilState(currentTrackState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const playSong = async () => {
        setTrackId(track.id);
        setIsPlaying(true);
        spotifyAPI.play({
            uris: [track.uri]
        })
    }

    return (
        <div className='grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg' onClick={playSong}>
            <div className='flex items-center space-x-4'>
                <p>{order + 1}</p>
                <img className='h-10 w-10' src={track.album.images[0].url} alt={track}/>
                <div>
                    <p className='w-36 lg:w-64 truncate text-white'>{track.name}</p>
                    <p className='w-40'>{track.artists[0].name}</p>
                </div>
            </div>
            <div className='flex items-center justify-between ml-auto md:ml-0'>
                <p className='w-40 hidden md:inline'>{track.album.name}</p>
                <p>{time(track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song