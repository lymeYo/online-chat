import { useState } from 'react'
import Login from './Login'

import styles from './styles.module.css'
import Register from './Register'

const Auth = () => {
  const [isLoginArea, setLoginArea] = useState<boolean>(true)
  return (
    <div className={styles.wrapper}>
      <Register />
    </div>
  )
}
export default Auth
