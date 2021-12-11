import React from "react"
import { GitHub } from "react-feather"

function Footer({  }) {
  return (
    <footer className={`
      flex items-center
      absolute bottom-3 right-3
      bg-gray-300/30 text-sm text-white
      p-2 rounded-lg
      dark:(bg-gray-600/60)
    `}>
      <a href="https://github.com/nimone/trelloboard" 
        target="_blank"
        className="flex items-center"
      ><GitHub className="w-5 h-5" />
      </a>
      <span className="mx-1">by</span>
      <a href="https://nimo.pages.dev/" 
        target="_blank"
        className="border-b border-green-400"
      >nimo</a>
    </footer>
  )
}

export default Footer