import { auth, db, provider } from '@/database/firebase'
import { signInWithPopup } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import Cookies from 'universal-cookie'
import { authTokenCookie } from '@/constants'

import styles from './styles.module.css'

const cookies = new Cookies()

type LoginProps = {
  setIsAuth: (isAuth: boolean) => void
}
const Login = ({ setIsAuth }: LoginProps) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      cookies.set(authTokenCookie, result.user.refreshToken)
      setIsAuth(!!result.user.refreshToken)

      const { displayName, photoURL, uid } = result.user

      await setDoc(doc(db, 'users', uid), {
        uid,
        displayName,
        photoURL
      }) //создаю пользователя в бд, если не создан

      await setDoc(doc(db, 'userChats', uid), {})

      // const usersRef = collection(db, 'users')
      // const res = await addDoc(usersRef, {
      //   uid,
      //   displayName,
      //   email,
      //   photoURL
      // })
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <span className={styles.label}>Войти с помощью Google</span>
        <button onClick={signInWithGoogle}>Войти</button>
      </div>
    </div>
  )
}
export default Login
