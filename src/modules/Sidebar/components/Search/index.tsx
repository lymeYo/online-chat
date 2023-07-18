import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import Icon from './Icon'
import styles from './styles.module.css'
import { db } from '@/database/firebase'
import { useRef } from 'react'
import { UserT, getUser } from '@/Auth/AuthContextProvider'
import {
  MessageDocument,
  UserPreview,
  convertMessageDocumentsToList,
  datePassedToString,
  getConvertedUserChats
} from '../../constants'

type SearchProps = {
  setList: (results: UserPreview[]) => void
  setIsSearching: (isSearching: boolean) => void
}
const Search = ({ setList, setIsSearching }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { name: ownerName, uid: ownerUid } = getUser()
  const handleSearch = async () => {
    const name = inputRef.current?.value
    if (!name) return

    try {
      const userChatsRef = doc(db, 'userChats', ownerUid)
      const resultDoc = await getDoc(userChatsRef)
      const userChats = getConvertedUserChats(resultDoc)

      const newList: UserPreview[] = userChats.map(convertMessageDocumentsToList)

      setList(newList)

      // const results: UserPreview[] = []
      // querySnapshot.forEach(doc => {
      //   const incomingData = doc.data()
      //   console.log(incomingData)

      //   const data: UserPreview = {
      //     name: incomingData.displayName,
      //     uid: incomingData.uid,
      //     photoURL: incomingData.photoURL,
      //     lastMessage: 'TEST'
      //   }
      //   results.push(data)
      // })
      // setList(results)
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
