import IconBack from './IconBack'
import IconExit from './IconExit'
import { ChatState, getCurrentChat } from '@/ChatProvider/ChatContextProvider'

import styles from './style.module.css'

type ParametersPanelProps = {
  closeChat: () => void
  isChatOpen: boolean
}
const ParametersPanel = ({ closeChat, isChatOpen }: ParametersPanelProps) => {
  const { user }: ChatState = getCurrentChat()
  //TODO
  return (
    <div className={styles.wrapper}>
      <IconBack isChatOpen={isChatOpen} closeChat={closeChat} />
      <div className={styles.profile}>
        <span className={styles.name}>{user?.name}</span>
        {/* <span className={styles.activity}>5 мин назад</span> */}
      </div>
      <div className={styles.buttons}>
        <IconExit />
      </div>
    </div>
  )
}
export default ParametersPanel
