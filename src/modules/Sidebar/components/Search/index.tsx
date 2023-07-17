import { collection, getDocs, query, where } from 'firebase/firestore'
import Icon from './Icon'
import styles from './styles.module.css'
import { db } from '@/database/firebase'
import { useRef } from 'react'
import { UserT, getUser } from '@/Auth/AuthContextProvider'

type SearchProps = {
  setList: (results: UserT[]) => void
  setIsSearching: (isSearching: boolean) => void
}
const Search = ({ setList, setIsSearching }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { name: ownerName } = getUser()
  const handleSearch = async () => {
    const name = inputRef.current?.value
    if (!name) return

    try {
      const usersRef = collection(db, 'users')
      const q = query(
        usersRef,
        where('displayName', '==', name),
        where('displayName', '!=', ownerName)
      )
      const querySnapshot = await getDocs(q)
      const results: UserT[] = []
      querySnapshot.forEach(doc => {
        const incomingData = doc.data()
        const data: UserT = {
          name: incomingData.displayName,
          uid: incomingData.uid,
          photoURL: incomingData.photoURL
        }
        results.push(data)
      })
      setList(results)
    } catch (err) {
      console.error(err)
    }
  }
  const handleChange = () => {
    const name = inputRef.current?.value
    if (!name) setIsSearching(false)
    else {
      handleSearch()
      setIsSearching(true)
    }
  }
  return (
    <div className={styles['search-wrapper']}>
      <div className={styles.search}>
        <Icon onClick={handleSearch} />
        <input ref={inputRef} onChange={handleChange} type='text' placeholder='Поиск' />
      </div>
    </div>
  )
}
export default Search
