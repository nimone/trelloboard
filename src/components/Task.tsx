import clsx from "clsx"
import { Draggable } from "react-beautiful-dnd"
import { X } from "react-feather"
import useTrelloStore from "../store"
import Button from "./Button"

interface IProps {
  id: string
  listId: string
  idx: number
  content: string
  className?: string
}

function Task({ listId, id, idx, content, className }: IProps) {
  const deleteTask = useTrelloStore((state) => state.deleteTask)

  return (
    <Draggable index={idx} draggableId={id.toString()}>
      {(provided) => (
        <li
          className={clsx(
            "relative group",
            "bg-gray-200 text-sm p-2",
            "shadow rounded list-none",
            "dark:(bg-gray-700)",
            className
          )}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="text-gray-800 dark:text-gray-200">{content}</p>
          <Button
            onClick={() => deleteTask(listId, id)}
            className="w-6 h-6 absolute top-1 right-1 hidden group-hover:block"
            floating
          >
            <X className="w-5 h-5" />
          </Button>
        </li>
      )}
    </Draggable>
  )
}

export default Task
