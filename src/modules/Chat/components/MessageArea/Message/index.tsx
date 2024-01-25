import { db } from '@/database/firebase'
import { doc, getDoc } from 'firebase/firestore'
import ImageList from './ImagesList'
import styles from './style.module.css'

type MessageProps = {
  text: string
  type: 'incoming' | 'outcoming'
  time: string
  imagesUrls: string[]
  senderId: string
  handleOnLoadImage: () => void
  handleGalleryData: (images: string[], senderName: string) => void
}
const Message = ({
  text,
  type,
  time,
  imagesUrls,
  senderId,
  handleOnLoadImage,
  handleGalleryData
}: MessageProps) => {
  const classFromType = type == 'incoming' ? 'in' : 'out'
  const handleOpenGallery = async () => {
    const usersRef = doc(db, 'users', senderId)
    const result = await getDoc(usersRef)
    const senderName = result.data()?.displayName ?? ''
    handleGalleryData(imagesUrls, senderName)
  }
  return (
    <div className={`${styles['message-wrapper']} ${styles[classFromType]}`} data-testid='message'>
      <div className={`${styles.message} ${styles[classFromType]}`}>
        <div className={`${styles.box} ${styles['box-2']} ${styles[classFromType]}`}></div>
        <div className={`${styles.box} ${styles['box-1']} ${styles[classFromType]}`}></div>
        {text}
        <ImageList
          clickHandler={handleOpenGallery}
          handleOnLoadImage={handleOnLoadImage}
          urls={imagesUrls}
        />
        <div className={`${styles.time} ${styles[classFromType]}`}>{time}</div>
      </div>
    </div>
  )
}
export default Message
