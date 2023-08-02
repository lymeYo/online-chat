import { useEffect, useState } from 'react'
import CloseImageArea from './CloseImageArea'
import ImageArea from './ImageArea'
import Info from './Info'

import styles from './style.module.css'

type GalleryProps = {
  images: string[]
  closeGallery: () => void
  senderName: string
}
const Gallery = ({ images, closeGallery, senderName }: GalleryProps) => {
  const imagesLength = images.length
  const [curImageInd, setCurImageInd] = useState<number>(0)
  const handleCurImageInd = (pointer: 1 | -1) => {
    setCurImageInd(prevInd => {
      if (prevInd + pointer == -1) return imagesLength - 1
      if (prevInd + pointer == imagesLength) return 0
      return prevInd + pointer
    })
  }

  const handleCloseGallery = () => {
    closeGallery()
  }

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLDivElement

      if (target.closest('.' + styles.wrapper) && !target.closest('.' + styles.box))
        handleCloseGallery()
    }
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.code == 'ArrowRight') handleCurImageInd(1)
      if (event.code == 'ArrowLeft') handleCurImageInd(-1)
      if (event.code == 'Escape') handleCloseGallery()
    }
    document.addEventListener('click', handleClick)
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <Info senderName={senderName} imagesAmount={imagesLength} curImageNum={curImageInd + 1} />
        <ImageArea curInd={curImageInd} handleCurInd={handleCurImageInd} images={images} />
        <CloseImageArea handleClose={handleCloseGallery} />
      </div>
    </div>
  )
}

export default Gallery
