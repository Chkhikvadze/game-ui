import React from 'react'

// import { IUser } from 'interfaces'
import { useAccountService, useUserService } from 'services'
import { AuthContext } from 'contexts'
import Loader from 'atoms/Loader'
// import { useLocation } from 'react-router-dom'

// type AuthProviderProps = {
//   children: (user: any) => React.ReactElement
// }

const AuthProvider = ({children}: any) => {
  const {data:user, loading} = useUserService({})
  // const {i18n} = useTranslation()
  const { data: account } = useAccountService()
  // const { location } = account
  // const routeLocation = useLocation()
  
  // useEffect(() => {
  //   switch (location) {
  //     case 'United States':
  //       localStorage.setItem('lng', 'en')
  //       i18n.changeLanguage('en')
  //       return
  //     case 'Australia':
  //       localStorage.setItem('lng', 'au')
  //       i18n.changeLanguage('au')
  //       return
  //     case 'United Kingdom':
  //       localStorage.setItem('lng', 'uk')
  //       i18n.changeLanguage('uk')
  //       return
  //     default:
  //       localStorage.setItem('lng', 'en')
  //       i18n.changeLanguage('en')
  //       return
  //   }
  // }, [location]) //eslint-disable-line
  
  // useEffect(() => {
  //   localStorage.removeItem('page')
  // }, [routeLocation])
  
  const isAuthenticated = Boolean(user?.id)
  
  const contextValue = {
    user,
    loading,
    isAuthenticated,
    account,
  }
  
  if (loading) {
    return <Loader/>
  }
  
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default AuthProvider
