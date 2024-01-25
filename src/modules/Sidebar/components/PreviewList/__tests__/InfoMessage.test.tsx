import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import InfoMessage from '../InfoMessage'

test('Rener InfoMessage component', () => {
  render(<InfoMessage isListEmpty={true} isSearching={true} />)
  const InfoMessageEL = screen.getByTestId('info-message')
  expect(InfoMessageEL).toBeInTheDocument()
  expect([
    'Похоже у вас нет ни с кем диалогов, ищите собеседников!',
    'Пользователи с таким именем не найдены'
  ]).toContain(InfoMessageEL.textContent)
})
