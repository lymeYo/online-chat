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

type PreviewListProps = {
  list: UserPreview[]
  openChat: () => void
  isSearching: boolean
}
const PreviewList = ({ list, openChat, isSearching }: PreviewListProps) => {
  const dispatch = getDispatch()
  const currentChat: ChatState = getCurrentChat()

  return (
    <>
      <ul className={styles.list}>
        {list
          .sort((userA, userB) => userB.time - userA.time)
          .map((userPreview: UserPreview, ind: number) => {
            const user = {
              uid: userPreview.uid,
              photoURL: userPreview.photoURL,
              name: userPreview.name
            }
            const openChatHandler = () => {
              setUserAction(user, dispatch)
              openChat()
            }
            return (
              <Item
                key={ind}
                openChat={openChatHandler}
                name={userPreview.name}
                photoURL={userPreview.photoURL}
                uid={userPreview.uid}
                text={userPreview.lastMessage}
                date={userPreview.lastMessageDate}
                active={currentChat.user?.uid == userPreview.uid}
              />
            )
          })}
      </ul>
      <InfoMessage isListEmpty={list.length == 0} isSearching={isSearching} />
    </>
  )
}

export default PreviewList
