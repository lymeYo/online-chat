import { useMemo } from 'react'
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { getUser } from '@/Auth/AuthContextProvider'
import { db } from '@/database/firebase'

import styles from './styles.module.css'
import { getCombineIds } from '@/constants'

type ItemProps = {
  openChat: () => void
  active?: boolean
  name: string
  uid: string
  photoURL: string
  text: string
}
const Item = ({ openChat, active, name, uid, photoURL, text }: ItemProps) => {
  const { uid: ownerUid, name: ownerName, photoURL: ownerPhotoURL } = getUser()

  const handleUserChats = async () => {
    const combinedUids = getCombineIds(ownerUid, uid) //иначе если А написал Б то combinedUids будет АБ, а если Б написал А - то БА, хотя чат один
    const chatsRef = doc(db, 'chats', combinedUids)

    const result = await getDoc(chatsRef)
    // console.log(result.data())

    if (!result.exists()) {
      const userChatsRef = doc(db, 'userChats', uid)
      const ownerChatsRef = doc(db, 'userChats', ownerUid)
      //создаю chat в chats collections
      await setDoc(chatsRef, { messages: [] })

      //создаю user chats
      await updateDoc(ownerChatsRef, {
        [combinedUids + '.userInfo']: {
          uid,
          displayName: name,
          photoURL
        },
        [combinedUids + '.date']: serverTimestamp()
      })

      await updateDoc(userChatsRef, {
        [combinedUids + '.userInfo']: {
          uid: ownerUid,
          displayName: ownerName,
          photoURL: ownerPhotoURL
        },
        [combinedUids + '.date']: serverTimestamp()
      })
    }
  }

  const clickHandler = async () => {
    openChat()
    await handleUserChats()
  }

  const lettersLimit = 30
  const previewText: string = useMemo(() => text.slice(0, lettersLimit), [text])
  return (
    <li onClick={clickHandler} className={`${styles.item} ${active ? styles.active : ''}`}>
      <div className={styles.image}>
        <img
          src='https://sun9-1.userapi.com/impg/QSV30CLHCMRaMlocs-Ht1_uV0zJEJeJRwOofzA/IYTlpAf10KQ.jpg?size=564x705&quality=95&sign=b9dc86b2de569405cf705bfd3bd6cdef&type=albums'
          alt=''
        />
      </div>
      <div className={styles.body}>
        <span>{name}</span>
        <div className={styles['text-area']}>
          <p className={styles.text}>{previewText}</p>
          <span className={styles.time}>21:02</span>
        </div>
      </div>
    </li>
  )
}

export default Item
