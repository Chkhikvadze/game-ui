import React from 'react'
import Loading from 'atoms/Loader'
import useAuth from './useAuth'

const Auth = () => {
  const {loading} = useAuth()
  return (<>
    {loading && <Loading/>}
  </>)
}

export default Auth