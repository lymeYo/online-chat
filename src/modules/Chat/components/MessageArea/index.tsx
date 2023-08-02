import Message from './Message'
import { db } from '@/database/firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { getUser } from '@/Auth/AuthContextProvider'
import { dateToStringFormat, getCombineIds } from '@/constants'
import { getCurrentChat } from '@/ChatProvider/ChatContextProvider'
import { MessageT } from './constants'
import useLoadingState from '@/hooks/useLoadingState'
import Loading from '@/ui/Loading'
import { useEffect, useRef } from 'react'

import styles from './style.module.css'

type MessageAreaProps = {
  isImagesSelected: boolean
  handleGalleryData: (images: string[], senderName: string) => void
}
const MessageArea = ({ isImagesSelected, handleGalleryData }: MessageAreaProps) => {
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
  }, [user])

  return (
    <div
      className={`${styles.wrapper} ${isImagesSelected ? styles['with-images'] : ''}`}
      ref={chatElementRef}
      id='test'
    >
      {messages &&
        messages.map((message, ind) => {
          const messageDate = new Date(message.date.seconds * 1000)
          const time = dateToStringFormat(messageDate)
          const images = message.images ?? []
          let imgsCounter = 1
          const handleOnLoadImage = () => {
            if (imgsCounter == images.length && ind + 1 == messages.length) scrollChatToBottom()
            imgsCounter++
          }

          const handleOpenGallery = async () => {
            const usersRef = doc(db, 'users', message.senderId)
            const result = await getDoc(usersRef)
            const senderName = result.data()?.displayName ?? ''
            handleGalleryData(images, senderName)
          }

          return (
            <Message
              key={message.id}
              text={message.text}
              time={time}
              handleOnLoadImage={handleOnLoadImage}
              handleOpenGallery={handleOpenGallery}
              imagesUrls={images}
              type={message.senderId == ownerUid ? 'outcoming' : 'incoming'}
            />
          )
        })}
      {loading ? <Loading /> : ''}
    </div>
  )
}

export default MessageArea
