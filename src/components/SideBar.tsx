import React from 'react'
import Logo from "data-base64:~/assets/logo.png"
import cssText from "data-text:~style.css"

import '../style.css'
import SideNav from './SideNav'


export const getStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
  }

export default function SideBar() {
  return (
    <div className='bg-[#d8ddee] w-[30%] h-full rounded-xl min-h-screen'>
        <img
        src={Logo}
        alt="logo"
        className="my-[10%] w-[280px] mx-auto"
      />
        <SideNav />
        </div>
  )
}
