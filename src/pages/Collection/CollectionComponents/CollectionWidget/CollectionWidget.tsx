import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'

type Size = 'small' | 'medium' | 'large' | 'x-large'

type CollectionWidgetProps = {
  size?: Size
  title?: string
  customTitle?: ReactNode
  value?: string
  customValue?: ReactNode
  fullWidth?: boolean
}

const CollectionWidget = ({
  size = 'small',
  title,
  value,
  customTitle,
  customValue,
  fullWidth = false,
}: CollectionWidgetProps) => {
  return (
    <StyledRoot size={size} fullWidth={fullWidth}>
      {customTitle ? (
        customTitle
      ) : (
        <Heading
          type={Heading.types.h1}
          value={title}
          size='medium'
          customColor={'rgba(255, 255, 255, 0.6)'}
        />
      )}
      {customValue ? (
        customValue
      ) : (
        <Heading type={Heading.types.h1} value={value} customColor={'#FFF'} />
      )}
    </StyledRoot>
  )
}

export default CollectionWidget

const StyledRoot = styled.div<{ size: Size; fullWidth: boolean }>`
  width: 156px;
  height: 120px;

  min-width: fit-content;
  min-height: fit-content;

  padding: 16px;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.1);

  box-shadow: inset 0px 1px 20px rgba(8, 8, 16, 0.1);
  border-radius: 16px;

  ${props =>
    props.size === 'medium' &&
    css`
      width: 328px;
    `}
  ${props =>
    props.size === 'large' &&
    css`
      width: 328px;
      height: 256px;
    `}
  ${props =>
    props.size === 'x-large' &&
    css`
      width: 672px;
    `}
  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`
