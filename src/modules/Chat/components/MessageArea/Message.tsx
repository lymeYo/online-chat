import styles from './style.module.css'

type MessageProps = {
  text: string
  type: 'incoming' | 'outcoming'
}
const Message = ({ text, type }: MessageProps) => {
  const classFromType = type == 'incoming' ? 'in' : 'out'
  return (
    <div className={`${styles['message-wrapper']} ${styles[classFromType]}`}>
      <div className={`${styles.message} ${styles[classFromType]}`}>
        <div className={`${styles.box} ${styles['box-2']} ${styles[classFromType]}`}></div>
        <div className={`${styles.box} ${styles['box-1']} ${styles[classFromType]}`}></div>
        {text}
        <div className={`${styles.time}  ${styles[classFromType]}`}>21:02</div>
      </div>
    </div>
  )
}
export default Message
