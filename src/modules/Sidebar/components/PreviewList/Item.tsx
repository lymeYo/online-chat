import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { getUser } from '@/Auth/AuthContextProvider'
import { db } from '@/database/firebase'
import { getCombineIds } from '@/constants'

import styles from './styles.module.css'

type ItemProps = {
  openChat: () => void
  active?: boolean
  name: string
  uid: string
  photoURL: string
  text: string
  date: string
}
const Item = ({ openChat, active, name, uid, photoURL, text, date }: ItemProps) => {
  const { uid: ownerUid, name: ownerName, photoURL: ownerPhotoURL } = getUser()

  const handleUserChats = async () => {
    const combinedUids = getCombineIds(ownerUid, uid)
    const chatsRef = doc(db, 'chats', combinedUids)

    const result = await getDoc(chatsRef)

    if (!result.exists()) {
      const userChatsRef = doc(db, 'userChats', uid)
      const ownerChatsRef = doc(db, 'userChats', ownerUid)
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
  return (
    <li onClick={clickHandler} className={`${styles.item} ${active ? styles.active : ''}`}>
      <div className={styles.image}>
        <img src={photoURL} alt='' />
      </div>
      <div className={styles.body}>
        <span>{name}</span>
        <div className={styles['text-area']}>
          <p className={styles.text}>{text}</p>
          <span className={styles.time}>{date}</span>
        </div>
      </div>
    </li>
  )
}

export default Item
