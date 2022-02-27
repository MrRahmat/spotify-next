import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';

function Login({ providers }){
    return(
        <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
            <Image className='mb-5' src='/spotify.png' width='250px' height='250px' alt='Spotify'/>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button 
                    className='bg-[#18d860] text-white p-5 rounded-full' 
                    onClick={() => signIn(provider.id, { callbackUrl: '/'})}
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();
    return {
        props: {
            providers,
        }
    }
}