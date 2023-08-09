import { useMemo } from 'react'
import Image from './Image'

import styles from '../style.module.css'

type ListProps = {
  deleteImageByInd: (ind: number) => void
  images: string[]
  finishLoading: () => void
}
const List = ({ deleteImageByInd, images, finishLoading }: ListProps) => {
  const handleImagesLoading = useMemo(() => {
    let imagesAmount = 0
    return () => {
      imagesAmount++
      if (imagesAmount == images.length) finishLoading()
    }
  }, [images])
  return (
    <ul className={styles.list}>
      {images.map((url, ind) => (
        <li key={ind}>
          <Image
            url={url}
            ind={ind}
            deleteImageByInd={deleteImageByInd}
            handleLoading={handleImagesLoading}
          />
        </li>
      ))}
    </ul>
  )
}
export default List
