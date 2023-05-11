import styled, { css } from 'styled-components'

import Avatar from '@l3-lib/ui-core/dist/Avatar'

type MenuListItemProps = {
  selected: boolean
  onClick?: () => void
  image: string
  name: string
  secondary?: boolean
}

const MenuListItem = ({ selected = false, onClick, image, name, secondary }: MenuListItemProps) => {
  return (
    <StyledSearchItem selected={selected} onClick={onClick}>
      {secondary ? (
        <StyledImageWrapper>
          {image?.length > 0 && <StyledImage src={image} alt='' />}
        </StyledImageWrapper>
      ) : (
        <Avatar size={Avatar.sizes.SMALL} src={image} type={Avatar.types.IMG} rectangle />
      )}
      {name}
    </StyledSearchItem>
  )
}

export default MenuListItem

const StyledSearchItem = styled.div<{ selected: boolean }>`
  width: 100%;

  display: flex;
  align-items: center;
  color: white;

  gap: 10px;

  border-radius: 6px;

  cursor: pointer;

  padding: 6px 8px;

  ${p =>
    p.selected &&
    css`
      background-color: rgba(255, 255, 255, 0.5);
      :hover {
        background-color: rgba(255, 255, 255, 0.5);
      }
    `};
`
const StyledImageWrapper = styled.div`
  width: 28px;
  height: 28px;

  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
`
const StyledImage = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 2px;
`
