import React from "react"
import { Moon, Sun } from "react-feather"
import Button from "./Button"

interface IProps {
  title: string
  darkMode: boolean
  toggleDarkMode: () => void
}

function Header({ title, darkMode, toggleDarkMode }: IProps) {
  return (
    <header className="flex items-center px-6 py-2">
      <h1 className="text-xl text-white font-bold ml-auto">{title}</h1>
      <Button className="ml-auto" onClick={toggleDarkMode}>
        {darkMode ? <Sun /> : <Moon />}
      </Button>
    </header>
  )
}

export default Header