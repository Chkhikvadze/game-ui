import { PROPERTY_TYPE_OPTIONS } from 'utils/constants'

import styled from 'styled-components'
import Icon from '@l3-lib/ui-core/dist/Icon'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Button from '@l3-lib/ui-core/dist/Button'
import { useTranslation } from 'react-i18next'

import Delete from '@l3-lib/ui-core/dist/icons/Delete'
import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'

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
      <div>
        <Button
          onClick={() =>
            formik?.setFieldValue(`${name}`, [...data, { prop_name: '', prop_value: '' }])
          }
        >
          <span> + Add custom field</span>
        </Button>
      </div>
      {data?.map((item: any, index: any) => (
        <StyledHorizontalFlex key={index}>
          <Dropdown
            name={`${name}[${[index]}].prop_type`}
            // size={Dropdown.size.SMALL}
            // className='dropdown-stories-styles_spacing'
            options={PROPERTY_TYPE_OPTIONS}
          />
          {/* 
          <Dropdown
            placeholder='Type'
            // label="Type"
          /> */}
          <FormikTextField
            size='small'
            field_name={`${name}[${[index]}].prop_name`}
            placeholder={'Name'}
          />
          <FormikTextField
            size='small'
            field_name={`${name}[${[index]}].prop_value`}
            placeholder={'Value'}
          />
          <StyledIconButton>
            <Icon icon={Delete} iconSize={23} onClick={() => removeHandler(item, index)} />
          </StyledIconButton>
        </StyledHorizontalFlex>
      ))}
    </StyledRoot>
  )
}

export default AddCustomFields

const StyledHorizontalFlex = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr auto;
  gap: 15px;
`
const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const StyledButton = styled.button`
  width: fit-content;
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
  }
`

const StyledIconButton = styled.div`
  justify-self: center;
  align-self: center;
  svg {
    color: #ffffff;
  }
`
