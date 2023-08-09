import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc
} from 'firebase/firestore'
import { useCallback, useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'
import Submit from './Buttons/Submit'
import AddImage from './Buttons/AddImage'
import Input from './Input'
import { getCurrentChat } from '@/ChatProvider/ChatContextProvider'
import { db } from '@/database/firebase'
import { UserT, getUser } from '@/Auth/AuthContextProvider'
import ImagesRow from './ImagesRow'

import styles from './style.module.css'

type InputAreaProps = {
  setImagesSelected: (isSelected: boolean) => void
}
const InputArea = ({ setImagesSelected }: InputAreaProps) => {
  const inputTextRef = useRef<HTMLInputElement>(null)
  const inputAddImageRef = useRef<HTMLInputElement>(null)
  const [downloadUrls, setDownloadUrls] = useState<string[]>([])
  const [areImagesLoading, setImagesLoading] = useState<boolean>(false)
  const [imagesLength, setImagesLength] = useState<number>(0)

  const handleDownloadUrls = (urls: string[]) => {
    setImagesSelected(urls.length != 0)
    setDownloadUrls(urls)
  }
  const deleteDownloadUrlByInd = (indForDelete: number) => {
    const newDownloadUrls = downloadUrls.filter((_, ind) => ind != indForDelete)
    handleDownloadUrls(newDownloadUrls)
  }
  const { chatId, user } = getCurrentChat()
  const { uid } = user as UserT
  const { uid: ownerUid } = getUser()

  const focusOnInput = () => {
    inputTextRef.current?.focus()
  }

  const handleSendMessage = useCallback(() => {
    if (inputAddImageRef.current) inputAddImageRef.current.value = ''
    sendMessageByPortions(downloadUrls)
    handleDownloadUrls([]) //очищаю загруженные фотографии
  }, [downloadUrls])

  const sendMessageByPortions = async (urls: string[]) => {
    //Делю все картинки на порции по urlsPerPortion штук
    const urlsPerPortion = 3
    const portions = Math.ceil(urls.length / urlsPerPortion) || 1
    const lastPortionUrls = urls.length % urlsPerPortion || urlsPerPortion
    let start = 0
    let end = urlsPerPortion
    for (let i = 1; i <= portions; i++) {
      const portionUrls = urls.slice(start, end)
      await sendMessage(portionUrls)
      start = end
      end = i + 1 == portions ? end + lastPortionUrls : end + urlsPerPortion
    }
  }

  const sendMessage = async (urls: string[]) => {
    const text = inputTextRef.current?.value ?? ''
    const messageId = uuid()
    if (inputTextRef.current) inputTextRef.current.value = ''

    const ownerChatsRef = doc(db, 'userChats', ownerUid)
    const userChatsRef = doc(db, 'userChats', uid)
    const messageRef = doc(db, 'chats', chatId as string, 'messages', messageId)

    await setDoc(messageRef, {
      id: messageId,
      text,
      senderId: ownerUid,
      date: Timestamp.now(),
      images: urls
    })

    const dataForUpdateDoc = {
      [chatId + '.lastMessage']: {
        text: text.replace(/\s/g, '') == '' && urls.length != 0 ? 'Фотография' : text,
        sender: ownerUid
      },
      [chatId + '.date']: Timestamp.now()
    }

    await updateDoc(ownerChatsRef, dataForUpdateDoc)

    await updateDoc(userChatsRef, dataForUpdateDoc)
  }

  const startImagesLoading = (length: number) => {
    setImagesLoading(true)
    setImagesLength(length)
  }
  const finishImagesLoading = () => {
    setImagesLoading(false)
  }

  useEffect(() => {
    inputTextRef.current?.focus()
  })
  return (
    <div className={styles.wrapper}>
      <div className={styles['input-row']}>
        <Input sendMessage={handleSendMessage} inputRef={inputTextRef} />
        <div className={styles.buttons}>
          <AddImage
            inputRef={inputAddImageRef}
            setDownloadUrls={handleDownloadUrls}
            focusOnInput={focusOnInput}
            startImagesLoading={startImagesLoading}
          />
          <Submit onSubmit={handleSendMessage} />
        </div>
      </div>
      <ImagesRow
        images={downloadUrls}
        imagesLength={imagesLength}
        deleteImageByInd={deleteDownloadUrlByInd}
        areImagesLoading={areImagesLoading}
        finishImagesLoading={finishImagesLoading}
      />
    </div>
  )
}
export default InputArea
