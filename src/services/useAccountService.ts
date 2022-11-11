import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { IAccountQuery, IAccountQueryLazy } from './interfaces'
import { loader } from 'graphql.macro'

const getAccountQuery = loader('../gql/old/project/account/getAccount.gql')
const inviteUserGql = loader('../gql/account/inviteUser.gql')
const userAccountsGql = loader('../gql/account/userAccounts.gql')
const assignedUserListGql = loader('../gql/account/assignedUserList.gql')
const userAccountGql = loader('../gql/account/userAccount.gql')
const deleteShareGql = loader('../gql/account/deleteShare.gql')


export const useAccountService = (): IAccountQuery => {
  const {data:{account} = {}, error, loading, refetch} = useQuery(
	getAccountQuery,
	{fetchPolicy:"cache-first"},
  )
  
  return {
	data:account || {},
	error,
	loading,
	refetch,
  }
}

export const useAccountServiceLazy = (): IAccountQueryLazy => {
  const [getAccount, {data:{account} = [], error, loading, refetch}] = useLazyQuery(
	getAccountQuery,
	{variables:{}},
  )
  
  return {
	data:account || {},
	error,
	loading,
	refetch,
	getAccount,
  }
}

export const useInviteUserService = () => {
  const [create, {loading}] = useMutation(inviteUserGql)
  
  const inviteUser = async (email: string) => {
	try {
	  const {
		data:{inviteUser},
		errors,
	  }: any = await create({variables:{email}})
	  // return { inviteUser: inviteUser, ...(errors && errors.length ? { hasError: errors.errors[0] } : {})  }
	  return inviteUser || errors[ 0 ]
	} catch (error) {
	  return {
		hasError:true,
		error,
	  }
	}
  }
  
  return {inviteUser, loading}
}

export const useDeleteAccountAccessService = () => {
  const [update, {loading}] = useMutation(deleteShareGql)
  
  const deleteAccountAccess = async (id: string) => {
	try {
	  const {
		data:{deleteAccountAccess},
		errors,
	  }: any = await update({variables:{share_id:id}})
	  return deleteAccountAccess || errors[ 0 ]
	} catch (error) {
	  return {
		hasError:true,
		error,
	  }
	}
  }
  
  return {deleteAccountAccess, loading}
}

export const useUserAccountsService = () => {
  const {data:{userAccounts} = [], error, loading, refetch} = useQuery(
	userAccountsGql,
  )
  
  return {
	data:userAccounts || [],
	error,
	loading,
	refetch,
  }
}

export const useUserAccountService = () => {
  const {data:{userAccount} = {}, error, loading, refetch} = useQuery(
	userAccountGql,
  )
  
  return {
	data:userAccount || {},
	error,
	loading,
	refetch,
  }
}

export const useAssignedUserListService = () => {
  const {data:{assignedUserList} = [], error, loading, refetch} = useQuery(
	assignedUserListGql,
  )
  
  return {
	data:assignedUserList || [],
	error,
	loading,
	refetch,
  }
}
