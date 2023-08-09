import loadImageImg from '@/ui/images/load-image.svg'

import styles from './style.module.css'

const Item = () => {
  return (
    <div className={styles.item}>
      <img src={loadImageImg} alt='' />
    </div>
  )
}
export default Item
