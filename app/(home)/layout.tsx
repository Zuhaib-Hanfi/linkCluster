import NavBar from '@/modules/home/components/navbar';
import React from 'react'

interface Props {
    children: React.ReactNode;
}
const HomeLayout = ({ children }: Props) => {
    return (
        <main className='flex flex-col minn-h-screen max-h-screen'>

            <NavBar />

            <div className='flex flex-col px-4 pb-4'>



                {/* Diagonal Grid with Light */}


                <div
                    className="absolute inset-0 -z-10 h-full w-full pointer-events-none
             dark:bg-[repeating-linear-gradient(45deg,rgba(61,109,255,0.3)_0,rgba(140,82,255,0.3)_1px,transparent_1px,transparent_20px),repeating-linear-gradient(-45deg,rgba(61,109,255,0.3)_0,rgba(140,82,255,0.3)_1px,transparent_1px,transparent_20px)]
             bg-[repeating-linear-gradient(45deg,rgba(61,109,255,0.15)_0,rgba(140,82,255,0.15)_1px,transparent_1px,transparent_20px),repeating-linear-gradient(-45deg,rgba(61,109,255,0.15)_0,rgba(140,82,255,0.15)_1px,transparent_1px,transparent_20px)]
             bg-[size:40px_40px]"
                />



                {children}

            </div>
        </main>

    )
}

export default HomeLayout