import { useEffect, useState } from 'react'
import toast, { toastConfig } from 'react-simple-toasts'

import { Storage } from '@plasmohq/storage'

const storage = new Storage()

export const useActivateExtension = () => {
  const [isExtensionActive, setIsExtensionActive] = useState<boolean>()

  const handleActivateExtension = async () => {
    setIsExtensionActive(prev => !prev)
    await storage.set('isExtensionActive', !isExtensionActive)
    handleToast()
  }

  const handleToast = () =>
    !isExtensionActive
      ? toast('Extension Activated!', {
          position: 'top-right',
          theme: 'success',
        })
      : toast('Extension Deactivated!', {
          position: 'top-right',
          theme: 'success',
        })
        
  useEffect(() => {
    storage
      .get('isExtensionActive')
      .then(state => setIsExtensionActive(state ? Boolean(state) : false))
  }, [])
  return { isExtensionActive, handleActivateExtension }
}
