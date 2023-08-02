import Item from './Item.tsx'
import InfoMessage from './InfoMessage'
import {
  ChatState,
  getCurrentChat,
  getDispatch,
  setUserAction
} from '@/ChatProvider/ChatContextProvider.tsx'
import { UserPreview } from '../../constants.ts'

import styles from './styles.module.css'
import { useEffect, useMemo } from 'react'
import { UserT } from '@/Auth/AuthContextProvider.tsx'

type PreviewListProps = {
  list: UserPreview[]
  openChat: () => void
  isSearching: boolean
}
const PreviewList = ({ list, openChat, isSearching }: PreviewListProps) => {
  const dispatch = getDispatch()
  const currentChat: ChatState = getCurrentChat()
  const sortedList = useMemo(() => list.sort((userA, userB) => userB.time - userA.time), [list])
  const openChatHandler = (user: UserT) => {
    setUserAction(user, dispatch)
    openChat()
  }
  useEffect(() => {
    const firstUser = sortedList[0]
    if (currentChat.chatId == null && firstUser) openChatHandler(firstUser)
  }, [])

  return (
    <>
      <ul className={styles.list}>
        {sortedList.map(
          ({ uid, photoURL, name, lastMessage, lastMessageDate }: UserPreview, ind: number) => {
            const user: UserT = {
              uid,
              photoURL,
              name
            }
            const openChatWrapper = () => {
              openChatHandler(user)
            }

            return (
              <Item
                key={ind}
                openChat={openChatWrapper}
                name={name}
                photoURL={photoURL}
                uid={uid}
                text={lastMessage}
                date={lastMessage == '' ? '' : lastMessageDate}
                active={currentChat.user?.uid == uid}
              />
            )
          }
        )}
      </ul>
      <InfoMessage isListEmpty={list.length == 0} isSearching={isSearching} />
    </>
  )
}

export default PreviewList
