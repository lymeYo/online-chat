import Message from './Message'
import { db } from '@/database/firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { getUser } from '@/Auth/AuthContextProvider'
import { getCombineIds } from '@/constants'
import { getCurrentChat } from '@/ChatProvider/ChatContextProvider'
import { MessageT } from './constants'
import useLoadingState from '@/hooks/useLoadingState'
import { RefObject, useEffect, useRef } from 'react'

import styles from './style.module.css'

const MessageArea = () => {
  const { uid: ownerUid } = getUser()
  const { user } = getCurrentChat()
  const [loading, messages, setMessages] = useLoadingState<MessageT[]>()
  const chatElementRef = useRef<HTMLDivElement>(null)

  const scrollChatToBottom = () => {
    if (chatElementRef.current)
      chatElementRef.current.scrollTo({
        top: chatElementRef.current.scrollHeight
      })
  }

  useEffect(() => {
    scrollChatToBottom()
  })

  useEffect(() => {
    const combinedUids = getCombineIds(ownerUid, user?.uid as string)
    const chatsRef = doc(db, 'chats', combinedUids)
    const unsub = onSnapshot(chatsRef, doc => {
      if (!doc.exists()) return

      const newMessages: MessageT[] = doc.data()?.messages ?? []
      setMessages(newMessages)
    })

    return () => {
      unsub()
    }
  }, [])

  return (
    <div className={styles.wrapper} ref={chatElementRef} id='test'>
      {messages &&
        messages.map(message => (
          <Message
            key={message.id}
            text={message.text}
            type={message.senderId == ownerUid ? 'outcoming' : 'incoming'}
          />
        ))}
      {/* <Message text={'message.text'} type={'incoming'} />
      <Message text={'message.text'} type={'incoming'} />
      <Message text={'message.text'} type={'incoming'} />
      <Message text={'message.text'} type={'incoming'} />
      <Message text={'message.text'} type={'incoming'} />
      <Message text={'message.text'} type={'incoming'} />
      <Message text={'message.text'} type={'incoming'} />
      <Message text={'message.text'} type={'incoming'} />
      <Message text={'message.text'} type={'incoming'} />
      <Message text={'message.text'} type={'incoming'} />
      <Message text={'message.text'} type={'incoming'} />
      <Message text={'message.text'} type={'incoming'} /> */}
    </div>
  )
}

export default MessageArea
