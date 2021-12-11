import React from "react"

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  secondary?: boolean
  floating?: boolean
  className?: string
}

function Button({ className, children, secondary, floating, ...props }: IProps) {
  return (
    <button
      className={`
        flex items-center justify-center
        bg-gray-300/40 rounded px-2 py-1
        text-white whitespace-nowrap
        focus:(outline-none)
        dark:(bg-gray-600/40)
        ${secondary ? "!bg-transparent !text-gray-500 px-1": ""}
        ${floating ? "!bg-gray-100/50 !text-gray-600 !p-px !dark:(bg-gray-700/70 text-gray-400)": ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button