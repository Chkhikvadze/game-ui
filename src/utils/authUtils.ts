import { queryStringFromObject } from 'utils'

const redirectToLogin = () => {
  const state = { environment: process.env.REACT_APP_ENV }
  const query = {
    client_id: process.env.REACT_APP_FUSION_AUTH_APPID,
    redirect_uri: process.env.REACT_APP_FUSION_REDIRECT_URL,
    response_type: 'code',
    scope: 'offline_access',
    tenantId: `${process.env.REACT_APP_FUSION_TENANT_ID}`,
    state: JSON.stringify(state),
  }

  const queryString = queryStringFromObject(null, query)
  return (window.location.href = `${process.env.REACT_APP_FUSION_AUTH_URL}/oauth2/authorize?${queryString}`)
}

export default {
  redirectToLogin,
}
