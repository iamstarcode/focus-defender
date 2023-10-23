import cssText from "data-text:~style.css"
import { useState } from "react"

import "./style.css"

import { Button } from "~components/ui/button"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div>
      <h2>
        Welcome to your
        <a href="https://www.plasmo.com" target="_blank">
          {" "}
          Plasmo
        </a>{" "}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
      <button className="bg-red-700 text-lg">dede</button>
      <Button>FocusFinder</Button>
    </div>
  )
}

export default IndexPopup
