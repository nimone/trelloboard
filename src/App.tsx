import { useState } from "react"
import { Plus } from "react-feather"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import Board from "./components/Board"
import Button from "./components/Button"
import Header from "./components/Header"
import Task from "./components/Task"
import TaskList from "./components/TaskList"
import { TrelloListForm } from "./components/TrelloForm"
import Footer from "./components/Footer"
import clsx from "clsx"
import useTrelloStore from "./store"

function App() {
  const [showAddListForm, setShowAddListForm] = useState(false)
  const lists = useTrelloStore((state) => state.lists)
  const tasks = useTrelloStore((state) => state.tasks)
  const shiftTask = useTrelloStore((state) => state.shiftTask)
  const darkMode = useTrelloStore((state) => state.darkMode)

  const handleTaskDrag = ({ destination, source }: DropResult): void => {
    if (!destination) return
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return

    shiftTask(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    )
  }

  return (
    <div
      className={clsx(
        "App flex flex-col min-h-screen bg-cover bg-center",
        darkMode && "dark"
      )}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(https://source.unsplash.com/random/${
          window.screen.width + "x" + window.screen.height
        }?wallpaper,nature)`,
      }}
    >
      <Header title="Trello Board" />
      <DragDropContext onDragEnd={handleTaskDrag}>
        <Board>
          {lists.map((list) => (
            <TaskList
              id={list.id}
              key={list.id}
              name={list.name}
              numTasks={tasks[list.id].length}
            >
              {tasks[list.id].map((task, idx) => (
                <Task
                  key={task.id}
                  id={task.id}
                  listId={list.id}
                  idx={idx}
                  content={task.content}
                  className="mb-1.5"
                />
              ))}
            </TaskList>
          ))}
          {showAddListForm ? (
            <TrelloListForm
              onSubmit={() => setShowAddListForm(false)}
              onCancel={() => setShowAddListForm(false)}
              inputValue=""
            />
          ) : (
            <Button onClick={() => setShowAddListForm(true)}>
              <Plus className="mr-1" />
              <span>Add {lists.length ? "another" : "a"} list</span>
            </Button>
          )}
        </Board>
      </DragDropContext>
      <Footer />
    </div>
  )
}

export default App
