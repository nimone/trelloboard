import React, { Children } from "react"
import { MoreHorizontal, Plus, X } from "react-feather"
import Button from "./Button";

interface IProps {
  name: string
  children: React.ReactNode
}

function TaskList({ name, children }: IProps) {
  return (
    <div className={`
      flex flex-col 
      min-w-56 max-w-72 
      bg-gray-100/80 rounded 
      dark:(bg-gray-800/90)
    `}>
      <section className="flex justify-between px-4 py-2">
        <h3 className="font-bold text-gray-700 dark:text-gray-400">{name}</h3>
        <MoreHorizontal className="text-gray-400" />
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