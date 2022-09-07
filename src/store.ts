import create from "zustand"
import { devtools, persist } from "zustand/middleware"
import { nanoid } from "nanoid"
import produce from "immer"

export type ListItem = {
  id: string
  name: string
}

export type TaskItem = {
  id: string
  content: string
}

export interface TrelloState {
  lists: ListItem[]
  tasks: {
    [id: string]: TaskItem[]
  }
  darkMode: boolean
}

interface TrelloMutations {
  setDarkMode: (darkMode: boolean) => void

  addList: (name: string) => void
  deleteList: (id: string) => void
  editList: (id: string, newName: string) => void

  addTask: (listId: string, content: string) => void
  deleteTask: (listId: string, taskId: string) => void
  shiftTask: (
    fromListId: string,
    toListId: string,
    fromTaskIdx: number,
    toTaskIdx: number
  ) => void
  getState: () => TrelloState
  setState: (state: TrelloState) => void
  isEmpty: () => boolean
}

const useTrelloStore = create<TrelloState & TrelloMutations>()(
  devtools(
    persist(
      (set, get) => ({
        lists: [],
        tasks: {},
        darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,

        getState: get,
        setState: set,
        isEmpty: () => get().lists.length === 0,

        setDarkMode: (darkMode: boolean) => set({ darkMode }),

        addList: (name: string) => {
          const id = nanoid()

          set(
            produce((state: TrelloState) => {
              state.lists.push({ id, name })
              state.tasks[id] = []
            })
          )
        },

        deleteList: (id: string) =>
          set((state) => {
            const newTasks = { ...state.tasks }
            delete newTasks[id]

            return {
              lists: state.lists.filter((list) => list.id != id),
              tasks: newTasks,
            }
          }),

        editList: (id: string, newName: string) =>
          set((state) => ({
            lists: state.lists.map((l) => ({
              ...l,
              name: l.id === id ? newName : l.name,
            })),
          })),

        addTask: (listId: string, content: string) =>
          set(
            produce(({ tasks }: TrelloState) => {
              tasks[listId].push({ id: nanoid(), content })
            })
          ),

        deleteTask: (listId: string, taskId: string) =>
          set(
            produce(({ tasks }: TrelloState) => {
              tasks[listId] = tasks[listId].filter((task) => task.id !== taskId)
            })
          ),

        shiftTask: (
          fromListId: string,
          toListId: string,
          fromTaskIdx: number,
          toTaskIdx: number
        ) => {
          set(
            produce(({ tasks }: TrelloState) => {
              const taskToShift = tasks[fromListId].splice(fromTaskIdx, 1)[0]
              tasks[toListId] = [
                ...tasks[toListId].slice(0, toTaskIdx),
                taskToShift,
                ...tasks[toListId].slice(toTaskIdx),
              ]
            })
          )
        },
      }),
      { name: "trelloboard-state" }
    )
  )
)

export default useTrelloStore
