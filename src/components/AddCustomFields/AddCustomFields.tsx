import { property_type_options } from 'utils/constants'

import styled from 'styled-components'
import CustomTextField from 'oldComponents/molecules/CustomTextField'
import CustomSelectField from 'oldComponents/atoms/CustomSelect/CustomSelect'
import Typography from 'oldComponents/atoms/Typography'
import { useTranslation } from 'react-i18next'

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

  const { t } = useTranslation()

  return (
    <StyledRoot>
      <Typography variant="h4">{t('custom-fields')}</Typography>
      {data?.map((item: any, index: any) => (
        <StyledHorizontalFlex key={index}>
          <CustomSelectField
            name={`${name}[${[index]}].prop_type`}
            placeholder="Type"
            // label="Type"
            options={property_type_options}
          />
          <CustomTextField name={`${name}[${[index]}].prop_name`} placeholder={'Name'} />
          <CustomTextField name={`${name}[${[index]}].prop_value`} placeholder={'Value'} />

          <button onClick={() => removeHandler(item, index)}>{t('remove')}</button>
        </StyledHorizontalFlex>
      ))}

      <button
        onClick={() =>
          formik?.setFieldValue(`${name}`, [...data, { prop_name: '', prop_value: '' }])
        }
      >
        {t('addNew')}
      </button>
    </StyledRoot>
  )
}

export default AddCustomFields

const StyledHorizontalFlex = styled.div`
  display: grid;
  grid-template-columns: 2.2fr 2fr 2fr 1fr;
  gap: 15px;
`
const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
