import { useState } from 'react'
import Sidebar from './modules/Sidebar'
import Chat from './modules/Chat'
import { AuthContextProvider } from './Auth/AuthContextProvider'

import styles from './globalStyles.module.css'
import { ChatContextProvider } from './ChatProvider/ChatContextProvider'

function App() {
  const [isChatOpen, setChatOpen] = useState<boolean>(false)
  const openChat = () => {
    setChatOpen(true)
  }
  const closeChat = () => {
    setChatOpen(false)
  }
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
