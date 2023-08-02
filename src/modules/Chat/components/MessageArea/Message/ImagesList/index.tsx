import styles from './style.module.css'

type ImageListProps = {
  urls: string[]
  handleOnLoadImage: () => void
  clickHandler: () => void
}
const ImageList = ({ urls, handleOnLoadImage, clickHandler }: ImageListProps) => {
  if (urls.length == 0) return ''
  return (
    <ul className={styles.list}>
      {urls.map((url, ind) => (
        <li onClick={clickHandler} className={styles.item} key={ind}>
          <img src={url} onLoad={handleOnLoadImage} />
        </li>
      ))}
    </ul>
  )
}
export default ImageList
