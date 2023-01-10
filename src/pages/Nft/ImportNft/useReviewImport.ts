import React from 'react'
import { columnConfig } from './columnConfig'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useInsertNftsService, useGetDownloadUrl } from 'services'
import { useParams } from 'react-router-dom'
import { useCollectionByIdService } from 'services/useCollectionService'

import useSnackbarAlert from 'hooks/useSnackbar'

const field_names = [
  { label: 'Name *', value: 'name' },
  { label: 'Token Id', value: 'token_id' },
  { label: 'Price', value: 'price' },
  { label: 'Number of copies', value: 'number_of_copies' },
  { label: 'Asset URL', value: 'asset_url' },
  { label: 'Description', value: 'description' },
  { label: 'Properties', value: 'properties' },
  { label: 'Custom field', value: 'custom_field' },
  { label: 'No import', value: 'no_import' },
]

const csv_keys = [
  'Name *',
  'Token Id',
  'Price',
  'Number of copies',
  'Asset URL',
  'Description',
  'Properties',
]

const generateValidationSchema = (keys: string[]) => {
  const obj: any = {}
  // eslint-disable-next-line array-callback-return
  keys.map((item) => {
    obj[item] = yup.string().required(`Required!`)
  })

  return yup.object().shape({
    ...obj,
  })
}

const useReviewImport = (data: any) => {
  const { setSnackbar } = useSnackbarAlert()

  const [keys, setKeys] = React.useState<string[]>([])
  const [custom_field_keys, setCustomFieldKeys] = React.useState<any>([])
  const [validationSchema, setValidationSchema] = React.useState<any>(null)
  const [step, setStep] = React.useState<number>(0)
  const [response, setResponse] = React.useState<any>(null)
  const [file_options, setFileOptions] = React.useState<any>([])

  const params = useParams()
  const collectionId: string = params?.collectionId!
  const { insertNftsService } = useInsertNftsService()
  const { data: collection } = useCollectionByIdService({ id: collectionId })
  const { data: template } = useGetDownloadUrl('template/Template_nft.csv')

  // console.log('template:;', template)

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => handleSubmit(values),
  })

  React.useEffect(() => {
    if (data && data.length) {
      const object: any = {}
      let keys_from_csv: string[] = []
      let custom_keys: any = []
      let f_options: any = []

      // eslint-disable-next-line array-callback-return
      Object.keys(data[0]).map((key, index) => {
        if (key === csv_keys[index]) {
          object[field_names[index].value] = field_names[index].value
          keys_from_csv = [...keys_from_csv, field_names[index].value]
          f_options = [...f_options, { key: field_names[index].value, label: key }]
        } else {
          keys_from_csv = [...keys_from_csv, key.toLowerCase().replaceAll(' ', '_')]
          object[key.toLowerCase().replaceAll(' ', '_')] = ''
          custom_keys = [
            ...custom_keys,
            {
              label: key,
              value: key.toLowerCase().replaceAll(' ', '_'),
            },
          ]

          f_options = [
            ...f_options,
            { key: key.toLowerCase().replaceAll(' ', '_'), label: key, is_custom_field: true },
          ]
        }
      })

      const validationSchema = generateValidationSchema(keys_from_csv)

      formik.setValues(object)
      setKeys(keys_from_csv)
      setCustomFieldKeys(custom_keys)
      setValidationSchema(validationSchema)
      setFileOptions(f_options)
    }
  }, [data])

  const handleSubmit = async function (values: any) {
    const new_array = data.map((item: any) => {
      const obj: any = { custom_props: [] }

      // eslint-disable-next-line array-callback-return
      keys.map((key: any) => {
        const option: any = field_names.find((i) => i.value === key)

        obj[key] = option?.label ? item[option.label] : null

        if (key === 'price') {
          obj.price = parseFloat(item[option.label])
        }

        if (key === 'token_id') {
          obj.token_id = parseInt(item[option.label])
        }

        if (key === 'properties' && item[option.label]) {
          obj.properties = item[option.label].split(',')
        }

        if (key === 'number_of_copies') {
          obj.supply = parseInt(item[option.label])
          delete obj.number_of_copies
        }
      })

      for (const key in values) {
        if (values[key] === 'custom_field') {
          const cf = custom_field_keys.find((i: any) => i.value === key)
          obj.custom_props = [...obj.custom_props, { [key]: item[cf.label] }]
        }

        if (values[key] === 'custom_field' || values[key] === 'no_import') {
          delete obj[key]
        }
      }

      return obj
    })
    try {
      const result = await insertNftsService(
        { input: new_array, file_options },
        collection.project_id,
        collection.id,
      )

      if (result.success) {
        setSnackbar({
          message: 'Import was successful',
          variant: 'success',
        })
        setResponse(result)
      }
    } catch (error) {
      setSnackbar({ message: 'Failed to import', variant: 'error' })
    }
  }

  const { config } = columnConfig({ keys: Object.keys(data[0]) })

  const options = field_names.map((i) => ({
    ...i,
    ...(Object.values(formik.values)
      .filter((n) => n !== 'custom_field' && n !== 'no_import')
      .includes(i.value)
      ? { isDisabled: true }
      : {}),
  }))

  const handleDownloadTemplate = () => {
    window.open(template.url, '_blank')
  }

  React.useEffect(() => {
    if (!formik.isSubmitting) return
    if (Object.keys(formik.errors).length > 0) {
      setSnackbar({ message: 'Please fill out required fields!', variant: 'error' })
      // const error = document.getElementsByName(Object.keys(formik.errors)[0])[0]
      // if (error) {
      //   error.scrollIntoView()
      //   console.log(error)
      // }
    }
  }, [formik])

  return {
    columnConfig: config,
    formik,
    keys,
    options: options,
    csv_keys,
    step,
    response,
    setStep,
    handleDownloadTemplate,
  }
}

export default useReviewImport
