import Image from './Image'
import styles from './style.module.css'

type ImagesRowProps = {
  images: string[]
  deleteImageByInd: (ind: number) => void
}
const ImagesRow = ({ images, deleteImageByInd }: ImagesRowProps) => {
  if (images.length == 0) return ''
  return (
    <ul className={styles.list}>
      {images.map((url, ind) => (
        <Image key={ind} url={url} ind={ind} deleteImageByInd={deleteImageByInd} />
      ))}
    </ul>
  )
}

export default ImagesRow
