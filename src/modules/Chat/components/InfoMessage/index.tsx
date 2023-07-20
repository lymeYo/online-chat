import CatImage from '@/ui/images/cat.png'

import styles from './style.module.css'

const InfoMessage = () => {
  return (
    <div className={styles.info}>
      <span>Откройте диалог!</span>
      <img src={CatImage} alt='' />
    </div>
  )
}
export default InfoMessage
