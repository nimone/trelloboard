import clsx from "clsx"
import { useState } from "react"
import { Code, Trash2, X } from "react-feather"
import useTrelloStore, { TrelloProject } from "../store"
import Button from "./Button"
import Dropdown, { DropdownItem } from "./Dropdown"
import Modal from "./Modal"

interface IProps {
  className?: string
}

function ProjectSelector({ className }: IProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [projectToDelete, setProjectToDelete] = useState<TrelloProject | null>(
    null
  )

  const projects = useTrelloStore((state) => state.projects)
  const addProject = useTrelloStore((state) => state.addProject)
  const deleteProject = useTrelloStore((state) => state.deleteProject)
  const currentProject = useTrelloStore((state) => state.currentProject)
  const setCurrentProject = useTrelloStore((state) => state.setCurrentProject)
  const searchedProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    addProject(searchQuery)
    setSearchQuery("")
  }

  const handleDelete = () => {
    if (projectToDelete) {
      if (currentProject === projectToDelete.id) {
        const nextProjectId = projects.filter(
          (p) => p.id !== projectToDelete.id
        )[0].id
        setCurrentProject(nextProjectId)
      }
      deleteProject(projectToDelete.id)
    }
    setProjectToDelete(null)
  }

  return (
    <>
      <Dropdown
        className={clsx("left-4 mt-12", className)}
        onClose={() => setSearchQuery("")}
        trigger={(handleClick) => (
          <Button
            className="ml-auto text-gray-800 dark:text-gray-200 font-medium"
            onClick={handleClick}
          >
            <Code className="transform rotate-90 mr-2" size={20} />
            <span>
              {projects.find((project) => project.id === currentProject)?.name}
            </span>
          </Button>
        )}
      >
        <DropdownItem
          onClick={(e) => e.stopPropagation()}
          className="!hover:bg-transparent"
        >
          <input
            type="text"
            placeholder="Search / Create"
            className="rounded-sm w-full focus:outline-none dark:bg-gray-500/80 p-2 font-medium focus:ring-2 ring-white/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </DropdownItem>
        {searchedProjects.length ? (
          searchedProjects.map((project) => (
            <DropdownItem
              key={project.id}
              disabled={currentProject === project.id}
              onClick={() => setCurrentProject(project.id)}
              className="group"
            >
              <span>{project.name}</span>
              <Button
                className={clsx(
                  "ml-auto text-red-500 hover:bg-red-500/10 transition-color",
                  "opacity-0 group-hover:opacity-100",
                  projects.length <= 1 && "hidden"
                )}
                onClick={(e) => {
                  e.stopPropagation()
                  setProjectToDelete(project)
                }}
              >
                <Trash2 size={16} />
              </Button>
            </DropdownItem>
          ))
        ) : (
          <div className="px-2 py-1 space-y-2">
            <p className="text-gray-500 text-sm text-center">
              "{searchQuery}" not found
            </p>
            <Button
              className="w-full dark:text-gray-400 text-gray-600"
              onClick={handleAdd}
            >
              Create "{searchQuery}"
            </Button>
          </div>
        )}
      </Dropdown>
      {projectToDelete && (
        <Modal
          danger
          title="Please Confirm Project Deletion"
          body={`You are about to delete "${projectToDelete.name}"`}
        >
          <Button onClick={handleDelete} className="!bg-red-500">
            <Trash2 className="mr-2 w-5 h-5" />
            <span>Confirm Deletion</span>
          </Button>
          <Button
            onClick={() => setProjectToDelete(null)}
            className="!bg-gray-600/50"
          >
            <X className="mr-2 w-5 h-5" />
            <span>Cancel</span>
          </Button>
        </Modal>
      )}
    </>
  )
}

export default ProjectSelector
