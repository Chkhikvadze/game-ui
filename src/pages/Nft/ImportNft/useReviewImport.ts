import React from 'react'
import { columnConfig } from './columnConfig'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useInsertNftsService } from 'services'
import { useNavigate, useParams } from 'react-router-dom'
import { useCollectionByIdService } from 'services/useCollectionService'

const field_names = [
  { label: 'Name *', value: 'name' },
  { label: 'Token Id', value: 'token_id' },
  { label: 'Price', value: 'price' },
  { label: 'Number of copies', value: 'number_of_copies' },
  { label: 'Asset URL', value: 'asset_url' },
  { label: 'Description', value: 'description' },
  { label: 'Properties', value: 'properties' },
  { label: 'Custom field', value: 'custom_field' },
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
  const [keys, setKeys] = React.useState<string[]>([])
  const [custom_field_keys, setCustomFieldKeys] = React.useState<any>([])
  const [validationSchema, setValidationSchema] = React.useState<any>(null)

  const navigate = useNavigate()
  const params = useParams()
  const collectionId: string = params?.collectionId!
  const { insertNftsService } = useInsertNftsService()
  const { data: collection } = useCollectionByIdService({ id: collectionId })

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

      // eslint-disable-next-line array-callback-return
      Object.keys(data[0]).map((key, index) => {
        if (key === csv_keys[index]) {
          object[field_names[index].value] = field_names[index].value
          keys_from_csv = [...keys_from_csv, field_names[index].value]
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
        }
      })

      const validationSchema = generateValidationSchema(keys_from_csv)

      formik.setValues(object)
      setKeys(keys_from_csv)
      setCustomFieldKeys(custom_keys)
      setValidationSchema(validationSchema)
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
          obj.custom_nft_props = [...obj.custom_nft_props, { [key]: item[cf.label] }]
          delete obj[key]
        }
      }

      return obj
    })

    const result = await insertNftsService(new_array, collection.project_id, collection.id)

    if (result.success) {
      navigate(-1)
    }
  }

  const { config } = columnConfig({ keys: Object.keys(data[0]) })

  const options = field_names.map((i) => ({
    ...i,
    ...(Object.values(formik.values)
      .filter((n) => n !== 'custom_field')
      .includes(i.value)
      ? { isDisabled: true }
      : {}),
  }))

  return {
    columnConfig: config,
    formik,
    keys,
    options: options,
    csv_keys,
  }
}

export default useReviewImport
