export const authTokenCookie = 'auth-token'

export const getCombineIds = (uidA: string, uidB: string) =>
  uidA > uidB ? uidA + uidB : uidB + uidA //иначе если А написал Б то combinedUids будет АБ, а если Б написал А - то БА, хотя чат один

export const datePassedToString = (date: Date): string => {
  const secPerDay = 1000 * 60 * 60 * 24
  const nowDate = new Date()
  const daysDist = (nowDate.getTime() - date.getTime()) / secPerDay //высчитываю сколько дней назад было последнее сообщение пользователю

  let lastMessageDate: string
  if (nowDate.getFullYear() != date.getFullYear()) {
    lastMessageDate = date.toLocaleDateString('ru', {
      year: 'numeric',
      day: 'numeric',
      month: 'short'
    })
  } else if (daysDist > 2 || (daysDist < 2 && Math.abs(nowDate.getDay() - date.getDay()) == 2)) {
    lastMessageDate = date.toLocaleDateString('ru', {
      day: 'numeric',
      month: 'short'
    })
  } else if (Math.abs(nowDate.getDay() - date.getDay()) == 1) {
    lastMessageDate = 'вчера'
  } else {
    const messageDateHours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
    const messageDateMinutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
    lastMessageDate = messageDateHours + ':' + messageDateMinutes
  }

  return lastMessageDate
}
