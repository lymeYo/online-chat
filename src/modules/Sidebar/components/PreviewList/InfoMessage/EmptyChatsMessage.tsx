import ChatCloudImg from '@/ui/images/chat-cloud.png'

import styles from './styles.module.css'

const EmptyChatsMessage = () => (
  <>
    <span className={styles.text}>Похоже у вас нет ни с кем диалогов, ищите собеседников!</span>
    <div className={styles.image}>
      <img src={ChatCloudImg} alt='' />
    </div>
  </>
)
export default EmptyChatsMessage
