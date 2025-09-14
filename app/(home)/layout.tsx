import Footer from '@/modules/home/components/footer';
import NavBar from '@/modules/home/components/navbar';
import React from 'react'

interface Props {
    children: React.ReactNode;
}
const HomeLayout = ({ children }: Props) => {
    return (
        <main className='flex flex-col min-h-screen'>
            {/* Diagonal Grid with Light */}
            <div
                className="fixed inset-0 -z-10 h-full w-full pointer-events-none
                    dark:bg-[repeating-linear-gradient(45deg,rgba(245,158,11,0.3)_0,rgba(245,158,11,0.3)_1px,transparent_1px,transparent_20px),repeating-linear-gradient(-45deg,rgba(245,158,11,0.3)_0,rgba(245,158,11,0.3)_1px,transparent_1px,transparent_20px)]
                    bg-[repeating-linear-gradient(45deg,rgba(245,158,11,0.15)_0,rgba(245,158,11,0.15)_1px,transparent_1px,transparent_20px),repeating-linear-gradient(-45deg,rgba(245,158,11,0.15)_0,rgba(245,158,11,0.15)_1px,transparent_1px,transparent_20px)]
                    bg-[size:40px_40px]"
            />
            <NavBar />

            <div className='flex flex-col px-4 pb-4'>



                {/* Diagonal Grid with Light */}
                {/* <div
                    className="absolute inset-0 -z-10 h-full w-full pointer-events-none
                    dark:bg-[repeating-linear-gradient(45deg,rgba(245,158,11,0.3)_0,rgba(245,158,11,0.3)_1px,transparent_1px,transparent_20px),repeating-linear-gradient(-45deg,rgba(245,158,11,0.3)_0,rgba(245,158,11,0.3)_1px,transparent_1px,transparent_20px)]
                    bg-[repeating-linear-gradient(45deg,rgba(245,158,11,0.15)_0,rgba(245,158,11,0.15)_1px,transparent_1px,transparent_20px),repeating-linear-gradient(-45deg,rgba(245,158,11,0.15)_0,rgba(245,158,11,0.15)_1px,transparent_1px,transparent_20px)]
                    bg-[size:40px_40px]"
                /> */}




                {children}

            </div>
            <Footer />
        </main>

    )
}

export default HomeLayout