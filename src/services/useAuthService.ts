import { useMutation } from '@apollo/client'
import { loader } from 'graphql.macro'

const authByCodeMutation = loader('../gql/old/project/user/authByCode.gql')
const logoutMutation = loader('../gql/old/project/user/logout.gql')
const registrationMutation = loader('../gql/old/project/user/registration.gql')
const authLoginMutation = loader('../gql/old/project/user/authLogin.gql')
const activateAccountGql = loader('../gql/old/project/user/activateAccount.gql')
const forgotPasswordMutation = loader('../gql/old/project/user/forgotPassword.gql')
const resetPasswordMutation = loader('../gql/old/project/user/resetPassword.gql')
const resendVerifyEmailMutation = loader('../gql/old/project/user/resendVerifyEmail.gql')
const loginCompleteMutation = loader('../gql/old/project/user/loginComplete.gql')
const resendCodeMutation = loader('../gql/old/project/user/resendCode.gql')

export const useAuthService = () => {
  const [auth] = useMutation(authByCodeMutation)
  
  const getAuthByCode = async (code: string): Promise<{accessToken: string, refreshToken: string, exp: any}> => {
	const {data:{authByCode}} = await auth({variables:{body:{code}}})
	return authByCode
  }
  
  return [getAuthByCode]
}

export const useLogoutService = () => {
  const [logoutM] = useMutation(logoutMutation)
  
  const logout = async (): Promise<{accessToken: string, refreshToken: string, exp: any}> => {
	const {data:{logout}} = await logoutM({variables:{body:{}}})
	return logout
  }
  
  return [logout]
}

export const useRegistrationService = () => {
  const [mutation] = useMutation(registrationMutation)
  
  const registrationComplete = async (data: object): Promise<{message: string}> => {
	const {data:{registration}} = await mutation({variables:{body:data}})
	return registration
  }
  
  return [registrationComplete]
}

export const useLoginService = () => {
  const [mutation] = useMutation(authLoginMutation)
  const authLoginComplete = async (loginId: string, password: string) => {
	try {
	  const {data:{login}} = await mutation({variables:{body:{loginId, password}}})
	  return login
	} catch (error) {
	  return {
		hasError:true,
		error,
	  }
	}
  }
  
  return [authLoginComplete]
}

export const useActivateAccountService = () => {
  const [mutation] = useMutation(activateAccountGql)
  const activateAccount = async (token: string, callback: Function) => {
	try {
	  const {data:{activateAccount}} = await mutation({variables:{body:{token}}})
	  callback(activateAccount)
	  
	  return activateAccount
	} catch (error) {
	  callback()
	}
  }
  
  return [activateAccount]
}

export const useForgotPasswordService = () => {
  const [mutation] = useMutation(forgotPasswordMutation)
  
  const forgotPassword = async (loginId: string, callback: Function): Promise<{message: string, success: boolean}> => {
	const {data:{forgotPassword}} = await mutation({variables:{body:{loginId}}})
	callback()
	return forgotPassword
  }
  
  return [forgotPassword]
}

export const useRestPasswordService = () => {
  const [mutation] = useMutation(resetPasswordMutation)
  
  const resetPassword = async (password: string, confirm_password: string, token: string, callback: Function) => {
	const {data:{resetPassword}} = await mutation({variables:{body:{password, confirm_password, token}}})
	callback()
	return resetPassword
  }
  
  return [resetPassword]
}

export const useResendVerifyEmailService = () => {
  const [mutation] = useMutation(resendVerifyEmailMutation)
  
  const resendVerifyEmail = async (loginId: string): Promise<{message: string, success: boolean}> => {
	const {data:{resendVerifyEmail}} = await mutation({variables:{body:{loginId}}})
	return resendVerifyEmail
  }
  
  return [resendVerifyEmail]
}

export const useLoginCompleteService = () => {
  const [mutation] = useMutation(loginCompleteMutation)
  
  const loginComplete = async (code: string, twoFactorId: string): Promise<{message: string, success: boolean}> => {
	const {data:{loginCompleted}} = await mutation({variables:{body:{code, twoFactorId}}})
	return loginCompleted
  }
  
  return [loginComplete]
}

export const useResendCodeService = () => {
  const [mutation] = useMutation(resendCodeMutation)
  
  const resendCode = async (twoFactorId: string): Promise<{message: string, success: boolean}> => {
	const {data:{resendCode}} = await mutation({variables:{body:{twoFactorId}}})
	return resendCode
  }
  
  return [resendCode]
}