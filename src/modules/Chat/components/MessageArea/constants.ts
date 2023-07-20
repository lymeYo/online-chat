import { Timestamp } from 'firebase/firestore'

export type MessageT = {
  date: Timestamp
  id: string
  senderId: string
  text: string
}
