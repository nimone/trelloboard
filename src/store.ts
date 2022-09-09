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

export type TrelloProject = {
  id: string
  name: string
}

export interface TrelloState {
  projects: TrelloProject[]
  lists: {
    [id: TrelloProject["id"]]: ListItem[]
  }
  tasks: {
    [id: ListItem["id"]]: TaskItem[]
  }
  currentProject: TrelloProject["id"]
  darkMode: boolean
}

interface TrelloMutations {
  setDarkMode: (darkMode: boolean) => void

  addProject: (name: string) => void
  deleteProject: (id: string) => void
  editProject: (id: string, changes: Partial<TrelloProject>) => void
  setCurrentProject: (projectId: string) => void

  addList: (projectId: string, name: string) => void
  deleteList: (projectId: string, id: string) => void
  editList: (projectId: string, id: string, changes: Partial<ListItem>) => void

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
        projects: [{ id: "0", name: "Project 1" }],
        lists: { "0": [] },
        tasks: {},
        currentProject: "0",
        darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,

        getState: get,
        setState: set,
        isEmpty: () => Object.keys(get().lists).length === 0,

        setDarkMode: (darkMode: boolean) => set({ darkMode }),

        setCurrentProject: (projectId: string) =>
          set({ currentProject: projectId }),

        addProject: (name: string) => {
          const id = nanoid()
          set(
            produce(({ projects, lists }: TrelloState) => {
              projects.push({ id, name })
              lists[id] = []
            })
          )
        },

        editProject: (id: string, changes: Partial<TrelloProject>) => {
          set((state) => ({
            projects: state.projects.map((project) =>
              project.id === id ? { ...project, ...changes } : project
            ),
          }))
        },

        deleteProject: (id: string) => {
          set((state) => ({
            projects: state.projects.filter((project) => project.id !== id),
          }))
        },

        addList: (projectId: string, name: string) => {
          const id = nanoid()
          set(
            produce((state: TrelloState) => {
              state.lists[projectId].push({ id, name })
              state.tasks[id] = []
            })
          )
        },

        deleteList: (projectId: string, id: string) =>
          set(
            produce(({ lists, tasks }: TrelloState) => {
              lists[projectId] = lists[projectId].filter(
                (list) => list.id !== id
              )
              delete tasks[id]
            })
          ),

        editList: (projectId: string, id: string, changes: Partial<ListItem>) =>
          set(
            produce(({ lists }: TrelloState) => {
              lists[projectId] = lists[projectId].map((list) =>
                list.id === id ? { ...list, ...changes } : list
              )
            })
          ),

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
