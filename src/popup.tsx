import cssText from "data-text:~style.css"
import { useEffect, useState } from "react"

import SettingsIcon from "~/assets/settings_icon.png"
import FocusDefenderIcon from "~assets/icon.png"

import "./style.css"

import { Storage } from "@plasmohq/storage"

import { Button } from "~components/ui/button"
import { Input } from "~components/ui/input"
import { Switch } from "~components/ui/switch"
import { useActivateExtension } from '~hooks/useActivateExtension'

import {
  blockUrl,
  extractHostname,
  getBlockedWebsites,
  getCurrentTabUrl,
  isValidURL
} from "~utils/block"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function IndexPopup() {
  const [currentUrl, setCurrentUrl] = useState<string>("")
  const [blockedWebsites, setBlockedWebsites] = useState<any>([])

  const { isExtensionActive } = useActivateExtension()

  const getCurrentUrl: () => Promise<string> = async () => {
    const url = await getCurrentTabUrl()
    setCurrentUrl(url)
    return url
  }

  const reloadCurrentPage = async () => {
    const urlToBeBlocked = extractHostname(currentUrl)
    const currentTabUrl = await getCurrentTabUrl()
    if (urlToBeBlocked === currentTabUrl) {
      chrome.tabs.reload()
    }
    window.close()
  }
  const disableBlock = () => {
    const match = extractHostname(currentUrl)
    return (
      blockedWebsites.includes(match) ||
      !isValidURL(currentUrl) ||
      !isExtensionActive
    )
  }

  useEffect(() => {
     getCurrentUrl()
  }, [])

  useEffect(() => {
    getBlockedWebsites(setBlockedWebsites)
  }, [])
  return (
    <div className="w-[420px] h-[330px] px-16 py-8 rounded-[10px] flex flex-col space-y-8">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 ml-2">
            <img
              src={FocusDefenderIcon}
              alt="focus_defender_icon"
              className="w-7 h-7"
            />
            <h2 className="text-2xl font-medium mt-[-3px]">FocusDefender</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open("options.html")}>
            <img src={SettingsIcon} alt="settings_icon" className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <p className="text-lg font-medium">Domain</p>
        <Input
          onChange={(event) => setCurrentUrl(event.target.value)}
          defaultValue={currentUrl}
        />
        <div className="flex items-start space-x-3">
          <p className="text-sm font-medium">Block All Pages</p>
          <Switch />
        </div>
        <Button
          disabled={disableBlock()}
          onClick={() =>
            blockUrl(
              currentUrl,
              blockedWebsites,
              setBlockedWebsites,
              reloadCurrentPage
            )
          }>
          Block URL
        </Button>
      </div>
    </div>
  )
}

export default IndexPopup
