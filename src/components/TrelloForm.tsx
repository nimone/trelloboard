import React from "react"

interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
}

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className: string
}

interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className: string
}

function TrelloForm({ children, ...props }: IFormProps) {
  return (
    <form 
      className="flex"
      {...props}
    >
      {children}
    </form>
  )
}

export function TrelloInput({ className, ...props }: IInputProps) {
  return (
    <input 
      type="text" 
      className={`w-full bg-transparent focus:outline-none ${className}`}
      {...props}
    />
  )
}

export function TrelloTextArea({ className, ...props }: ITextAreaProps) {
  return (
    <textarea 
      className="min-w-36 bg-transparent focus:outline-none"
      {...props}
    >
    </textarea>
  )
}

export default TrelloForm