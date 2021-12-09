import { useState } from 'react'
import { Plus } from 'react-feather'
import Board from './components/Board'
import Button from './components/Button'
import Header from './components/Header'
import Task from './components/Task'
import TaskList from './components/TaskList'
import { dummyLists, dummyTasks } from './dummyData'

interface IState {
  list: {
    id: number
    name: string
  }
  task: {
    id: number
    content: string
  }
  tasks: {
    [id: number]: IState["task"][]
  }
}

function App() {
  const [lists, setLists] = useState<IState["list"][]>(dummyLists)
  const [tasks, setTasks] = useState<IState["tasks"]>(dummyTasks)
  const [darkMode, setDarkMode] = useState(false)

  const addNewList = (name: string | null): void => {
    if (!name) return
    const id = Date.now()
    setLists(prev => [...prev, {id, name}])
    setTasks(prev => ({...prev, [id]: []}))
  }
  const editList = (newName: string, id: number): void => {
    if (!newName) return
    setLists(prev => {
      const listIdx = prev.findIndex(list => list.id === id)
      const newList = [...prev]
      newList[listIdx].name = newName 
      return [...prev]
    })
  }
  const deleteList = (id: number): void => {
    setLists(prev => [...prev.filter(list => list.id !== id)])
  }

  return (
    <div className={`App flex flex-col bg-random-image min-h-screen ${darkMode ? "dark" : ""}`}>
      <Header 
        title="Trello Board"
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(prev => !prev)} 
      />
      <Board>
        {lists.map(list => (
          <TaskList 
            key={list.id} 
            name={list.name}
            onEdit={(newName: string) => editList(newName, list.id)}
            onDelete={() => deleteList(list.id)}
          >
            {tasks[list.id].map(task => (
              <Task key={task.id} content={task.content} />
            ))}
          </TaskList>
        ))}
        <Button onClick={() => addNewList(prompt("List Name?"))}>
          <Plus className="mr-1" />
          <span>Add another list</span>
        </Button>
      </Board>
    </div>
  )
}

export default App