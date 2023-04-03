import { ReactNode } from 'react'
import styled, { css } from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'

type CollectionWidgetProps = {
  size?: string
  title?: string
  customTitle?: ReactNode
  value: string
}

const CollectionWidget = ({ size = 'small', title, value, customTitle }: CollectionWidgetProps) => {
  return (
    <StyledRoot size={size}>
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
      <Heading type={Heading.types.h1} value={value} />
    </StyledRoot>
  )
}

export default CollectionWidget

const StyledRoot = styled.div<{ size: string }>`
  width: 156px;
  height: 120px;

  padding: 16px;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: rgba(255, 255, 255, 0.1);

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
`
