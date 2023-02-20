// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'universal-cookie'

const cookies: any = new Cookies()

export const setAccountId = (accountId: string, location: string) => {
  cookies.set('accountId', accountId)
}

export const setTokens = (data: any) => {
  cookies.set('authorization', data.access_token)
  cookies.set('x-refresh-token', data.refresh_token)
}

export const cleanCookie = () => {
  cookies.remove('authorization')
  cookies.remove('x-refresh-token')
  cookies.remove('accountid')
}

export const removeAccountId = () => cookies.remove('accountId')

export const logout = () => {
  removeAccountId()
  cleanCookie()
}
