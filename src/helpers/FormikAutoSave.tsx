import React, { useState, useEffect, useCallback } from 'react'
import { useFormikContext } from 'formik'
import _ from 'lodash'

const FormikAutoSave = ({ debounceMs = 1000 }) => {
  const formik = useFormikContext()
  const [isSaved, setIsSaved] = useState<any>(null)
  const debouncedSubmit: any = useCallback(
    _.debounce(() => formik.submitForm().then(() => setIsSaved(true)), debounceMs),
    [formik.submitForm, debounceMs],
  )

  useEffect(() => {
    if (formik.initialValues !== formik.values) {
      debouncedSubmit()
    }
  }, [formik.values])

  return <p></p>
}

export default FormikAutoSave
