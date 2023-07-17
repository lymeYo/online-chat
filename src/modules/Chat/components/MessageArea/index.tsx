import Message from './Message'
import styles from './style.module.css'

// type MessageAreaProps = {}

const messages = [
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, odit.',
  'Lorem, ipsum dolor.',
  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit minima quae natus quos suscipit corporis voluptatem vitae ducimus ratione eveniet!',
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam inventore molestias delectus cupiditate, doloremque obcaecati dolorum eaque laborum, dicta quia vero hic expedita quas suscipit, molestiae aperiam ratione exercitationem ex.'
]

const MessageArea = () => {
  return (
    <div className={styles.wrapper}>
      <Message text={'Lorem, ipsum dolor'} type={'outcoming'} />
      <Message text={'Lorem, ipsum dolor'} type={'incoming'} />
      <Message text={'Lorem, ipsum dolor'} type={'outcoming'} />
    </div>
  )
}

export default MessageArea
