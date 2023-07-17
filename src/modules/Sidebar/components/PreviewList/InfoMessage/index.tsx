import AbsenceSearchMessage from './AbsenceSearchMessage'
import EmptyChatsMessage from './EmptyChatsMessage'

type InfoMessageProps = {
  isSearching: boolean
  isListEmpty: boolean
}
const InfoMessage = ({ isSearching, isListEmpty }: InfoMessageProps) => {
  if (!isListEmpty) return ''
  return isSearching ? <AbsenceSearchMessage /> : <EmptyChatsMessage />
}

export default InfoMessage
