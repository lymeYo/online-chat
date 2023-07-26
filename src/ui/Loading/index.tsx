import loader from '@/ui/images/loader_spinner.svg'
import styles from './styles.module.css'

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <img src={loader} alt='' />
    </div>
  )
}
export default Loading
