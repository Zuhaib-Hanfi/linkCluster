import { onBoardUser } from '@/modules/auth/actions'
import React from 'react'

const HomePage = () => {
  await onBoardUser(); 
  return (
    <div>HomePage</div>
  )
}

export default HomePage