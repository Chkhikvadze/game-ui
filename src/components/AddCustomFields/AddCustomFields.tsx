import { property_type_options } from 'utils/constants'

import styled from 'styled-components'
import CustomTextField from 'oldComponents/molecules/CustomTextField'
import CustomSelectField from 'oldComponents/atoms/CustomSelect/CustomSelect'
import Typography from 'oldComponents/atoms/Typography'

interface IProps {
  name: string
  formik?: any
  data?: any
  fieldNum?: any
}

const AddCustomFields = ({ name, formik, data }: IProps) => {
  const removeHandler = async (item: any, index: any) => {
    await formik.setFieldValue(
      `${name}`,
      data.filter((item: any, index2: any) => index2 !== index),
    )
  }

  return (
    <div>
      <Typography variant="h4">Custom Fields</Typography>
      {data?.map((item: any, index: any) => (
        <StyledHorizontalFlex key={index}>
          <CustomSelectField
            name={`${name}[${[index]}].prop_type`}
            placeholder="Type"
            label="Type"
            options={property_type_options}
          />
          <CustomTextField name={`${name}[${[index]}].prop_name`} label={'Name'} />
          <CustomTextField name={`${name}[${[index]}].prop_value`} label={'Value'} />

          <button onClick={() => removeHandler(item, index)}>remove</button>
        </StyledHorizontalFlex>
      ))}

      <button
        onClick={() =>
          formik?.setFieldValue(`${name}`, [...data, { prop_name: '', prop_value: '' }])
        }
      >
        Add New
      </button>
    </div>
  )
}

export default AddCustomFields

const StyledHorizontalFlex = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px;
`
