import React, { useEffect, useRef, useState } from "react"
import { Check, X } from "react-feather"
import Button from "./Button"

interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
  className?: string
}

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}
interface ITrelloFormProps {
  inputValue: string
  className?: string
  onSubmit: (value: string) => void
  onCancel?: () => void
}

function TrelloForm({ children, className, ...props }: IFormProps) {
  return (
    <form 
      className={`w-full flex ${className}`}
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
      className={`max-w-52 min-w-36 bg-transparent focus:outline-none ${className}`}
      {...props}
    />
  )
}

export function TrelloTextArea({ className, ...props }: ITextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [text, setText] = useState("")
	const [textAreaHeight, setTextAreaHeight] = useState("auto")
	const [parentHeight, setParentHeight] = useState("auto")

	useEffect(() => {
		setParentHeight(`${textAreaRef.current!.scrollHeight}px`)
		setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`)
	}, [text])

	const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTextAreaHeight("auto")
		setParentHeight(`${textAreaRef.current!.scrollHeight}px`)
		setText(e.target.value)

		if (props.onChange) props.onChange(e)
	}

	return (
		<div className="w-full" style={{ minHeight: parentHeight }}>
			<textarea
				{...props}
        className="w-full bg-transparent resize-none focus:outline-none"
				ref={textAreaRef}
				style={{ height: textAreaHeight }}
				onChange={onChangeHandler}
			/>
		</div>
	)
}

export function TrelloListForm({ inputValue, onSubmit, onCancel, className }: ITrelloFormProps) {
  const [input, setInput] = useState(inputValue)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input) return
    onSubmit(input)
  }

  return (
    <TrelloForm 
      onSubmit={handleSubmit}
      className={`pl-4 p-2 bg-gray-100/80 rounded dark:(bg-gray-800/90) ${className}`}
    > 
      <TrelloInput 
        className="font-bold text-gray-700 dark:text-gray-400"
        type="text"
        value={input} 
        onChange={e => setInput(e.target.value)}
        autoFocus
      />
      <Button type="submit" secondary>
        <Check />
      </Button>
      {onCancel && 
        <Button onClick={onCancel} secondary>
          <X />
        </Button>
      }
    </TrelloForm>
  )
}

export function TrelloTaskForm({ inputValue, onSubmit, onCancel, className }: ITrelloFormProps) {
  const [input, setInput] = useState(inputValue)

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    if (!input) return
    onSubmit(input)
    setInput("")
  }

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim().split("<br>").join("") !== "") {
        handleSubmit()
      }
    }
  }

  return (
    <TrelloForm 
      onSubmit={handleSubmit}
      className={`
        relative p-2 group
        bg-gray-200 text-gray-800 rounded 
        dark:(bg-gray-700 text-gray-200) ${className}
      `}
    >
      <TrelloTextArea 
        defaultValue={inputValue} 
        onChange={e => setInput(e.target.value)}
        onKeyDown={onEnterPress}
        placeholder="New task"
        autoFocus
      >
      </TrelloTextArea>
      {onCancel &&
        <Button 
          onClick={onCancel} 
          floating
          className="absolute hidden top-1 right-1 group-hover:block"
        >
          <X className="w-5 h-5" />
        </Button>
      }
    </TrelloForm>
  )
}

export default TrelloForm