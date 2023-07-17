import { UserT } from '@/Auth/AuthContextProvider.tsx'
import Item from './Item.tsx'
import InfoMessage from './InfoMessage'

import styles from './styles.module.css'
import {
  ChatState,
  getCurrentChat,
  getDispatch,
  setUserAction
} from '@/ChatProvider/ChatContextProvider.tsx'
import { useEffect } from 'react'

type PreviewListProps = {
  list: UserT[]
  openChat: () => void
  isSearching: boolean
}
const PreviewList = ({ list, openChat, isSearching }: PreviewListProps) => {
  const dispatch = getDispatch()
  const currentChat: ChatState = getCurrentChat()

  return (
    <>
      <ul className={styles.list}>
        {list.map((user: UserT, ind: number) => {
          const openChatHandler = () => {
            setUserAction(user, dispatch)
            openChat()
          }
          return (
            <Item
              key={ind}
              openChat={openChatHandler}
              name={user.name}
              photoURL={user.photoURL}
              uid={user.uid}
              text={''}
              active={currentChat.user?.uid == user.uid}
            />
          )
        })}
      </ul>
      <InfoMessage isListEmpty={list.length == 0} isSearching={isSearching} />
    </>
  )
}

export default PreviewList
