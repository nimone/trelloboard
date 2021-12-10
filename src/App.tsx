import { useState } from 'react'
import { Plus } from 'react-feather'
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd'
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
    setTasks(prev => {
      const newTasks = {...prev}
      delete newTasks[id]
      return newTasks
    })
  }
  
  const addNewTask = (listID: number, task: string | null ): void => {
    if (!task) return
    setTasks(prev => ({
      ...prev,
      [listID]: [
        ...prev[listID],
        {id: Date.now(), content: task},
      ]
    }))
  }
  const dragTask = (
    fromListID: number, 
    toListID: number, 
    fromTaskIdx: number,
    toTaskIdx: number,
  ): void => {
    if (fromListID === toListID) {
      setTasks(prevTasks => {
        const newListTasks = [...prevTasks[fromListID]];
        [newListTasks[fromTaskIdx], newListTasks[toTaskIdx]] = 
         [newListTasks[toTaskIdx], newListTasks[fromTaskIdx]]
         
        return {...prevTasks, [fromListID]: newListTasks}
      })
    } else {
      const taskToDrag = {...tasks[fromListID][fromTaskIdx]}

      setTasks(prevTasks => ({
        ...prevTasks,
        [fromListID]: prevTasks[fromListID].filter((_, idx) => fromTaskIdx !=  idx),
        [toListID]: [
          ...prevTasks[toListID].slice(0, toTaskIdx),
          taskToDrag,
          ...prevTasks[toListID].slice(toTaskIdx),
        ],
      }))
    }
  }

  const handleTaskDrag = ({ destination, source }: DropResult): void => {
    if (!destination) return
    if (destination.index === source.index 
      && destination.droppableId === source.droppableId) return

    console.log(
      "from:", source.droppableId,
      "to:", destination.droppableId, 
      "from task index:", source.index,
      "to task index:", destination.index,
    )
    dragTask(
      Number(source.droppableId), 
      Number(destination.droppableId), 
      source.index,
      destination.index,
    )
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
          {lists.map(list => (
            <TaskList 
              id={list.id}
              key={list.id} 
              name={list.name}
              onEdit={(newName: string) => editList(newName, list.id)}
              onDelete={() => deleteList(list.id)}
              onAddTask={() => addNewTask(list.id, prompt("Task?"))}
            >
              {tasks[list.id].map((task, idx) => (
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