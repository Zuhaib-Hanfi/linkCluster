import { Button } from '@/components/ui/button'
import { getAllLinkForUser } from '@/modules/links/actions'
import LinkForm from '@/modules/links/components/link-form'
import { getCurrentUsername } from '@/modules/profile/actions'
import { profile } from 'console'
import { Brush, Share } from 'lucide-react'

import React from 'react'

const page = async () => {
  const profile = await getCurrentUsername();
  const links = await getAllLinkForUser();
  return (
    <section className='flex flex-col gap-6 px-4 py-6 '>

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
        <Button
          variant="outline"
          size="default"
          className="fixed top-[10vh] right-[2vw]"
        >Check your page</Button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start py-14'>
        <div className='order-2 lg:order-1 border-r p-4'>
          <LinkForm
            username={profile?.username!}
            bio={profile?.bio!}
            // @ts-ignore
            link={links.data!}
            // @ts-ignore
            socialLinks={profile?.socialLinks!}
          />
        </div>
      </div>
    </section>
  )
}

export default page