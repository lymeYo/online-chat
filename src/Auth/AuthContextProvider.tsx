import { auth } from '@/database/firebase'
import { User, onAuthStateChanged } from 'firebase/auth'
import { createContext, useContext, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import Login from './Login'
import { authTokenCookie } from '@/constants'
import Loading from '@/ui/Loading'

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
  const [isAuth, setIsAuth] = useState<boolean>(Boolean(Cookies.get(authTokenCookie)))
  const [currentUser, setCurrentUser] = useState<UserT | null>(null)

  useMemo(() => {
    onAuthStateChanged(auth, (userData: User | null) => {
      if (!isUserDataValid(userData)) {
        if (Cookies.get(authTokenCookie)) Cookies.remove(authTokenCookie)
        return
      }
      const user: UserT = {
        name: userData.displayName as string,
        photoURL: userData.photoURL as string,
        uid: userData.uid as string
      }

      setCurrentUser(user)
      setIsAuth(true)
      if (!Cookies.get(authTokenCookie)) Cookies.set(authTokenCookie, userData.refreshToken)
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
