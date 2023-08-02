import { isChatSelected } from '@/ChatProvider/ChatContextProvider'
import InputArea from './components/InputArea'
import MessageArea from './components/MessageArea'
import ParametersPanel from './components/ParametersPanel'
import InfoMessage from './components/InfoMessage'

import styles from './style.module.css'
import { useState } from 'react'
import Gallery from './components/Gallery'

type ChatProps = {
  closeChat: () => void
  isChatOpen: boolean
}

const Chat = ({ closeChat, isChatOpen }: ChatProps) => {
  const [isImagesSelected, setImagesSelected] = useState<boolean>(false)
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [gallerySenderName, setGallerySenderName] = useState<string>('')
  const handleGalleryData = (images: string[], name: string) => {
    setGalleryImages(images)
    setGallerySenderName(name)
  }
  const closeGallery = () => {
    setGalleryImages([])
  }

  return (
    <>
      <div className={`${styles.chat} ${isChatOpen ? styles.open : ''}`}>
        {isChatSelected() ? (
          <>
            <ParametersPanel closeChat={closeChat} isChatOpen={isChatOpen} />
            <MessageArea
              isImagesSelected={isImagesSelected}
              handleGalleryData={handleGalleryData}
            />
            <InputArea setImagesSelected={setImagesSelected} />
          </>
        ) : (
          <InfoMessage />
        )}
      </div>
      {galleryImages.length != 0 ? (
        <Gallery
          images={galleryImages}
          closeGallery={closeGallery}
          senderName={gallerySenderName}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default Chat
