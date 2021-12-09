import React from "react"
import { Edit2, Trash } from "react-feather"

interface IDropDownProps {
  children: React.ReactNode
  className?: string
}

interface IDropDownItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
  className?: string
}

function Dropdown({ children, className }: IDropDownProps) {
  return (
    <div className={`
      absolute top-0 w-44 z-10 py-0.5
      bg-gray-100 text-base
      rounded shadow-lg list-none
      dark:bg-gray-700 
      ${className}
    `}
    >
    <ul className="py-1">
      {children}
    </ul>
  </div>
  )
}

export function DropdownItem({ children, ...props }: IDropDownItemProps) {
  return (
    <li className={`
      flex items-center block px-2 py-1
      text-sm text-gray-700 cursor-pointer 
      hover:bg-gray-200
      dark:(text-gray-200)
      dark:hover:(text-white bg-gray-600)
    `} {...props}
    >
      {children}
    </li>
  )
}

export default Dropdown