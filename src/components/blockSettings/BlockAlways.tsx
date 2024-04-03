import React, {useState} from 'react'

import { Button } from '~components/ui/button'
import { Switch } from '~components/ui/switch'
import { useActivateExtension } from '~hooks/useActivateExtension'

export default function BlockAlways() {
  const [isScheduled, setIsScheduled] = useState(false)
  const [isPersonalMode, setIsPersonalMode] = useState(false)

  const { isExtensionActive, handleActivateExtension } = useActivateExtension()

  const handleScheduled = () => {
    setIsScheduled(!isScheduled)
  }
  const handlePersonalMode = () => {
    setIsPersonalMode(!isPersonalMode)
  }
  
  return (
    <>
    {/* Block Always Switch */}
    <div className="flex justify-between mt-6 w-full">
      <div className="flex items-start space-x-3">
        <p className={`text-sm font-bold  ${isScheduled ? 'text-gray-500': 'text-primary'}`}>Block Always</p>
        <Switch checked={isScheduled} onCheckedChange={handleScheduled}/>
        <p className={`text-sm font-bold  ${isScheduled ? 'text-primary': 'text-gray-500'}`}>Schedule</p>
      </div>
      <Button
        aria-label="activate-extension"
        type="button"
        variant="default"
        size="default"
        className="px-10"
        onClick={handleActivateExtension}
      >
        {isExtensionActive ? "Deactivate" : "Activate"}
      </Button>
    </div>
    {/* Work Mode Switch */}
    <div className="flex items-start space-x-4 mt-6 w-full">
      <div className="flex items-start space-x-3">
        <p className={`text-sm font-bold  ${isPersonalMode ? 'text-gray-500': 'text-primary'}`}>Work Mode</p>
        <Switch checked={isPersonalMode} onCheckedChange={handlePersonalMode} />
      
      </div>
      <div className="flex items-start space-x-3">
        <p className={`text-sm font-bold  ${isPersonalMode ? 'text-primary': 'text-gray-500'}`}>Personal Mode</p>
      </div>
    </div>
    </>
  )
}
