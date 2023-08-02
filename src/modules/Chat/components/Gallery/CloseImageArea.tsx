import CloseImage from '@/ui/images/close.png'

import styles from './style.module.css'

type CloseImageAreaProps = {
  handleClose: () => void
}
const CloseImageArea = ({ handleClose }: CloseImageAreaProps) => {
  return (
    <div onClick={handleClose} className={styles.close}>
      <img src={CloseImage} alt='' />
    </div>
  )
}
export default CloseImageArea
