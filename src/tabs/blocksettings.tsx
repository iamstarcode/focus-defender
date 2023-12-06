import React from 'react'
import SideBar from '~components/SideBar'
import AddWebsite from '~components/blockSettings/AddWebsite'


export default function BlockSettingsPage() {
  return (
    <div className='flex flex-row w-full'>
      <SideBar />
      <div className='w-[50%] m-6'>
        <AddWebsite />
      </div>

    </div>
  )
}
