import { columnConfig } from './columnConfig'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useInsertNftsService } from 'services'
import React from 'react'

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

const csv_keys = ['Name *', 'Token Id', 'Price', 'Number of copies', 'Asset URL', 'Description', 'Properties']


const validationSchema = yup.object().shape({
  name: yup.string().required(`Required!`),
  token_id: yup.string().required(`Required!`),
  price: yup.string().required(`Required!`),
  number_of_copies: yup.string().required(`Required!`),
  asset_url: yup.string().required(`Required!`),
  description: yup.string().required(`Required!`),
  properties: yup.string().required(`Required!`),
  // custom_field: yup.string().required(`Required!`),
})

const generateValidationSchema = (keys: string[]) => {
  const obj: any = {}
  // keys.map((item, index) => {
  //   obj[`field_${index}`] = yup
  //     .string()
  //     .required(`Required!`)
  // })

  return yup.object().shape({
    ...obj,
  })
}


const useReviewImport = (data: any) => {
  const [keys, setKeys] = React.useState<string[]>([])
  const { insertNftsService } = useInsertNftsService()

  // const keys = Object.keys(data[0])

  // const validationSchema = generateValidationSchema(keys)

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    enableReinitialize:true,
    onSubmit: (values) => handleSubmit(values),
  })

  React.useEffect(() => {
    if(data && data.length) {
      const obj: any = {}
      let arr: string[] = []
      // console.log('bject.keys(data[0])::', Object.keys(data[0]))
      Object.keys(data[0]).map((key, index) => { 
        if(key === csv_keys[index]) {
          obj[field_names[index].value] = field_names[index].value
          arr = [...arr, field_names[index].value]
        } else {
          if(!keys.includes('custom_field')) {
            arr = [...arr, 'custom_field']
          }
        }
      })

      // console.log('obj::', obj)
      // console.log('arr::', arr)
      setKeys(arr)
      formik.setValues(obj)

    }
  }, [data])

  // console.log('keys', keys)



  

  // console.log('keys:;',    keys)
  // console.log('formik:;',    formik.values)

  const handleSubmit = async function(values: any) {

    const new_array = data.map((item: any) => {
      const obj: any = {}

      keys.map((k: any) => { 
        const l: any = field_names.find(i => i.value === k)
        obj[k] = l?.label ? item[l.label] : null 
        if(k === 'price') {
          obj.price = parseFloat(item[l.label])
        }

        delete obj.token_id
        delete obj.number_of_copies
      })
      
      return obj
    })
    
    const result = await insertNftsService(new_array, 'cd29006f-6c07-4114-acdb-29fd80f47bf9', '5def1d95-eb77-4e95-85bc-2dbe981578ac')
    
    // console.log('result:;', new_array)
    console.log('result:;', result)
  }

  const { config } = columnConfig({ keys: csv_keys, field_names })

  // const options = field_names.filter(item => !Object.values(formik.values).includes(item.value))

  const options = field_names.map(i => ({
    ...i,
    ...(Object.values(formik.values).includes(i.value) ? { isDisabled: true } : {}),
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