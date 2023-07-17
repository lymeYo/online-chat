import styles from '../styles.module.css'

const Register = () => {
  return (
    <div className={styles.form}>
      <input type='text' placeholder='login' />
      <input type='text' placeholder='password' />
      <button>Зарегестрироваться</button>
      <span className={styles.switch}>Войти?</span>
    </div>
  )
}
export default Register
