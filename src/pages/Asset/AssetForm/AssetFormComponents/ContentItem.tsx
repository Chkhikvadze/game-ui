import styled, { css } from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import MenuButton from '@l3-lib/ui-core/dist/MenuButton'

import Add from '@l3-lib/ui-core/dist/icons/Add'

type ContentItemProps = {
  onClick: () => void
  title: string
  subTitle?: string
  noBorder?: boolean
}

const ContentItem = ({ onClick, title, subTitle, noBorder = false }: ContentItemProps) => {
  return (
    <>
      <StyledRoot noBorder={noBorder}>
        <StyledAddButton onClick={onClick}>
          <Typography
            value={title}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
            customColor={'#FFF'}
          />
          <Add />
        </StyledAddButton>

        {subTitle && (
          <Typography
            value={subTitle}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
            customColor={'rgba(255, 255, 255, 0.6)'}
            style={{ textDecoration: 'underline' }}
          />
        )}
      </StyledRoot>
    </>
  )
}

export default ContentItem

const StyledRoot = styled.div<{ noBorder: boolean }>`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 14px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.3);

  padding-bottom: 16px;

  ${p =>
    p.noBorder &&
    css`
      border-bottom: 0px;
    `};
`

const StyledAddButton = styled.div`
  width: 100%
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
`
