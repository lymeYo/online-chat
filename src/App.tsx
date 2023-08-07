import { useEffect, useState } from 'react'
import Sidebar from './modules/Sidebar'
import Chat from './modules/Chat'
import { AuthContextProvider } from './Auth/AuthContextProvider'
import { ChatContextProvider } from './ChatProvider/ChatContextProvider'

import styles from './globalStyles.module.css'
import { db } from './database/firebase'
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'

let executed = false
function App() {
  const [isChatOpen, setChatOpen] = useState<boolean>(false)
  const openChat = () => {
    setChatOpen(true)
  }
  const closeChat = () => {
    setChatOpen(false)
  }
  const test = async () => {
    executed = true
    const usersRef = collection(db, 'users')
    let lastName = ''
    console.log('start 1 ====================')
    const q = query(usersRef, limit(1), orderBy('displayName'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
      console.log('!TEST! data: ', doc.data())
      lastName = doc.data().displayName
    })
    console.log('====================')

    console.log('start 2 ====================')
    const q2 = query(usersRef, limit(1), orderBy('displayName'), startAfter(lastName))
    const querySnapshot2 = await getDocs(q2)
    querySnapshot2.forEach(doc => {
      console.log('!TEST! data: ', doc.data())
      lastName = doc.data().displayName
    })
    console.log('=================')

    console.log('start 3 ====================')
    const q3 = query(usersRef, limit(1), orderBy('displayName'), startAfter(lastName))
    const querySnapshot3 = await getDocs(q3)
    querySnapshot3.forEach(doc => {
      console.log('!TEST! data: ', doc.data())
      lastName = doc.data().displayName
    })
    console.log('--------------------------------------------------------')
  }
  useEffect(() => {
    // if (!executed) test()
  }, []) //!
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <div className={styles.wrapper}>
          <Sidebar openChat={openChat} isChatOpen={isChatOpen} />
          <Chat closeChat={closeChat} isChatOpen={isChatOpen} />
        </div>
      </ChatContextProvider>
    </AuthContextProvider>
  )
}

export default App
