import { useState } from 'react'
import List from './List'
import SkeletonsList from './SkeletonsList'

import styles from './style.module.css'

type ImagesRowProps = {
  images: string[]
  imagesLength: number
  deleteImageByInd: (ind: number) => void
  areImagesLoading: boolean
  finishImagesLoading: () => void
}
const ImagesRow = ({
  images,
  imagesLength,
  deleteImageByInd,
  areImagesLoading,
  finishImagesLoading
}: ImagesRowProps) => {
  return (
    <>
      <div className={areImagesLoading || !images.length ? styles.none : ''}>
        <List
          images={images}
          deleteImageByInd={deleteImageByInd}
          finishLoading={finishImagesLoading}
        />
      </div>
      <div className={areImagesLoading ? '' : styles.none}>
        <SkeletonsList length={imagesLength} />
      </div>
    </>
  )
}

export default ImagesRow
