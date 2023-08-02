import crossImage from '@/ui/images/cross.svg'

import styles from './style.module.css'

type ImageProps = {
  url: string
  ind: number
  deleteImageByInd: (ind: number) => void
}
const Image = ({ url, ind, deleteImageByInd }: ImageProps) => {
  const handleDelete = () => {
    deleteImageByInd(ind)
  }
  return (
    <li className={styles.item} key={ind}>
      <img src={url} alt='' />
      <div className={styles.cross} onClick={handleDelete}>
        <img src={crossImage} alt='' />
      </div>
    </li>
  )
}
export default Image
