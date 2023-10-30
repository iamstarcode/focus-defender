import cssText from "data-text:~style.css"
import { useEffect, useState } from "react"

import FocusDefenderIcon from "~assets/icon.png"
import SettingsIcon from "~/assets/settings_icon.png"

import "./style.css"

import { Button } from "~components/ui/button"
import { Input } from "~components/ui/input"
import { Switch } from "~components/ui/switch"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function IndexPopup() {
  const [currentUrl, setCurrentUrl] = useState<string>("")

  const getCurrentUrl: () => Promise<void> =  async () => {
    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };
    
    const [tab] = await chrome.tabs.query(queryInfo);
    setCurrentUrl(tab.url)
  }

  useEffect(() => {
    getCurrentUrl()
  }, [currentUrl])
  

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
          <Button variant="ghost" size="icon" onClick={() => window.open('options.html')}>
          <img
            src={SettingsIcon}
            alt="settings_icon"
            className="w-6 h-6"
          />
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <p className="text-lg font-medium">Domain</p>
        <Input defaultValue={currentUrl} />
        <div className="flex items-start space-x-3">
          <p className="text-sm font-medium">Block All Pages</p>
          <Switch />
        </div>
        <Button>Block URL</Button>
      </div>
    </div>
  )
}

export default IndexPopup
