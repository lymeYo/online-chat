import crossImage from '@/ui/images/cross.svg'

import styles from './style.module.css'

// const urls = [
//   'https://images.unsplash.com/photo-1572202651953-e9be244dcdc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlmZmVyZW50JTIwc2l6ZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
//   'https://images.unsplash.com/photo-1587622129703-8029c13afe51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlmZmVyZW50JTIwc2l6ZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
//   'https://images.unsplash.com/photo-1509210227342-83cc9fb0e8c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGlmZmVyZW50JTIwc2l6ZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
//   'https://images.unsplash.com/photo-1509645470620-c9c349934693?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRpZmZlcmVudCUyMHNpemVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
// ]

type ImagesRowProps = {
  images: string[]
}
const ImagesRow = ({ images }: ImagesRowProps) => {
  if (images.length == 0) return ''
  return (
    <ul className={styles.list}>
      {images.map((url, ind) => (
        <li className={styles.item} key={ind}>
          <img src={url} alt='' />
          <div className={styles.cross}>
            <img src={crossImage} alt='' />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ImagesRow
