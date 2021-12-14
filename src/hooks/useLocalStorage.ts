import { useEffect, Reducer, ReducerState, useReducer, Dispatch, ReducerAction } from 'react'

const APP_STORE_KEY = "APP_STORE"

export default function useLocalStorage
<R extends Reducer<any, any>> (
  reducer: R, 
  initialState: ReducerState<R>,
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
  
  const [storedState, dispatch] = useReducer(reducer, initialState, (initialState) => {
    try {
      const persisted = window.localStorage.getItem(APP_STORE_KEY)
      return persisted ? JSON.parse(persisted) : initialState
    } catch (error) {
      console.log(error)
      return initialState
    }
  })

  useEffect(() => {
    localStorage.setItem(APP_STORE_KEY, JSON.stringify(storedState))
  }, [storedState])

  return [storedState, dispatch]
}