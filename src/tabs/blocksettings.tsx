import React from 'react'
import SideBar from '~components/SideBar'
import AddWebsite from '~components/blockSettings/AddWebsite'
import BlockAlways from '~components/blockSettings/BlockAlways'
import WorkMode from '~components/blockSettings/Schedule'


export default function BlockSettingsPage() {
  return (
    <div className='flex flex-row w-full'>
      <SideBar />
      <div className='w-[50%] mt-10 ml-10'>
        <h2 className='text-3xl font-bold mt-6'>Block Settings</h2>
        <BlockAlways />
        <WorkMode />
        <AddWebsite />
      </div>

    </div>
  )
}
