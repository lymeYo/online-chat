export const authTokenCookie = 'auth-token'

export const getCombineIds = (uidA: string, uidB: string) =>
  uidA > uidB ? uidA + uidB : uidB + uidA //иначе если А написал Б то combinedUids будет АБ, а если Б написал А - то БА, хотя чат один
