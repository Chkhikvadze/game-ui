import { PROPERTY_TYPE_OPTIONS } from 'utils/constants'

import FormikTextField from 'components/TextFieldFormik'
import DropDownFormik from 'components/DropDownFormik'

const PropertyForm = () => {
  return (
    <>
      <FormikTextField name='property_name' placeholder='Name' label='Name' />

      <DropDownFormik
        options={PROPERTY_TYPE_OPTIONS}
        name='property_type'
        placeholder='Type'
        title='Type'
        kind='primary'
      />

      <FormikTextField name='property_description' placeholder='Description' label='Description' />
    </>
  )
}

export default PropertyForm
