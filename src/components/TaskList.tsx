import React, { useState } from "react"
import { Check, Edit2, MoreHorizontal, Plus, Trash, X } from "react-feather"
import Button from "./Button";
import Dropdown, { DropdownItem } from "./Dropdown";
import TrelloForm, { TrelloInput } from "./TrelloForm";

interface IProps {
  name: string
  children: React.ReactNode
  onEdit: (newName: string) => void
  onDelete: () => void
}

function TaskList({ name, children, onEdit, onDelete }: IProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editName, setEditName] = useState(name)

  const showEditFrom = () => {
    setEdit(true)
    setShowMenu(false)
  }
  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(editName)
    setEdit(false)
    onEdit(editName)
  }

  const titleClassName = "font-bold text-gray-700 dark:text-gray-400"

  return (
    <div className={`
      flex flex-col 
      min-w-56 max-w-72 
      bg-gray-100/80 rounded 
      dark:(bg-gray-800/90)
    `}>
      <section className="relative flex justify-between px-4 py-2">
        {edit 
          ? ( 
          <TrelloForm onSubmit={handleEdit}> 
            <TrelloInput 
              className={titleClassName} 
              type="text" 
              value={editName} 
              onChange={e => setEditName(e.target.value)}
              autoFocus
            />
            <Button type="submit" secondary>
              <Check />
            </Button>
          </TrelloForm>
          ) : (<>
            <h3 className={titleClassName}>{name}</h3>
            <MoreHorizontal 
              className="text-gray-400 cursor-pointer hover:(text-gray-500 dark:text-gray-300)" 
              onClick={() => setShowMenu(prev => !prev)}
            />
          </>)
        }
        {showMenu &&
          <Dropdown className="right-0 mx-2 mt-8">
            <DropdownItem onClick={showEditFrom}>
              <Edit2 className="w-4 h-4 mr-2" />
              <span>Edit</span>
            </DropdownItem>
            <DropdownItem onClick={onDelete}>
              <Trash className="w-4 h-4 mr-2" />
              <span>Delete</span>
            </DropdownItem>
          </Dropdown>
        }
      </section>

      <ul className={`
        flex flex-col gap-1 flex-1
        max-h-[75vh] overflow-y-auto px-1 mx-1 pb-2
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scrollbar-thumb-rounded-full
        dark:(scrollbar-thumb-gray-600)
      `}>
        {children}
      </ul>

      <Button secondary className="text-sm mb-1">
        <Plus className="mr-1 w-5 h-5" />
        <span>Add another card</span>
      </Button>
    </div>
  )
}

export default TaskList