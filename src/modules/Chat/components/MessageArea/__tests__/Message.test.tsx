import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Message from '../Message'

const messageText = 'text for test'
const messageProps = {
  text: messageText,
  type: 'incoming' as 'incoming' | 'outcoming',
  time: 'time',
  imagesUrls: [],
  senderId: '',
  handleOnLoadImage: () => {},
  handleGalleryData: (images: string[], senderName: string) => {}
}

test('render Message component', () => {
  render(<Message {...messageProps} />)

  const messageEl = screen.getByTestId('message')
  expect(messageEl).toBeInTheDocument()
  expect(messageEl).toHaveTextContent(messageText)
})
