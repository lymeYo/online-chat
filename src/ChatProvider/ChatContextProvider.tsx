import { UserT, getUser } from '@/Auth/AuthContextProvider'
import { getCombineIds } from '@/constants'
import { Dispatch, createContext, useContext, useReducer } from 'react'

enum ActionKind {
  SET_USER = 'SET_USER'
}
type Action = {
  type: ActionKind
  payload: any
}
export type ChatT = {
  data: ChatState
  dispatch: Dispatch<Action>
}
export type ChatState = {
  user: UserT | null
  chatId: string | null
}
const initialState: ChatState = {
  user: null,
  chatId: null
}

export const setUserAction = (data: UserT, dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionKind.SET_USER, payload: data })
}

const ChatContext = createContext<ChatT | null>(null)

export const getCurrentChat = (): ChatState => (useContext(ChatContext) as ChatT).data

export const getDispatch = (): Dispatch<Action> => (useContext(ChatContext) as ChatT).dispatch

export const isChatSelected = (): boolean => !!useContext(ChatContext)?.data?.chatId

type ChatContextProviderProps = {
  children: React.ReactNode
}
export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const { uid: ownerUid } = getUser()
  const reducer = (state: ChatState, { type, payload }: Action) => {
    switch (type) {
      case ActionKind.SET_USER:
        return {
          ...state,
          user: payload as UserT,
          chatId: getCombineIds(ownerUid, payload.uid)
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const value: ChatT = {
    data: state,
    dispatch
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
