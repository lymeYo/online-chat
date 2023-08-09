import { RefObject, useEffect } from 'react'
import { storage } from '@/database/firebase'
import { v4 as uuid } from 'uuid'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import globalStyles from '@/globalStyles.module.css'
import styles from './style.module.css'

type AddImageProps = {
  inputRef: RefObject<HTMLInputElement>
  setDownloadUrls: (urls: string[]) => void
  focusOnInput: () => void
  startImagesLoading: (length: number) => void
}
const AddImage = ({
  inputRef,
  setDownloadUrls,
  focusOnInput,
  startImagesLoading
}: AddImageProps) => {
  useEffect(() => {
    const changeHandler = async () => {
      const images = Object.values(inputRef.current?.files ?? [])
      startImagesLoading(images.length)
      const promises: Promise<string>[] = []
      let downloadUrls: string[] = []
      images.forEach(async img => {
        const storageRef = ref(storage, uuid())

        promises.push(
          uploadBytes(storageRef, img).then(uploadResult => {
            return getDownloadURL(uploadResult.ref)
          })
        )
      })

      downloadUrls = await Promise.all(promises)
      setDownloadUrls(downloadUrls)
      focusOnInput()
    }
    inputRef.current?.addEventListener('change', changeHandler)
    return () => {
      inputRef.current?.removeEventListener('change', changeHandler)
    }
  }, [])

  return (
    <>
      <input
        type='file'
        id='addImage'
        ref={inputRef}
        className={styles['add-image-input']}
        accept='image/png, image/jpg, image/jpeg, image/avif'
        multiple
      />
      <label htmlFor='addImage'>
        <div className={globalStyles['icon-wrapper']}>
          <svg
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            fill='#ffffff'
            stroke='#ffffff'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
            <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
            <g id='SVGRepo_iconCarrier'>
              <rect x='0' fill='none' width='24' height='24'></rect>
              <g>
                <path d='M23 4v2h-3v3h-2V6h-3V4h3V1h2v3h3zm-8.5 7c.828 0 1.5-.672 1.5-1.5S15.328 8 14.5 8 13 8.672 13 9.5s.672 1.5 1.5 1.5zm3.5 3.234l-.513-.57c-.794-.885-2.18-.885-2.976 0l-.655.73L9 9l-3 3.333V6h7V4H6c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2v-7h-2v3.234z'></path>{' '}
              </g>
            </g>
          </svg>
        </div>
      </label>
    </>
  )
}
export default AddImage
