import { UserT } from '@/Auth/AuthContextProvider'
import { dateToStringFormat } from '@/constants'
import { DocumentData, DocumentSnapshot, Timestamp } from 'firebase/firestore'

export type MessageDocument = {
  date: Timestamp
  userInfo: {
    displayName: string
    photoURL: string
    uid: string
  }
  lastMessage?: {
    sender: string
    text: string
  }
}
export type UserPreview = {
  lastMessage: string
  lastMessageDate: string
  time: number
} & UserT

export const getConvertedUserChats = (doc: DocumentSnapshot<DocumentData, DocumentData>) => {
  const data = doc.data() ?? []
  return Object.values(data)
}

export const convertMessageDocumentsToList = (data: MessageDocument): UserPreview => {
  const messageDate = new Date(data.date.seconds * 1000)

  const lastMessageDate = dateToStringFormat(messageDate)

  return {
    name: data.userInfo.displayName,
    photoURL: data.userInfo.photoURL,
    uid: data.userInfo.uid,
    lastMessage: data.lastMessage?.text ?? '',
    time: data.date.seconds,
    lastMessageDate
  }
}
