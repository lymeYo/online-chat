import ArrowBottomImage from '@/ui/images/arrow-bottom.png'

import styles from './style.module.css'

type ImageAreaProps = {
  curInd: number
  handleCurInd: (pointer: 1 | -1) => void
  images: string[]
}

const ImageArea = ({ curInd, handleCurInd, images }: ImageAreaProps) => {
  const showNext = () => {
    handleCurInd(1)
  }
  const showPrev = () => {
    handleCurInd(-1)
  }

  return (
    <div className={styles['image-area']}>
      <div onClick={showPrev} className={`${styles.arrow} ${styles.left}`}>
        <img src={ArrowBottomImage} alt='' />
      </div>
      <div className={styles.image}>
        <img src={images[curInd]} alt='' />
      </div>
      <div onClick={showNext} className={`${styles.arrow} ${styles.right}`}>
        <img src={ArrowBottomImage} alt='' />
      </div>
    </div>
  )
}
export default ImageArea
