import { UserT } from '@/Auth/AuthContextProvider'
import { dateToStringFormat } from '@/constants'
import { DocumentData, DocumentSnapshot, Timestamp } from 'firebase/firestore'

export type MessageDocument = {
  date: Timestamp | null
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
  let lastMessageDate: string
  if (data.date) {
    const messageDate = new Date(data.date.seconds * 1000)
    lastMessageDate = dateToStringFormat(messageDate)
  } else {
    lastMessageDate = ''
  }

  return {
    name: data.userInfo.displayName,
    photoURL: data.userInfo.photoURL,
    uid: data.userInfo.uid,
    lastMessage: data.lastMessage?.text ?? '',
    time: data.date?.seconds ?? -1,
    lastMessageDate
  }
}
