import { useEffect, useRef } from 'react'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import Icon from './Icon'
import Input from './Input'
import { getCurrentChat } from '@/ChatProvider/ChatContextProvider'
import { db } from '@/database/firebase'
import { v4 as uuid } from 'uuid'

import styles from './style.module.css'
import { UserT, getUser } from '@/Auth/AuthContextProvider'
import { getCombineIds } from '@/constants'

const InputArea = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { chatId, user } = getCurrentChat()
  const { uid: ownerUid } = getUser()
  const { uid } = user as UserT

  const sendMessage = async () => {
    const text = inputRef.current?.value ?? ''
    if (inputRef.current) inputRef.current.value = ''
    const chatsRef = doc(db, 'chats', chatId as string)
    const ownerChatsRef = doc(db, 'userChats', ownerUid)
    const userChatsRef = doc(db, 'userChats', uid)
    await updateDoc(chatsRef, {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: ownerUid,
        date: Timestamp.now()
      })
    })
    await updateDoc(ownerChatsRef, {
      [chatId + '.lastMessage']: {
        text,
        sender: ownerUid
      },
      [chatId + '.date']: serverTimestamp()
    })
    await updateDoc(userChatsRef, {
      [chatId + '.lastMessage']: {
        text,
        sender: ownerUid
      },
      [chatId + '.date']: serverTimestamp()
    })
  }

  return (
    <div className={styles.wrapper}>
      <Input sendMessage={sendMessage} inputRef={inputRef} />
      <Icon onSubmit={sendMessage} />
    </div>
  )
}
export default InputArea
