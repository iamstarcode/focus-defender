import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export const getBlockedWebsites = async (setBlockedWebsites: ([]) => void) => {
  storage
    .get("blockedWebsites")
    .then((websites) => setBlockedWebsites(websites || []))
}

export const isValidURL = (url: string) => {
  return url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  )
};

export const extractHostname = (currentUrl: string) => {
  const hasProtocol = /^(https?|ftp):\/\//i.test(currentUrl)
  if (!isValidURL(currentUrl)) return
  if (hasProtocol) {
    return new URL(currentUrl).hostname.replace(/^www\./i, "")
  }
  return currentUrl.replace(/^www\./i, "")
}

export const blockUrl = async (
  currentUrl: string,
  blockedWebsites: string[],
  setBlockedWebsites: ([]) => void,
  reloadCurrentPage?: () => void
) => {
  const extractedUrl = extractHostname(currentUrl)
  if (!extractedUrl) return
  setBlockedWebsites([extractedUrl, ...blockedWebsites])
  await storage.set("blockedWebsites", [extractedUrl, ...blockedWebsites])
  if (reloadCurrentPage) reloadCurrentPage()
}

export const getCurrentTabUrl: () => Promise<string> = async () => {
  const queryInfo: chrome.tabs.QueryInfo = {
    active: true,
    currentWindow: true
  }

  const [tab] = await chrome.tabs.query(queryInfo)
  return new URL(tab.url).hostname.replace(/^www\./i, "")
}
