import React, { useState } from "react"
import useClickOutside from "../hooks/useClickOutside"

interface IDropDownProps {
  trigger: (handleClick: () => void) => React.ReactNode
  children: React.ReactNode
  className?: string
}

interface IDropDownItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
  className?: string
}

function Dropdown({ trigger, children, className }: IDropDownProps) {
  const [show, setShow] = useState(false)
  const dropdownRef = useClickOutside(() => setShow(false))

  return (<div ref={dropdownRef}>
    {trigger(() => setShow(prev => !prev))}
    {show && (
      <div className={`
        absolute top-0 w-44 z-10 py-0.5
        bg-gray-100 text-base
        rounded shadow-lg list-none
        dark:bg-gray-800/95
        ${className}
      `}
        onClick={() => setShow(false)}
      >
        <ul className="py-1">
          {children}
        </ul>
      </div>
    )}
  </div>)
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