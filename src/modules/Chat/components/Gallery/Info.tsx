import styles from './style.module.css'

type InfoProps = {
  senderName: string
  imagesAmount: number
  curImageNum: number
}
const Info = ({ senderName, imagesAmount, curImageNum }: InfoProps) => {
  return (
    <div className={styles.info}>
      <span className={styles.name}>{senderName}</span>
      <span className={styles.amount}>
        {curImageNum}/{imagesAmount}
      </span>
    </div>
  )
}
export default Info
