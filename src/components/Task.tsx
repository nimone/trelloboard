import clsx from "clsx"
import { Draggable } from "react-beautiful-dnd"
import { X } from "react-feather"
import useTrelloStore, { ListItem, TaskItem } from "../store"
import Button from "./Button"

export interface ITaskProps {
  task: TaskItem
  listId: ListItem["id"]
  idx: number
  className?: string
}

function Task({ task, listId, idx, className }: ITaskProps) {
  const deleteTask = useTrelloStore((state) => state.deleteTask)

  return (
    <Draggable index={idx} draggableId={task.id.toString()}>
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
          <p className="text-gray-800 dark:text-gray-200">{task.content}</p>
          <Button
            onClick={() => deleteTask(listId, task.id)}
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
