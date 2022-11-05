import { useMemo, useState } from "react"
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
import { AnimatePresence } from "framer-motion"
import { getRandomImage } from "./utils/image"

function App() {
  const [showAddListForm, setShowAddListForm] = useState(false)
  const lists = useTrelloStore((state) => state.lists[state.currentProject])
  const tasks = useTrelloStore((state) => state.tasks)
  const shiftTask = useTrelloStore((state) => state.shiftTask)
  const darkMode = useTrelloStore((state) => state.darkMode)

  const randImg = useMemo(
    () => getRandomImage({ seeds: ["wallpaper", "nature", "abstract"] }),
    []
  )

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
        backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${randImg})`,
      }}
    >
      <Header title="Trello Board" />
      <DragDropContext onDragEnd={handleTaskDrag}>
        <Board>
          <AnimatePresence exitBeforeEnter>
            {lists.map((list) => (
              <TaskList
                key={list.id}
                list={list}
                numTasks={tasks[list.id].length}
              >
                {tasks[list.id].map((task, idx) => (
                  <Task
                    key={task.id}
                    task={task}
                    listId={list.id}
                    idx={idx}
                    className="mb-1.5"
                  />
                ))}
              </TaskList>
            ))}
          </AnimatePresence>
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
