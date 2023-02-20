import { useMutation, useQuery } from '@apollo/client'
import { loader } from 'graphql.macro'

import { IAccountSettingQuery } from '../interfaces'

const settingByAccountQuery = loader('../../gql/old/project/accountSetting/settingByAccount.gql')
const updateAccountSettingGql = loader(
  '../../gql/old/project/accountSetting/updateAccountSetting.gql',
)

export const useAccountSettingService = (): IAccountSettingQuery => {
  const {
    data: { settingByAccount } = [],
    error,
    loading,
    refetch,
  } = useQuery(settingByAccountQuery)
  return {
    data: settingByAccount || {},
    error,
    loading,
    refetch,
  }
}

export const useUpdateAccountSettingService = () => {
  const [update] = useMutation(updateAccountSettingGql)

  const updateAccountSetting = async ({ input }: { input: IAccountSettingQuery }) => {
    try {
      const { data: updateAccountSetting } = await update({
        variables: { input },
      })
      return updateAccountSetting
    } catch (error) {
      return {
        hasError: true,
        error,
      }
    }
  }
  return [updateAccountSetting]
}
