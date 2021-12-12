import { useReducer, useState } from 'react'
import { Plus } from 'react-feather'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Board from './components/Board'
import Button from './components/Button'
import Header from './components/Header'
import Task from './components/Task'
import TaskList from './components/TaskList'
import trelloReducer from './trelloReducer'
import useLocalStorage from './useLocalStorage'
import { TrelloListForm, TrelloTaskForm } from './components/TrelloForm'
import Footer from './components/Footer'


function App() {
  const [showAddListForm, setShowAddListForm] = useState(false)
  const [darkMode, setDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false
  )
  const [state, dispatch] = useLocalStorage(trelloReducer, {
    lists: [], 
    tasks: {}
  })
  
  const addNewList = (name: string): void => {
    setShowAddListForm(false)
    dispatch({type: "ADD_LIST", payload: name})
  }
  const editList = (id: number, newName: string): void => {
    if (!newName) return
    dispatch({type: "EDIT_LIST", payload: {newName, id}})
  }
  const deleteList = (id: number): void => {
    dispatch({type: "DELETE_LIST", payload: id})
  }
  const addNewTask = (listID: number, task: string): void => {
    dispatch({type: "ADD_TASK", payload: {listID, task}})
  }
  const deleteTask = (listID: number, taskID: number): void => {
    dispatch({type: "DELETE_TASK", payload: {listID, taskID}})
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
              numTasks={state.tasks[list.id].length}
              onEdit={(newName: string) => editList(list.id, newName)}
              onDelete={() => deleteList(list.id)}
              onAddTask={(task) => addNewTask(list.id, task)}
            >
              {state.tasks[list.id].map((task, idx) => (
                <Task 
                  key={task.id}
                  id={task.id} 
                  idx={idx}
                  content={task.content} 
                  onDelete={() =>  deleteTask(list.id, task.id)}
                /> 
              ))}
            </TaskList>
          ))}
          {showAddListForm 
            ? <TrelloListForm 
                onSubmit={addNewList} 
                onCancel={() => setShowAddListForm(false)}
                inputValue="" 
              />
            : <Button onClick={() => setShowAddListForm(true)}>
                <Plus className="mr-1" />
                <span>Add {state.lists.length ? "another" : "a"} list</span>
              </Button>
          }
        </Board>
      </DragDropContext>
      <Footer />
    </div>
  )
}

export default App