import React from 'react'
import styled from 'styled-components'

import { property_type_options } from 'utils/constants'

import CustomTextField from 'oldComponents/molecules/CustomTextField'
import CustomSelectField from 'oldComponents/atoms/CustomSelect/CustomSelect'
import Typography from 'oldComponents/atoms/Typography'

interface IProps {
  name: string
  fieldNum: number[]
}

const AddCustomFields = ({ name, fieldNum }: IProps) => (
  <div>
    <Typography variant="h4">Custom Fields</Typography>
    {fieldNum.map((item: number, index: number) => (
      <StyledHorizontalFlex key={index}>
        <CustomSelectField
          name={`${name}[${[index]}].prop_type`}
          placeholder="Type"
          label="Type"
          options={property_type_options}
        />
        <CustomTextField name={`${name}[${[index]}].prop_name`} label={'Name'} />
        <CustomTextField name={`${name}[${[index]}].prop_value`} label={'Value'} />
      </StyledHorizontalFlex>
    ))}
  </div>
)

export default AddCustomFields

const StyledHorizontalFlex = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
`
