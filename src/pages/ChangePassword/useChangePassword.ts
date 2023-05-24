import { useFormik } from 'formik'
import { useChangePasswordService } from 'services'
import * as Yup from 'yup'
import useSnackbarAlert from 'hooks/useSnackbar'
import { useModal } from 'hooks'
import { useTranslation } from 'react-i18next'

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Please enter your current password.'),
  password: Yup.string()
    .required('Please enter your new password.')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character.',
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your new password')
    .oneOf([Yup.ref('password'), null], "Passwords don't match."),
})

const initialValues = {
  currentPassword: '',
  password: '',
  confirmPassword: '',
}

const useChangePassword = () => {
  const { t } = useTranslation()
  const [changePasswordMutation] = useChangePasswordService()
  const { setSnackbar } = useSnackbarAlert()
  const { openModal, closeModal } = useModal()

  const updatePassword = async (values: any) => {
    try {
      await changePasswordMutation({
        new_password: values.password,
        current_password: values.currentPassword,
      })
      setSnackbar({
        message: t('password-successfully-updated'),
        variant: 'success',
      })
    } catch (err) {
      await setSnackbar({
        variant: 'warning',
        message: t('something-went-wrong-while-resetting-password'),
      })
    }
  }
  const openCreateChangePasswordModal = () => {
    openModal({
      name: 'create-change-password-modal',
    })
  }

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: async (values: any) => updatePassword(values),
  })

  return {
    formik,
    openCreateChangePasswordModal,
    closeModal,
  }
}

export default useChangePassword
