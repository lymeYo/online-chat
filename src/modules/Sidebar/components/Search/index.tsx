import { collection, getDocs, query, where } from 'firebase/firestore'
import Icon from './Icon'
import styles from './styles.module.css'
import { db } from '@/database/firebase'
import { useRef } from 'react'
import { UserPreview } from '../../constants'

type SearchProps = {
  setSearchChats: (results: UserPreview[]) => void
  setIsSearching: (isSearching: boolean) => void
  userChats: UserPreview[]
}

const Search = ({ setSearchChats, setIsSearching, userChats }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleSearch = async () => {
    const name = inputRef.current?.value
    if (!name) return

    try {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('displayName', '==', name))
      const querySnapshot = await getDocs(q)
      const newSearchChats: UserPreview[] = userChats.filter(chat => chat.name == name)
      querySnapshot.forEach(doc => {
        const data = doc.data()
        if (newSearchChats.find(chat => chat.uid == data.uid)) return

        const searchedUser: UserPreview = {
          uid: data.uid,
          name: data.displayName,
          photoURL: data.photoURL,
          lastMessage: '',
          lastMessageDate: ''
        }
        newSearchChats.push(searchedUser)
      })

      setSearchChats(newSearchChats)
    } catch (err) {
      console.error(err)
    }
  }
  const handleChange = async () => {
    const name = inputRef.current?.value

    if (!name) setIsSearching(false)
    else {
      setIsSearching(true)
      await handleSearch()
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
