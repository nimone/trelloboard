import React from "react"
import { Draggable} from 'react-beautiful-dnd'

interface IProps {
  id: number
  idx: number
  content: string
}

function Task({ id, idx, content }: IProps) {
  return (
    <Draggable index={idx} draggableId={id.toString()}>
    {(provided) => (
      <li className={`
        bg-gray-200 text-sm p-2
        shadow rounded list-none
        dark:(bg-gray-700)
      `} 
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <p className="text-gray-800 dark:text-gray-200">{content}</p>
      </li>
    )}
    </Draggable>
  )
}

export default Task