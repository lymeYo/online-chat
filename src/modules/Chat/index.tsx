import { isChatSelected } from '@/ChatProvider/ChatContextProvider'
import InputArea from './components/InputArea'
import ParametersPanel from './components/ParametersPanel'
import InfoMessage from './components/InfoMessage'
import React, { useState, Suspense } from 'react'
import Gallery from './components/Gallery'

// import MessageArea from './components/MessageArea'
const MessageArea = React.lazy(() => import('./components/MessageArea'))

import styles from './style.module.css'

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
            <Suspense fallback={<div>Загрузка...</div>}>
              <MessageArea
                isImagesSelected={isImagesSelected}
                handleGalleryData={handleGalleryData}
              />
            </Suspense>
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
