import AbsenceSearchMessage from './AbsenceSearchMessage'
import EmptyChatsMessage from './EmptyChatsMessage'

import styles from './styles.module.css'

type InfoMessageProps = {
  isSearching: boolean
  isListEmpty: boolean
}
const InfoMessage = ({ isSearching, isListEmpty }: InfoMessageProps) => {
  if (!isListEmpty) return ''
  return (
    <div className={styles.wrapper} data-testid={'info-message'}>
      {isSearching ? <AbsenceSearchMessage /> : <EmptyChatsMessage />}
    </div>
  )
}

export default InfoMessage
