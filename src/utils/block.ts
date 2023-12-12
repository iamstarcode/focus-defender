import { Storage } from "@plasmohq/storage"
const storage = new Storage()

export const getBlockedWebsites = async (setBlockedWebsites: ([]) => void) => {
    storage
      .get("blockedWebsites")
      .then((websites) => setBlockedWebsites(websites || []))
}

 const extractHostname = (currentUrl: string, blockedWebsites: string[]) => {
    const isValidUrl = currentUrl.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )
    const hasProtocol = /^(https?|ftp):\/\//i.test(currentUrl)
    if (!isValidUrl || blockedWebsites.includes((currentUrl))) return
    if (hasProtocol) {
      return new URL(currentUrl).hostname.replace(/^www\./i, "")
    }
    return currentUrl.replace(/^www\./i, "")
  }

  export const blockUrl = async (currentUrl: string, blockedWebsites: string[], setBlockedWebsites: ([]) => void) => {
    const extractedUrl = extractHostname(currentUrl, blockedWebsites)
    if (!extractedUrl) return
    setBlockedWebsites([extractedUrl, ...blockedWebsites])
    await storage.set("blockedWebsites", [extractedUrl, ...blockedWebsites])
  } 