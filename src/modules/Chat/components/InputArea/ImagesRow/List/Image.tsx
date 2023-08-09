import crossImage from '@/ui/images/cross.svg'

import styles from './style.module.css'

type ImageProps = {
  url: string
  ind: number
  deleteImageByInd: (ind: number) => void
  handleLoading: () => void
}
const Image = ({ url, ind, deleteImageByInd, handleLoading }: ImageProps) => {
  const handleDelete = () => {
    deleteImageByInd(ind)
  }
  const handleLoad = () => {
    handleLoading()
  }
  return (
    <div className={styles.item} key={ind}>
      <img src={url} alt='' />
      <div className={styles.cross} onClick={handleDelete}>
        <img src={crossImage} alt='' onLoad={handleLoad} />
      </div>
    </div>
  )
}
export default Image
