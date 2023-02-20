import { useFormik } from 'formik'

const useCreateContract = () => {
  const initialValues: any = {
    blockchains: '',
    contract_type: '',
    name: '',
    token_symbol: '',
    configuration: '',
    note: '',
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {},
  })

  return { formik }
}

export default useCreateContract
