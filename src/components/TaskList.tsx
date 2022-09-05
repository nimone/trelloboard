import React, { useState } from "react"
import { Check, Edit2, MoreHorizontal, Plus, Trash, X } from "react-feather"
import { Droppable } from "react-beautiful-dnd"
import Button from "./Button"
import Dropdown, { DropdownItem } from "./Dropdown"
import TrelloForm, { TrelloInput, TrelloTaskForm } from "./TrelloForm"
import Modal from "./Modal"
import clsx from "clsx"

interface IProps {
  id: number
  name: string
  children: React.ReactNode
  numTasks: number
  onEdit: (newName: string) => void
  onDelete: () => void
  onAddTask: (task: string) => void
}

function TaskList({
  id,
  name,
  children,
  numTasks,
  onEdit,
  onDelete,
  onAddTask,
}: IProps) {
  const [showModal, setShowModal] = useState(false)
  const [showAddTaskForm, setShowAddTaskForm] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editName, setEditName] = useState(name)

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(editName)
    setEdit(false)
    onEdit(editName)
  }
  const handleDelete = () => {
    if (numTasks > 1) setShowModal(true)
    else onDelete()
  }

  const titleClassName = "font-bold text-gray-700 dark:text-gray-400"

  return (
    <div
      className={clsx(
        "flex flex-col",
        "min-w-60 max-w-72",
        "bg-gray-100/80 rounded",
        "dark:(bg-gray-800/90)"
      )}
    >
      <section className="relative flex justify-between px-4 py-2">
        {edit ? (
          <TrelloForm onSubmit={handleEdit} className="w-full">
            <TrelloInput
              className={titleClassName}
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              autoFocus
            />
            <Button type="submit" secondary>
              <Check />
            </Button>
          </TrelloForm>
        ) : (
          <>
            <h3 className={titleClassName}>{name}</h3>
            <Dropdown
              className="right-0 mx-2 mt-8"
              trigger={(handleClick) => (
                <MoreHorizontal
                  className="text-gray-400 cursor-pointer hover:(text-gray-500 dark:text-gray-300)"
                  onClick={handleClick}
                />
              )}
            >
              <DropdownItem onClick={() => setEdit(true)}>
                <Edit2 className="w-4 h-4 mr-2" />
                <span>Edit</span>
              </DropdownItem>
              <DropdownItem onClick={handleDelete}>
                <Trash className="w-4 h-4 mr-2" />
                <span>Delete</span>
              </DropdownItem>
            </Dropdown>
          </>
        )}
        {showModal && (
          <Modal
            danger
            title="Are you sure?"
            body={`Delete "${name}" with ${numTasks} cards`}
          >
            <Button onClick={onDelete} className="!bg-red-500">
              <Trash className="mr-2 w-5 h-5" />
              <span>Delete</span>
            </Button>
            <Button
              onClick={() => setShowModal(false)}
              className="!bg-gray-600/50"
            >
              <X className="mr-2 w-5 h-5" />
              <span>Cancel</span>
            </Button>
          </Modal>
        )}
      </section>

      <Droppable droppableId={id.toString()} key={id}>
        {(provided) => (
          <ul
            className={clsx(
              "flex flex-col gap-1.5 flex-1",
              "max-h-[75vh] px-1 mx-1 pb-2",
              "scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scrollbar-thumb-rounded-full",
              "dark:(scrollbar-thumb-gray-600)"
            )}
            ref={provided.innerRef}
          >
            {children}
            {showAddTaskForm && (
              <TrelloTaskForm
                onSubmit={(task) => {
                  onAddTask(task)
                  setShowAddTaskForm(false)
                }}
                inputValue=""
                onCancel={() => setShowAddTaskForm(false)}
              />
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>

      {!showAddTaskForm && (
        <Button
          secondary
          className="text-sm mb-1"
          onClick={() => setShowAddTaskForm(true)}
        >
          <Plus className="mr-1 w-5 h-5" />
          <span>Add {numTasks !== 0 ? "another" : "a"} card</span>
        </Button>
      )}
    </div>
  )
}

export default TaskList
