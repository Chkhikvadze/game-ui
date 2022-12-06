import { useParams } from "react-router-dom"
import { useFormik } from "formik"

import useSnackbarAlert from "hooks/useSnackbar"
import {
  useUserByIdService,
  useUpdateUserService,
  useActiveTwoFactorByAdminService,
  useAccountByIdService,
  useUpdateAccountService,
} from "services"
import countries from "utils/countries"
import {
  createUserValidation,
  createAdminValidation,
} from "utils/validationsSchema"
import { useEffect, useState } from "react"

const useEditUser = () => {
  const params = useParams()
  const id: string = params?.id!
  const { data: user, loading, refetch } = useUserByIdService({ id })
  const { data: account } = useAccountByIdService(user?.id)
  const [updateAccountForAdmin] = useUpdateAccountService()
  const [validationSchema, setValidationSchema] =
    useState<any>(createUserValidation)

  const isUser = user.role === "user"

  const [updateUser] = useUpdateUserService()
  const [activeTwoFactorByAdmin] = useActiveTwoFactorByAdminService()
  const { setSnackbar } = useSnackbarAlert()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      organisation_name: account?.organisation_name,
      organisation_industry: account?.organisation_industry,
      organisation_role: account?.organisation_role,
      organisation_fleet_size: account?.organisation_fleet_size,
      fleet_transition_status: account?.fleet_transition_status,
      location: account?.location,
      contact_number: user?.contact_number,
      email: user?.email,
      enable_2fa: user.enable_2fa ? user.enable_2fa : false,
    },
    validationSchema,

    onSubmit: async (values) => {
      const {
        first_name,
        last_name,
        contact_number,
        enable_2fa,
        email,
        ...accountInput
      } = values

      const updateUserResoponse = await updateUser(id, {
        first_name,
        last_name,
        contact_number,
      })
      const activetwoFactorResponse = await activeTwoFactorByAdmin(
        id,
        enable_2fa,
      )

      const updateAccountResponse = await updateAccountForAdmin(
        id,
        accountInput,
      )

      if (
        updateUserResoponse.hasError ||
        activetwoFactorResponse.hasError ||
        updateAccountResponse.hasError
      ) {
        setSnackbar({ message: "User update failed", variant: "error" })
        return
      }
      setSnackbar({ message: "User updated", variant: "success" })
      await refetch()
    },
  })

  const countryList = countries().map(({ name }) => ({
    label: name,
    value: name,
  }))

  useEffect(() => {
    setValidationSchema(createAdminValidation)
  }, [!isUser]) //eslint-disable-line

  useEffect(() => {
    setValidationSchema(createAdminValidation)
  }, [isUser]) //eslint-disable-line

  return {
    formik,
    loading,
    countries: countryList,
    isUser,
  }
}

export default useEditUser
