import ChatCloudImg from '@/ui/images/chat-cloud.png'

import styles from './styles.module.css'

const EmptyChatsMessage = () => (
  <div className={styles.wrapper}>
    <span className={styles.text}>Похоже у вас нет ни с кем диалогов, ищите собеседников!</span>
    <div className={styles.image}>
      <img src={ChatCloudImg} alt='' />
    </div>
  </div>
)
export default EmptyChatsMessage
