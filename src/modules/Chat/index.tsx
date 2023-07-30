import { isChatSelected } from '@/ChatProvider/ChatContextProvider'
import InputArea from './components/InputArea'
import MessageArea from './components/MessageArea'
import ParametersPanel from './components/ParametersPanel'
import InfoMessage from './components/InfoMessage'

import styles from './style.module.css'
import { useState } from 'react'

type ChatProps = {
  closeChat: () => void
  isChatOpen: boolean
}

const Chat = ({ closeChat, isChatOpen }: ChatProps) => {
  const [isImagesSelected, setImagesSelected] = useState<boolean>(false)
  return (
    <div className={`${styles.chat} ${isChatOpen ? styles.open : ''}`}>
      {isChatSelected() ? (
        <>
          <ParametersPanel closeChat={closeChat} isChatOpen={isChatOpen} />
          <MessageArea isImagesSelected={isImagesSelected} />
          <InputArea setImagesSelected={setImagesSelected} />
        </>
      ) : (
        <InfoMessage />
      )}
    </div>
  )
}

export default Chat
