import React from "react"

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  secondary?: boolean
  className?: string
}

function Button({ className, children, secondary, ...props }: IProps) {
  return (
    <button
      className={`
        flex items-center justify-center
        bg-gray-300/40 rounded px-2 py-1
        text-white whitespace-nowrap
        focus:(outline-none)
        dark:(bg-gray-600/40)
        ${secondary ? "!bg-transparent !text-gray-500": ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button