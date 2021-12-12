import React from "react"

interface IProps {
  title: string
  body: string
  danger?: boolean
  children: React.ReactNode
}

function Modal({ title, body, danger, children }: IProps) {
  return (
    <div className={`
      fixed inset-0 z-40 overflow-auto 
      flex justify-center items-center
      w-screen h-screen bg-black/40
    `}>
      <div className={`
        relative w-full max-w-xs
        p-4 m-auto rounded-lg shadow-lg
        bg-gray-200 text-gray-800/80 
        dark:(bg-gray-800/90 text-gray-200)
        ${danger ? "border-2 border-red-400/80 dark:(border-red-400/50)" : ""}
      `}>
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <p>{body}</p>
        <hr className="w-full border-1 rounded-full border-gray-500/10 my-3" />

        <section className="flex justify-end gap-2">
          {children}
        </section>
      </div>
    </div>

  )
}

export default Modal