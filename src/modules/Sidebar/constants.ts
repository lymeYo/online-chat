import { UserT } from '@/Auth/AuthContextProvider'
import { DocumentData, DocumentSnapshot, Timestamp } from 'firebase/firestore'

export type MessageDocument = {
  date: Timestamp
  userInfo: {
    displayName: string
    photoURL: string
    uid: string
  }
  lastMessage: {
    sender: string
    text: string
  }
}
export type UserPreview = {
  lastMessage: string
  lastMessageDate: string
} & UserT

export const getConvertedUserChats = (doc: DocumentSnapshot<DocumentData, DocumentData>) => {
  const data = doc.data() ?? []
  const exceptIndex = Object.keys(data).findIndex(element => element == 'date')
  return Object.values(data).filter((_, ind) => ind != exceptIndex) //т.к 1 элемент это date
}

export const datePassedToString = (date: Date): string => {
  const secPerDay = 1000 * 60 * 60 * 24
  const nowDate = new Date()
  const daysDist = (nowDate.getTime() - date.getTime()) / secPerDay //высчитываю сколько дней назад было последнее сообщение пользователю

  let lastMessageDate: string
  if (nowDate.getFullYear() != date.getFullYear()) {
    lastMessageDate = date.toLocaleDateString('ru', {
      year: 'numeric',
      day: 'numeric',
      month: 'short'
    })
  } else if (daysDist > 2 || (daysDist < 2 && Math.abs(nowDate.getDay() - date.getDay()) == 2)) {
    lastMessageDate = date.toLocaleDateString('ru', {
      day: 'numeric',
      month: 'short'
    })
  } else if (Math.abs(nowDate.getDay() - date.getDay()) == 1) {
    lastMessageDate = 'вчера'
  } else {
    const messageDateHours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
    const messageDateMinutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
    lastMessageDate = messageDateHours + ':' + messageDateMinutes
  }

  return lastMessageDate
}

export const convertMessageDocumentsToList = (data: MessageDocument): UserPreview => {
  const messageDate = new Date(data.date.seconds * 1000)
  console.log('data herr ', data)

  const lastMessageDate = datePassedToString(messageDate)

  return {
    name: data.userInfo.displayName,
    photoURL: data.userInfo.photoURL,
    uid: data.userInfo.uid,
    lastMessage: data.lastMessage.text,
    lastMessageDate
  }
}
