import { onBoardUser } from '@/modules/auth/actions'
import React from 'react'

const HomePage = async() => {
  await onBoardUser(); 
  return (
    <div className='min-h-screen'>
      <main className='text-center space-y-8 py-32'></main>
    </div>
  )
}

export default HomePage