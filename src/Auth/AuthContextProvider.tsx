import { auth } from '@/database/firebase'
import { User, onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useMemo, useState } from 'react'
import Login from './Login'
import Cookies from 'universal-cookie'
import { authTokenCookie } from '@/constants'
import Loading from '@/ui/Loading'
const cookies = new Cookies()

export type UserT = {
  name: string
  photoURL: string
  uid: string
}

const isUserDataValid = (userData: User | null): userData is User => !!userData

const AuthContext: React.Context<UserT | null> = createContext<UserT | null>(null)
export const getUser = (): UserT => useContext(AuthContext) as UserT

type AuthContextProviderProps = {
  children: React.ReactNode
}
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean>(cookies.get(authTokenCookie))
  const [currentUser, setCurrentUser] = useState<UserT | null>(null)

  useMemo(() => {
    onAuthStateChanged(auth, (userData: User | null) => {
      if (!isUserDataValid(userData)) {
        if (cookies.get(authTokenCookie)) cookies.remove(authTokenCookie)
        return
      }
      const user: UserT = {
        name: userData.displayName as string,
        photoURL: userData.photoURL as string,
        uid: userData.uid as string
      }

      setCurrentUser(user)
      setIsAuth(true)
      if (!cookies.get(authTokenCookie)) cookies.set(authTokenCookie, userData.refreshToken)
    })
  }, [auth])

  if (isAuth) {
    return currentUser ? (
      <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
    ) : (
      <Loading />
    )
  } else {
    return <Login setIsAuth={setIsAuth} />
  }
}
