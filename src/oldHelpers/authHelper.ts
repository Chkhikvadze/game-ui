// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export const setAccountId = (accountId: string, location: string) => {
  cookies.set('accountId', accountId, { path: location })
}

export const removeAccountId = () => cookies.remove('accountId')

export const logout = () => {
  removeAccountId()
}
