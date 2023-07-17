export const authTokenCookie = 'auth-token'

export const getCombineIds = (uidA: string, uidB: string) =>
  uidA > uidB ? uidA + uidB : uidB + uidA
