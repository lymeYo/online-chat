import ImageList from './ImagesList'
import styles from './style.module.css'

type MessageProps = {
  text: string
  type: 'incoming' | 'outcoming'
  time: string
  imagesUrls: string[]
  handleOnLoadImage: () => void
}
const Message = ({ text, type, time, imagesUrls, handleOnLoadImage }: MessageProps) => {
  const classFromType = type == 'incoming' ? 'in' : 'out'
  return (
    <div className={`${styles['message-wrapper']} ${styles[classFromType]}`}>
      <div className={`${styles.message} ${styles[classFromType]}`}>
        <div className={`${styles.box} ${styles['box-2']} ${styles[classFromType]}`}></div>
        <div className={`${styles.box} ${styles['box-1']} ${styles[classFromType]}`}></div>
        {text}
        <ImageList handleOnLoadImage={handleOnLoadImage} urls={imagesUrls} />
        <div className={`${styles.time}  ${styles[classFromType]}`}>{time}</div>
      </div>
    </div>
  )
}
export default Message
