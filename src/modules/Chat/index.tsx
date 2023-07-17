import { isChatSelected } from '@/ChatProvider/ChatContextProvider'
import InputArea from './components/InputArea'
import MessageArea from './components/MessageArea'
import ParametersPanel from './components/ParametersPanel'
import CatImage from '@/ui/images/cat.png'

import styles from './style.module.css'

type ChatProps = {
  closeChat: () => void
  isChatOpen: boolean
}

const Chat = ({ closeChat, isChatOpen }: ChatProps) => {
  return (
    <div className={`${styles.chat} ${isChatOpen ? styles.open : ''}`}>
      {isChatSelected() ? (
        <>
          <ParametersPanel closeChat={closeChat} isChatOpen={isChatOpen} />
          <MessageArea />
          <InputArea />
        </>
      ) : (
        <div className={styles.info}>
          <span>Откройте диалог!</span>
          <img src={CatImage} alt='' />
        </div>
      )}
    </div>
  )
}

export default Chat
