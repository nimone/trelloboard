import { useReducer, useState } from 'react'
import { Plus } from 'react-feather'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Board from './components/Board'
import Button from './components/Button'
import Header from './components/Header'
import Task from './components/Task'
import TaskList from './components/TaskList'
import { dummyLists, dummyTasks } from './dummyData'
import trelloReducer from './trelloReducer'


function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [state, dispatch] = useReducer(trelloReducer, {
    lists: dummyLists, 
    tasks: dummyTasks
  })
  
  const addNewList = (name: string | null): void => {
    if (!name) return
    dispatch({type: "ADD_LIST", payload: name})
  }
  const editList = (id: number, newName: string): void => {
    if (!newName) return
    dispatch({type: "EDIT_LIST", payload: {newName, id}})
  }
  const deleteList = (id: number): void => {
    dispatch({type: "DELETE_LIST", payload: id})
  }
  const addNewTask = (listID: number, task: string | null ): void => {
    if (!task) return
    dispatch({type: "ADD_TASK", payload: {listID, task}})
  }

  const handleTaskDrag = ({ destination, source }: DropResult): void => {
    if (!destination) return
    if (destination.index === source.index 
      && destination.droppableId === source.droppableId) return

    dispatch({
      type: "DRAG_TASK",
      payload: {
        fromListID: Number(source.droppableId), 
        toListID: Number(destination.droppableId), 
        fromTaskIdx: source.index,
        toTaskIdx: destination.index,
      }
    })
  }

  return (
    <div className={`App flex flex-col bg-random-image min-h-screen ${darkMode ? "dark" : ""}`}>
      <Header 
        title="Trello Board"
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(prev => !prev)} 
      />
      <DragDropContext onDragEnd={handleTaskDrag}>
        <Board>
          {state.lists.map(list => (
            <TaskList 
              id={list.id}
              key={list.id} 
              name={list.name}
              onEdit={(newName: string) => editList(list.id, newName)}
              onDelete={() => deleteList(list.id)}
              onAddTask={() => addNewTask(list.id, prompt("Task?"))}
            >
              {state.tasks[list.id].map((task, idx) => (
                <Task 
                  key={task.id}
                  id={task.id} 
                  idx={idx}
                  content={task.content} 
                /> 
              ))}
            </TaskList>
          ))}
          <Button onClick={() => addNewList(prompt("List Name?"))}>
            <Plus className="mr-1" />
            <span>Add another list</span>
          </Button>
        </Board>
      </DragDropContext>
    </div>
  )
}

export default App