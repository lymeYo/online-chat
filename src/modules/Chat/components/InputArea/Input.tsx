import styles from './style.module.css'

const Input = () => {
  return (
    <div className={styles.input}>
      <input type='text' placeholder='Введите сообщение' />
    </div>
  )
}
export default Input
