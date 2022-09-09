import clsx from "clsx"
import React, { useEffect, useState } from "react"
import useClickOutside from "../hooks/useClickOutside"

interface IDropDownProps {
  trigger: (handleClick: () => void) => React.ReactNode
  children: React.ReactNode
  className?: string
  onOpen?: () => void
  onClose?: () => void
}

interface IDropDownItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

function Dropdown({
  trigger,
  children,
  className,
  onOpen,
  onClose,
}: IDropDownProps) {
  const [show, setShow] = useState(false)
  const dropdownRef = useClickOutside(() => setShow(false))

  useEffect(() => {
    show ? onOpen?.() : onClose?.()
  }, [show])

  return (
    <div ref={dropdownRef}>
      {trigger(() => setShow((prev) => !prev))}
      <div
        className={clsx(
          "absolute top-0 min-w-44 z-10 py-0.5",
          "bg-gray-100/80 text-base",
          "backdrop-filter backdrop-blur",
          "rounded shadow-lg list-none",
          "dark:bg-gray-800/80",
          !show && "hidden",
          className
        )}
        onClick={() => setShow(false)}
      >
        <ul className="py-1 space-y-0.5">{children}</ul>
      </div>
    </div>
  )
}

export function DropdownItem({
  children,
  disabled,
  className,
  ...props
}: IDropDownItemProps) {
  return (
    <li
      className={clsx(
        "flex items-center block px-2 py-1",
        "text-sm",
        disabled
          ? "text-gray-400 dark:text-gray-500"
          : [
              "text-gray-700 hover:bg-gray-200 cursor-pointer",
              "dark:(text-gray-200) dark:hover:(text-white bg-gray-600)",
            ],
        className
      )}
      onClick={!disabled ? props.onClick : undefined}
      {...props}
    >
      {children}
    </li>
  )
}

export default Dropdown
