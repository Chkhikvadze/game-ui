import styled, { css } from 'styled-components'

import TextField from '@l3-lib/ui-core/dist/TextField'
import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

import Close from '@l3-lib/ui-core/dist/icons/Close'
import SearchOutline from '@l3-lib/ui-core/dist/icons/SearchOutline'

type ContentMenuProps = {
  title: string
  onClose: () => void
  items?: any
  formik: any
}
const ContentMenu = ({ title, onClose, items, formik }: ContentMenuProps) => {
  const { asset_properties } = formik?.values
  return (
    <StyledMenu>
      <StyledHeader>
        <Typography
          value={title}
          type={Typography.types.LABEL}
          size={Typography.sizes.md}
          customColor={'#FFF'}
        />

        <IconButton
          size={IconButton.sizes.SMALL}
          icon={Close}
          kind={IconButton.kinds.TERTIARY}
          onClick={onClose}
        />
      </StyledHeader>

      <TextField placeholder='Search' iconName={SearchOutline} />

      <StyledSearchedItems>
        {items?.map((item: any) => {
          return (
            <StyledSearchItem
              selected={asset_properties.includes(item.id)}
              key={item.id}
              onClick={() => {
                if (asset_properties.includes(item.id)) {
                  const newValues = asset_properties.replace(`${item.id}`, '')
                  formik.setFieldValue('asset_properties', newValues)
                } else if (asset_properties.length > 0) {
                  formik.setFieldValue('asset_properties', `${asset_properties}, ${item.id}`)
                } else {
                  formik.setFieldValue('asset_properties', `${item.id}`)
                }
              }}
            >
              <Avatar
                size={Avatar.sizes.SMALL}
                src={item.main_media}
                type={Avatar.types.IMG}
                rectangle
              />
              {item.name}
            </StyledSearchItem>
          )
        })}
      </StyledSearchedItems>
    </StyledMenu>
  )
}

export default ContentMenu

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 12px 8px;
  gap: 4px;

  width: 244px;
  height: 289px;

  background: rgba(0, 0, 0, 0.7);
  /* Drop shadow + blur/popover */

  box-shadow: 2px 6px 15px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 6px;
`
export const StyledHeader = styled.div`
  width: 100%;
  padding-left: 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledSearchedItems = styled.div`
  width: 100%;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
const StyledSearchItem = styled.div<{ selected: boolean }>`
  width: 100%;

  display: flex;
  align-items: center;
  color: white;

  gap: 10px;

  border-radius: 4px;

  cursor: pointer;

  padding: 4px 0px 4px 4px;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${p =>
    p.selected &&
    css`
      background-color: rgba(255, 255, 255, 0.5);
      :hover {
        background-color: rgba(255, 255, 255, 0.5);
      }
    `};
`
