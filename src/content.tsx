import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"

import BlockScreen from "~features/BlockScreen"

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

const Content = () => {
  return <BlockScreen />
}

export default Content
