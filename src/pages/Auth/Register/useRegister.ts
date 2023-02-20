import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRegistrationService } from 'services/useAuthService'
import { useNavigate } from 'react-router-dom'

import {
  // ORGANISATION_OPTIONS,
  ORGANISATION_FLEET_SIZE_OPTIONS,
  ORGANISATION_ROLE_OPTIONS,
  ORGANISATION_INDUSTRY,
  FLEET_TRANSITION_STATUS,
} from 'utils/constants'
import countries from 'utils/countries'

// const organisationOptionsValues = ORGANISATION_OPTIONS.map(item => item.value)
const organisationFleetSize = ORGANISATION_FLEET_SIZE_OPTIONS.map(item => item.value)
const organisationRole = ORGANISATION_ROLE_OPTIONS.map(item => item.value)
const organisationIndustry = ORGANISATION_INDUSTRY.map(item => item.value)
const transitionStatus = FLEET_TRANSITION_STATUS.map(item => item.value)

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your first name'),
  last_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your last name'),
  organisation_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter the name of your organisation'),
  contact: Yup.string()
    .required('Please enter your contact number')
    .min(10, 'Too Short!')
    .max(11, 'Too Long!'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please use a valid email format. Example - user@betterfleet.com'),
  password: Yup.string()
    .required('Please enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character.',
    ),
  confirm_password: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], "Passwords don't match."),
  organisation_fleet_size: Yup.string()
    .required('Please select the size of your fleet')
    .oneOf(organisationFleetSize, 'invalid value'),
  organisation_industry: Yup.string()
    .required('Please select the industry associated with your organisation')
    .oneOf(organisationIndustry, 'invalid value'),
  organisation_role: Yup.string()
    .required('Please select your role in the organisation')
    .oneOf(organisationRole, 'invalid value'),
  fleet_transition_status: Yup.string()
    .required('Please select the transition status of your fleet')
    .oneOf(transitionStatus, 'invalid value'),
  location: Yup.string().required('Please select your location'),
})

const initialValues = {
  first_name: '',
  last_name: '',
  contact: '',
  email: '',
  password: '',
  confirm_password: '',
  organisation_name: '',
  organisation_role: '',
  organisation_fleet_size: '',
  organisation_industry: '',
  location: '',
  fleet_transition_status: '',
  industry_update: '',
}

const useRegister = () => {
  const [alertMessage, setAlertMessage] = React.useState({ type: '', message: '' })
  const [registrationComplete] = useRegistrationService()
  const navigate = useNavigate()

  const handleSubmit = async (values: any) => {
    const data = { ...values }
    if (data.industry_update && data.industry_update.length > 0) {
      data.industry_update = true
    } else {
      data.industry_update = false
    }
    const response = await registrationComplete(values)

    if (!response) {
      setAlertMessage({ type: 'danger', message: 'User email is already registered' })
      return
    }

    navigate('/login', { state: { message: response.message } })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: async values => handleSubmit(values),
  })

  useEffect(() => {
    if (!formik.isSubmitting) return
    if (Object.keys(formik.errors).length > 0) {
      const error = document.getElementsByName(Object.keys(formik.errors)[0])[0]
      if (error) {
        error.focus()
      }
    }
  }, [formik])

  const countryList = countries().map(({ name }) => ({ label: name, value: name }))

  return {
    formik,
    alertMessage,
    countries: countryList,
  }
}

export default useRegister
