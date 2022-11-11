import { useFormikContext } from 'formik'
import { useEffect } from 'react'

const FormikErrorFocus = () => {
  const formik = useFormikContext()
  const submitting = formik?.isSubmitting

  useEffect(() => {
    const el = document.querySelector('.error_message, [data-error]')
    ;(el?.parentElement ?? el)?.scrollIntoView()
  }, [submitting])
  return null
}

export default FormikErrorFocus
