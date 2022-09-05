import clsx from "clsx"
import React from "react"

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  secondary?: boolean
  floating?: boolean
  className?: string
}

function Button({
  className,
  children,
  secondary,
  floating,
  ...props
}: IProps) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center",
        "rounded px-2 py-1",
        "whitespace-nowrap",
        "focus:(outline-none)",
        secondary
          ? "!text-gray-500"
          : [
              "bg-gray-300/40 text-white dark:(bg-gray-700/40)",
              "backdrop-filter backdrop-blur",
              "border border-gray-500/30",
            ],
        floating &&
          "!bg-gray-100/50 !text-gray-600 !p-px !dark:(bg-gray-700/70 text-gray-400)",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
