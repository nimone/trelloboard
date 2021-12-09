import React from "react"

interface IProps {
  children: React.ReactNode
}

function Board({ children }: IProps) {
  return (
    <main className={`
      flex items-start gap-2 flex-1 
      overflow-x-auto mt-4 mb-1 px-4
      scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scrollbar-thumb-rounded-full
      dark:(scrollbar-thumb-gray-600)
    `}>
      {children}
    </main>
  )
}

export default Board