import Avatar from '@l3-lib/ui-core/dist/Avatar'
import Slider from '@l3-lib/ui-core/dist/Slider'
import { useEffect } from 'react'
import styled from 'styled-components'

type AttributeItemProps = {
  image: string
  name: string
  id: number
  min: number
  max: number
  formik: any
}

const AttributeItem = ({ image, name, min, max, formik, id }: AttributeItemProps) => {
  const attributes = formik?.values?.asset_attributes?.filter((item: any) => item.id !== id)
  const attribute = formik?.values?.asset_attributes?.filter((item: any) => item.id === id)
  console.log('attribute', attribute[0]?.id)

  // useEffect(() => {
  //   if (!attribute[0]?.value) {
  //     const newAttribute = { id: attribute[0]?.id, value: min }
  //     formik.setFieldValue('asset_attributes', [...attributes, newAttribute])
  //   }
  // }, [attribute[0]])

  return (
    <StyledAttributeItem>
      <StyledHeader>
        <StyledNameWrapper>
          <Avatar size={Avatar.sizes.SMALL} src={image} type={Avatar.types.IMG} rectangle />
          {name}
        </StyledNameWrapper>
        <div>
          {attribute[0]?.value ? attribute[0]?.value : min}/{max}
        </div>
      </StyledHeader>

      <Slider
        className='slider'
        color={Slider.colors.POSITIVE}
        defaultValue={attribute[0]?.value || min}
        min={min}
        max={max}
        onChange={(value: number) => {
          const newAttribute = { id: attribute[0]?.id, value: value }
          formik.setFieldValue('asset_attributes', [...attributes, newAttribute])
        }}
      />
    </StyledAttributeItem>
  )
}

export default AttributeItem

const StyledAttributeItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin-bottom: 14px;

  .slider {
    .l3-slider {
      &__filled-track {
        background: #73fafd;
      }
      &__thumb {
        background: #73fafd;
      }
    }
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0px 8px;
`

const StyledNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
