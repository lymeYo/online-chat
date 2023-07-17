import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA_OfR7p6q3tRXrWefkDOSQI-agHwpksDw',
  authDomain: 'online-chat-b4171.firebaseapp.com',
  projectId: 'online-chat-b4171',
  storageBucket: 'online-chat-b4171.appspot.com',
  messagingSenderId: '592375344624',
  appId: '1:592375344624:web:0a4fb861cce9110b4c8135',
  measurementId: 'G-K9EGSRGFLL'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)

//allow read, write: if false;
