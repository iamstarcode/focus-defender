import icon from "data-base64:~/assets/icon.png"
import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { useEffect, useState } from "react"
import { Storage } from "@plasmohq/storage"

const storage = new Storage()


export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
  css: ["font.css"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getOverlayAnchor: PlasmoGetInlineAnchor = async () =>
  document.querySelector(`body`)

  export const isCurrentUrlBlocked = (currentUrl: string, blockedUrl: string) => {
    const blockedUrlRegex = new RegExp(blockedUrl?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return blockedUrlRegex.test(currentUrl);
  }

const BlockScreen = () => {
  const [hide, setHide] = useState<boolean>()
  const [blockedWebsites, setBlockedWebsites] = useState<any>([])

  const handleBlockScreenStyle = (overflowYStyle: string, hide: boolean) => {
    document.body.style.overflowY = overflowYStyle
    setHide(hide)
  }

  useEffect(() => {
    storage.get("blockedWebsites").then(
      (websites) => setBlockedWebsites(websites || [])
    )
  }, [])
  
  useEffect(() => {
      const currentUrl = window.location.hostname.replace(/^www\./i, "");
      const filteredBlockedWebsites = blockedWebsites.filter(Boolean);
      const isWebsiteBlocked = filteredBlockedWebsites.some((blockedUrl: string) => isCurrentUrlBlocked(currentUrl, blockedUrl));
      
      const overflowYStyle = isWebsiteBlocked ? "hidden" : "scroll";
      const shouldHideBlockscreen = !isWebsiteBlocked;
      
    
      handleBlockScreenStyle(overflowYStyle, shouldHideBlockscreen)
    }, [blockedWebsites])
    
    const handleUnblock = () => handleBlockScreenStyle("scroll", true)

  if (hide) return null

  return (
    <>
      <div className="w-screen h-screen p-12 text-black bg-white">
        <div className="flex flex-col items-center justify-between w-full h-full">
          <div></div>
          <div className="flex space-x-2">
            <img
              onClick={handleUnblock}
              className="w-10 h-10 cursor-pointer"
              src={icon}
              alt="focus defender icon"
            />
            <h2 className="text-3xl font-bold">FocusDefender</h2>
          </div>

          <div className="inline-flex items-center space-x-4 pb-14">
            <h2 className="text-3xl font-bold capitalize">STAY PRODUCTIVE </h2>
            <h3 className="pl-4 text-xl">
              You can disable the extension by clicking on
            </h3>
            <img className="w-6 h-6" src={icon} alt="focus defender icon" />
            <h3 className="text-xl">and access the website again.</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlockScreen
