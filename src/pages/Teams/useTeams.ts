import { AuthContext } from 'contexts'
import { useFormik } from 'formik'
import useSnackbarAlert from 'hooks/useSnackbar'
import { useContext } from 'react'
import {
  useInviteUserService,
  useAssignedUserListService,
  useDeleteAccountAccessService,
  useUserAccountService,
} from 'services'
import { administrationValidation } from 'utils/validationsSchema'
import columnConfig from './columnConfig'

import { useTranslation } from 'react-i18next'

const useAdministration = () => {
  const { t } = useTranslation()
  const { setSnackbar } = useSnackbarAlert()
  const { inviteUser } = useInviteUserService()
  const { data: assignedUserList, refetch } = useAssignedUserListService()
  const { deleteAccountAccess } = useDeleteAccountAccessService()
  const { account: currentAccount } = useContext(AuthContext)
  const { data: userAccount } = useUserAccountService()

  const handleSubmit = async (values: any) => {
    const res = await inviteUser(values.shared_email)

    if (!res || !res.success) {
      return setSnackbar({
        message: res.message,
        variant: 'warning',
      })
    }

    setSnackbar({
      message: `${t('success')}`,
      variant: 'success',
    })

    refetch()
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: { shared_email: '' },
    validationSchema: administrationValidation,
    onSubmit: (values) => handleSubmit(values),
  })

  const disabled = !!(userAccount.id === currentAccount.id)

  const handleDeleteAccountAccess = async (item: any) => {
    if (!disabled) return
    const res = await deleteAccountAccess(item.id)
    if (!res || !res.success) {
      return setSnackbar({
        message: res.message,
        variant: 'warning',
      })
    }
    setSnackbar({
      message: `${t('success')}`,
      variant: 'success',
    })
    refetch()
  }

  const config = columnConfig({ handleDeleteAccountAccess, disabled })

  return { formik, assignedUserList, config, disabled }
}

export default useAdministration
