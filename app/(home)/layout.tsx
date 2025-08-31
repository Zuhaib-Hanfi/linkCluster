import React from 'react'

interface Props {
    children: React.ReactNode;
}
const HomeLayout = ({ children }: Props) => {
    return (
        <main className='flex flex-col minn-h-screen max-h-screen'>HomeLayout</main>
    )
}

export default HomeLayout