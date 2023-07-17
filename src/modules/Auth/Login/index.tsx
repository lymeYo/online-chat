import styles from '../styles.module.css'

const Login = () => {
  return (
    <div className={styles.form}>
      <input type='text' placeholder='login' />
      <input type='text' placeholder='password' />
      <button>Войти</button>
      <span className={styles.switch}>Не заргестрирвоаны?</span>
    </div>
  )
}
export default Login
