import { KeyboardEvent, MutableRefObject, RefObject } from 'react'
import styles from './style.module.css'

type InputProps = {
  inputRef: RefObject<HTMLInputElement>
  sendMessage: () => void
}
const Input = ({ inputRef, sendMessage }: InputProps) => {
  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code == 'Enter') sendMessage()
  }
  return (
    <div className={styles.input}>
      <input onKeyDown={handleKey} ref={inputRef} type='text' placeholder='Введите сообщение' />
    </div>
  )
}
export default Input
