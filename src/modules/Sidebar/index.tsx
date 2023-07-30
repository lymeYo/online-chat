import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/database/firebase'
import { getUser } from '@/Auth/AuthContextProvider'
import Search from './components/Search'
import PreviewList from './components/PreviewList'
import { UserPreview, convertMessageDocumentsToList, getConvertedUserChats } from './constants'
import Loading from '@/ui/Loading'

import styles from './style.module.css'

type SidebarProps = {
  openChat: () => void
  isChatOpen: boolean
}
const Sidebar = ({ openChat, isChatOpen }: SidebarProps) => {
  const [userChats, setUserChats] = useState<UserPreview[]>([])
  const [searchChats, setSearchChats] = useState<UserPreview[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { uid } = getUser()

  useEffect(() => {
    const userChatsRef = doc(db, 'userChats', uid)

    const unsub = onSnapshot(userChatsRef, resultDoc => {
      const arrayDocuments = getConvertedUserChats(resultDoc)

      const newUserChats: UserPreview[] = arrayDocuments.map(convertMessageDocumentsToList)
      setUserChats(newUserChats)
      setIsLoading(false)
    })

    return () => {
      unsub()
    }
  }, [])
  return (
    <div className={`${styles.sidebar} ${isChatOpen ? styles.close : ''}`}>
      <Search
        setSearchChats={setSearchChats}
        setIsSearching={setIsSearching}
        userChats={userChats}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <PreviewList
          list={isSearching ? searchChats : userChats}
          openChat={openChat}
          isSearching={isSearching}
        />
      )}
    </div>
  )
}

export default Sidebar
