import cssText from "data-text:~style.css"
import { useEffect, useState } from "react"

import SettingsIcon from "~/assets/settings_icon.png"
import FocusDefenderIcon from "~assets/icon.png"

import "./style.css"

import { Storage } from "@plasmohq/storage"

import { Button } from "~components/ui/button"
import { Input } from "~components/ui/input"
import { Switch } from "~components/ui/switch"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
const storage = new Storage()

function IndexPopup() {
  const [currentUrl, setCurrentUrl] = useState<string>("")
  const [blockedWebsites, setBlockedWebsites] = useState<any>([])

  const getCurrentUrl: () => Promise<void> = async () => {
    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true
    }

    const [tab] = await chrome.tabs.query(queryInfo)
    setCurrentUrl(new URL(tab.url).hostname)
  }

  useEffect(() => {
    getCurrentUrl()
  }, [])

  useEffect(() => {
    storage
      .get("blockedWebsites")
      .then((websites) => setBlockedWebsites(websites || []))
  }, [])
  const extractHostname = () => {
    const isValidUrl = currentUrl.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )
    const hasProtocol = /^(https?|ftp):\/\//i.test(currentUrl)
    if (!isValidUrl || blockedWebsites.includes(currentUrl)) return
    if (hasProtocol) {
      return new URL(currentUrl).hostname.replace(/^www\./i, "")
    }
    return currentUrl.replace(/^www\./i, "")
  }

  const blockUrl = async () => {
    const extractedUrl = extractHostname()
    if (!extractedUrl) return
    setBlockedWebsites([extractedUrl, ...blockedWebsites])
    await storage.set("blockedWebsites", [extractedUrl, ...blockedWebsites])
  }
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
        <Button onClick={blockUrl}>Block URL</Button>
      </div>
    </div>
  )
}

export default IndexPopup
