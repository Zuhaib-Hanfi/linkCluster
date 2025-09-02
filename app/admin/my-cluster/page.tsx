import { Button } from '@/components/ui/button'
import { Brush, Share } from 'lucide-react'

import React from 'react'

const page = () => {
  return (
    <section className='flex flex-col gap-6 px-4 py-6'>
      <div className='flex flex-row items-center justify-start w-full'>
        <div className='flex flex-row justify-center items-center gap-3'>
          <Button
            variant="outline"
            size="default"
            className="gap-2 bg-transparent"
          >
            <Brush size={16} />
            Design
          </Button>
          <Button
            variant="default"
            size="default"
            className="gap-2 "
          >
            <Share size={16} />
            Share
          </Button>
        </div>

      </div>
    </section>
  )
}

export default page