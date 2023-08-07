import Message from './Message'
import { db } from '@/database/firebase'
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter
} from 'firebase/firestore'
import { getUser } from '@/Auth/AuthContextProvider'
import { dateToStringFormat, getCombineIds } from '@/constants'
import { getCurrentChat } from '@/ChatProvider/ChatContextProvider'
import { MessageT } from './constants'
import useLoadingState from '@/hooks/useLoadingState'
import Loading from '@/ui/Loading'
import { useEffect, useRef } from 'react'

import styles from './style.module.css'

type scrollStatus = 'down' | 'static'

type MessageAreaProps = {
  isImagesSelected: boolean
  handleGalleryData: (images: string[], senderName: string) => void
}
const MessageArea = ({ isImagesSelected, handleGalleryData }: MessageAreaProps) => {
  const { uid: ownerUid } = getUser()
  const { user } = getCurrentChat()
  const [loading, messages, setMessages] = useLoadingState<MessageT[]>()
  const areMessagesOver = useRef<boolean>(false)
  const scrollStatusRef = useRef<scrollStatus>('down')
  const prevScrollHeight = useRef<number>(0)
  const lastMessageDateRef = useRef<null | Timestamp>(null)
  const chatElementRef = useRef<HTMLDivElement>(null)

  const sortingMessagesCB = (messA: MessageT, messB: MessageT) => {
    const secondsA = messA.date.seconds
    const secondsB = messB.date.seconds
    if (secondsA == secondsB) return messA.date.nanoseconds - messB.date.nanoseconds
    else return secondsA - secondsB
  }

  const scrollChatToBottom = () => {
    const chatEL = chatElementRef.current
    if (chatEL) {
      chatEL.scrollTo({
        top: chatEL.scrollHeight
      })
    }
  }

  const keepScrollPosition = (scrollDif: number) => {
    const chatEL = chatElementRef.current
    if (chatEL) {
      chatEL.scrollTo({
        top: scrollDif
      })
    }
  }

  useEffect(() => {
    // прогружаю сообщения если скролл наверху
    const chatEL = chatElementRef.current
    if (!chatEL) return
    const scrollHandler = () => {
      if (chatEL.scrollTop == 0 && !areMessagesOver.current) {
        scrollStatusRef.current = 'static'
        loadMessages()
      }
    }

    chatEL.addEventListener('scroll', scrollHandler)
    return () => {
      chatEL.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const handleSetMessages = (newMessages: MessageT[]) => {
    setMessages(prevMessages => {
      if (prevMessages?.find(prevMess => prevMess.id == newMessages[0].id)) {
        areMessagesOver.current = true
        return prevMessages
      }
      const concatMessages = prevMessages ? prevMessages.concat(newMessages) : newMessages
      return concatMessages.sort(sortingMessagesCB)
    })
  }
  const initialSetMessages = (newMessages: MessageT[]) => {
    setMessages(newMessages.sort(sortingMessagesCB))
    scrollChatToBottom()
  }

  const loadMessages = async (isInitialLoad?: boolean) => {
    const combinedUids = getCombineIds(ownerUid, user?.uid as string)
    const messagesRef = collection(db, 'chats', combinedUids, 'messages')
    const messagesLimit = 15
    const myQuery = lastMessageDateRef.current
      ? query(
          messagesRef,
          orderBy('date', 'desc'),
          startAfter(lastMessageDateRef.current),
          limit(messagesLimit)
        )
      : query(messagesRef, limit(messagesLimit), orderBy('date', 'desc'))

    const querySnapshot = await getDocs(myQuery)
    const newMessages: MessageT[] = []

    querySnapshot.forEach(doc => {
      const message = doc.data() as MessageT
      newMessages.push(message)
    })

    if (isInitialLoad) initialSetMessages(newMessages)
    else handleSetMessages(newMessages)
    lastMessageDateRef.current =
      (isInitialLoad ? newMessages[0]?.date : newMessages[messagesLimit - 1]?.date) || null //т.к при первом вызове элементы приходят в обратной последовательности
  }

  useEffect(() => {
    //управляю скролом - сохранить на месте или перенести вниз
    const chatEl = chatElementRef.current
    if (!chatEl) return

    if (scrollStatusRef.current == 'down') scrollChatToBottom()
    else keepScrollPosition(chatEl.scrollHeight - prevScrollHeight.current)

    prevScrollHeight.current = chatEl.scrollHeight
  }, [messages])

  useEffect(() => {
    scrollStatusRef.current = 'down'
    loadMessages(true) //загружаю существующие сообщения в размере n штук
  }, [])

  useEffect(() => {
    //реализую прогрузку новых сообщений
    const combinedUids = getCombineIds(ownerUid, user?.uid as string)
    const messagesRef = collection(db, 'chats', combinedUids, 'messages')
    const myQuery = query(messagesRef, orderBy('date', 'desc'), limit(1))
    let isFirstCall = true
    const unsub = onSnapshot(myQuery, doc => {
      if (isFirstCall) {
        //дабы последнее сообщение не грузилось 2 раза
        isFirstCall = false
        return
      }

      const newMessages: MessageT[] = []
      doc.forEach(data => {
        newMessages.push(data.data() as MessageT)
      })
      scrollStatusRef.current = 'down'
      handleSetMessages(newMessages)
    })

    return () => {
      unsub()
    }
  }, [])

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
            if (imgsCounter == images.length && ind + 1 == messages.length) {
              scrollChatToBottom()
            }
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
