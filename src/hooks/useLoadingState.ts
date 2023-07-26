import { useState } from 'react'

const useLoadingState = <StateT>(
  initialState?: StateT
): [boolean, StateT | undefined, (state: StateT) => void] => {
  const [state, setState] = useState<StateT | undefined>(initialState)
  const [loading, setLoading] = useState(true)
  const handleState = (newState: StateT) => {
    setLoading(false)
    setState(newState)
  }
  return [loading, state, handleState]
}
export default useLoadingState
