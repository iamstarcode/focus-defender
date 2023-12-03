import { Storage } from "@plasmohq/storage"
import { blockList } from "~constants";

export {}

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
      await addDefaultBlockedWebsites()
    }
  });

  const addDefaultBlockedWebsites = async () => {
    const storage = new Storage()
    await storage.set("blockedWebsites", blockList)
    console.log("default blocked websites added successfully")
  }
