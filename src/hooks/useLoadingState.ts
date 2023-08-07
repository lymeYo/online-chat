import { useState } from 'react'

const useLoadingState = <StateT>(
  initialState?: StateT
): [boolean, StateT | undefined, React.Dispatch<React.SetStateAction<StateT | undefined>>] => {
  const [state, setState] = useState<StateT | undefined>(initialState)
  const [loading, setLoading] = useState(true)
  const handleState: React.Dispatch<React.SetStateAction<StateT | undefined>> = newState => {
    setLoading(false)
    setState(newState)
  }
  return [loading, state, handleState]
}
export default useLoadingState
