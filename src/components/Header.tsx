import { Moon, Sun } from "react-feather"
import useTrelloStore from "../store"
import Button from "./Button"

interface IProps {
  title: string
}

function Header({ title }: IProps) {
  const setDarkMode = useTrelloStore((state) => state.setDarkMode)
  const darkMode = useTrelloStore((state) => state.darkMode)

  return (
    <header className="flex items-center px-6 py-2">
      <h1 className="text-xl text-white font-bold ml-auto drop-shadow-xl">
        {title}
      </h1>
      <Button className="ml-auto" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <Sun /> : <Moon />}
      </Button>
    </header>
  )
}

export default Header
