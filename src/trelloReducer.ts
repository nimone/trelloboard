interface IState {
  lists: {
    id: number
    name: string
  }[]
  tasks: {
    [id: number]: {
      id: number
      content: string
    }[]
  }
}

type ActionType = 
  | {type: "ADD_LIST", payload: string}
  | {type: "DELETE_LIST", payload: number}
  | {type: "EDIT_LIST", payload: {newName: string, id: number}}
  | {type: "ADD_TASK", payload: {listID: number, task: string}}
  | {type: "DRAG_TASK", payload: {
      fromListID: number, 
      toListID: number, 
      fromTaskIdx: number,
      toTaskIdx: number
    }}
  
export default function trelloReducer(state: IState, action: ActionType) {
  switch(action.type) {
    case 'ADD_LIST':
      const id = Date.now()
      return {
        lists: [...state.lists, {id, name: action.payload}],
        tasks: {...state.tasks, [id]: []},
      }

    case 'DELETE_LIST':
      return {
        ...state, 
        lists: state.lists.filter(list => list.id != action.payload),
      }

    case 'EDIT_LIST':
      const listIdx = state.lists.findIndex(list => list.id === action.payload.id)
      const newList = [...state.lists]
      newList[listIdx].name = action.payload.newName 

      return {...state, lists: newList}

    case 'ADD_TASK':
      return {
        ...state,
        tasks: {
          ...state.tasks, 
          [action.payload.listID]: [
            ...state.tasks[action.payload.listID],
            {id: Date.now(), content: action.payload.task}
          ]
        }
      }

    case 'DRAG_TASK':
      const { fromListID, toListID, fromTaskIdx, toTaskIdx } = action.payload

      if (fromListID === toListID) {
        const newListTasks = [...state.tasks[fromListID]];
        [newListTasks[fromTaskIdx], newListTasks[toTaskIdx]] = 
          [newListTasks[toTaskIdx], newListTasks[fromTaskIdx]]
          
        return {
          ...state, 
          tasks: {...state.tasks, [fromListID]: newListTasks}
        }
      }
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [fromListID]: state.tasks[fromListID].filter((_, idx) => fromTaskIdx !=  idx),
          [toListID]: [
            ...state.tasks[toListID].slice(0, toTaskIdx),
            state.tasks[fromListID][fromTaskIdx],
            ...state.tasks[toListID].slice(toTaskIdx),
          ],
        }
      }

    default:
      throw new Error()
  }
}