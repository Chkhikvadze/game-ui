import { useUserAccountService, useUserAccountsService } from 'services'
import { removeAccountId, setAccountId } from 'helpers/authHelper'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from 'contexts'

const useSharedAccount = () => {
  const history: any = useNavigate()
  const { account: currentAccount } = useContext(AuthContext)
  const { data: account } = useUserAccountService()
  const { data: userAccounts } = useUserAccountsService()

  const handleAccountSelect = (item: any) => {
    setAccountId(item.assigned_account_id, history.location)
    history.go(0)
  }

  const defaultAccount = () => {
    removeAccountId()
    history.go(0)
  }

  return { userAccounts, handleAccountSelect, defaultAccount, account, currentAccount }
}

export default useSharedAccount
