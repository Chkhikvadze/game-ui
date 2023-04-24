import AddCustomFields from 'components/AddCustomFields'

import Button from '@l3-lib/ui-core/dist/Button'

import { PROPERTY_TYPE_OPTIONS } from 'utils/constants'

import FormikTextField from 'components/TextFieldFormik'
import DropDownFormik from 'components/DropDownFormik'

type PropertyFormProps = {
  formik: any
  isEdit?: boolean
}

const PropertyForm = ({ formik, isEdit }: PropertyFormProps) => {
  const { custom_props } = formik?.values
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

      {/* {!isEdit &&     <div>
  <Button onClick={onButtonClick} disabled={loadingMediaUpload}>
    {loadingMediaUpload ? 'Uploading' : 'Add Medias'}
  </Button>
  <input
    type='file'
    multiple
    ref={uploadRef}
    style={{ display: 'none' }}
    onChange={e => handleUploadImages(e, 'medias')}
  />
</div>} */}

      {/* <AddCustomFields name='custom_props' formik={formik} data={custom_props || []} /> */}
    </>
  )
}

export default PropertyForm
