import { useRef, useState } from "react"
import { Check, Download, Menu, Moon, Sun, Upload, X } from "react-feather"
import useTrelloStore, { TrelloState } from "../store"
import Button from "./Button"
import Dropdown, { DropdownItem } from "./Dropdown"
import Modal from "./Modal"
import ProjectSelector from "./ProjectSelector"

interface IProps {
  title: string
}

function Header({ title }: IProps) {
  const [showImportConfirmModal, setShowImportConfirmModal] = useState(false)

  const jsonFileInputRef = useRef<HTMLInputElement>(null)

  const setDarkMode = useTrelloStore((state) => state.setDarkMode)
  const darkMode = useTrelloStore((state) => state.darkMode)
  const getState = useTrelloStore((state) => state.getState)
  const setState = useTrelloStore((state) => state.setState)
  const isEmpty = useTrelloStore((state) => state.isEmpty)

  const importJson = () => {
    let files = jsonFileInputRef.current?.files
    if (!files) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const jsonStr = event.target?.result?.toString()
      if (!jsonStr) return

      try {
        const newState: TrelloState | null = jsonStr
          ? JSON.parse(jsonStr)
          : null
        if (newState) setState(newState)
      } catch {
        alert("Import Failed: Unsupported import file")
      }
    }
    reader.readAsText(files[0])
  }

  return (
    <header className="flex items-center px-4 py-2">
      <ProjectSelector className="ml-auto" />
      <h1 className="text-xl text-white font-bold mx-auto drop-shadow-xl">
        {title}
      </h1>
      <Dropdown
        className="right-6 mt-11 ml-auto"
        trigger={(handleClick) => (
          <Button
            className="ml-auto text-gray-800 dark:text-gray-200"
            onClick={handleClick}
          >
            <Menu />
          </Button>
        )}
      >
        <DropdownItem onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className="ml-2">
            Toogle {darkMode ? "light" : "dark"} mode
          </span>
        </DropdownItem>
        <DropdownItem>
          <label className="flex-1 flex items-center cursor-pointer">
            <Upload size={20} />
            <span className="ml-2">Import as JSON</span>
            <input
              type="file"
              accept=".json"
              className="hidden"
              ref={jsonFileInputRef}
              onChange={() => {
                isEmpty() ? importJson : setShowImportConfirmModal(true)
              }}
            />
          </label>
        </DropdownItem>
        <DropdownItem>
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(getState())
            )}`}
            download="trello-export.json"
            className="flex flex-1 items-center"
          >
            <Download size={20} />
            <span className="ml-2">Export as JSON</span>
          </a>
        </DropdownItem>
      </Dropdown>

      {showImportConfirmModal && (
        <Modal
          danger
          title="Please Confirm Overwrite"
          body={`Current board state will be overwritten`}
        >
          <Button
            onClick={() => {
              importJson()
              setShowImportConfirmModal(false)
            }}
            className="!bg-red-500"
          >
            <Check className="mr-2 w-5 h-5" />
            <span>Confirm Overwrite</span>
          </Button>
          <Button
            onClick={() => setShowImportConfirmModal(false)}
            className="!bg-gray-600/50"
          >
            <X className="mr-2 w-5 h-5" />
            <span>Cancel</span>
          </Button>
        </Modal>
      )}
    </header>
  )
}

export default Header
