import React from "react"

interface IProps {
  content: string
}

function Task({ content }: IProps) {
  return (
    <li className={`
      bg-gray-200 text-sm p-2
      shadow rounded list-none
      dark:(bg-gray-700)
    `}>
      <p className="text-gray-800 dark:text-gray-200">{content}</p>
    </li>
  )
}

export default Task