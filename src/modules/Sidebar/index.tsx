import { useEffect, useState } from 'react'
import { Timestamp, doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/database/firebase'
import { UserT, getUser } from '@/Auth/AuthContextProvider'
import Search from './components/Search'
import PreviewList from './components/PreviewList'

import styles from './style.module.css'

type MessageDocument = {
  data: Timestamp
  userInfo: {
    displayName: string
    photoURL: string
    uid: string
  }
}

type SidebarProps = {
  openChat: () => void
  isChatOpen: boolean
}

const Sidebar = ({ openChat, isChatOpen }: SidebarProps) => {
  const [userChats, setUserChats] = useState<UserT[]>([])
  const [searchChats, setSearchChats] = useState<UserT[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const { uid } = getUser()
  useEffect(() => {
    const userChatsRef = doc(db, 'userChats', uid)
    const unsub = onSnapshot(userChatsRef, doc => {
      const newUserChats: UserT[] = Object.values(doc.data() ?? []).map(
        (data: MessageDocument) => ({
          name: data.userInfo.displayName,
          photoURL: data.userInfo.photoURL,
          uid: data.userInfo.uid
        })
      )
      setUserChats(newUserChats)
    })
    return () => {
      unsub()
    }
  }, [uid])

  return (
    <div className={`${styles.sidebar} ${isChatOpen ? styles.close : ''}`}>
      <Search setList={setSearchChats} setIsSearching={setIsSearching} />
      <PreviewList
        list={isSearching ? searchChats : userChats}
        openChat={openChat}
        isSearching={isSearching}
      />
    </div>
  )
}

export default Sidebar
