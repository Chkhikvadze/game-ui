import styled, { css } from 'styled-components'

import TextField from '@l3-lib/ui-core/dist/TextField'
import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

import Close from '@l3-lib/ui-core/dist/icons/Close'
import SearchOutline from '@l3-lib/ui-core/dist/icons/SearchOutline'
import MenuListItem from './MenuListItem'
import { useEffect, useState } from 'react'

type ContentMenuProps = {
  title: string
  onClose: () => void
  items?: any
  formik: any
  assetField: any
}
const ContentMenu = ({ title, onClose, items, formik, assetField }: ContentMenuProps) => {
  const [newValues, setNewValues] = useState(formik?.values?.[assetField])
  const [showApplyButton, setShowApplyButton] = useState(false)

  useEffect(() => {
    setNewValues(formik?.values?.[assetField])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik?.values?.[assetField]])

  return (
    <>
      <StyledMenu showApplyButton={showApplyButton}>
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
            onClick={() => {
              setShowApplyButton(false)
              setNewValues(formik?.values?.[assetField])
              onClose()
            }}
          />
        </StyledHeader>

        <TextField placeholder='Search' iconName={SearchOutline} />

        <StyledSearchedItems>
          {items?.map((item: any) => {
            return (
              <MenuListItem
                secondary={assetField === 'asset_properties'}
                key={item.id}
                name={item.name}
                image={item.main_media}
                selected={newValues?.includes(item.id)}
                onClick={() => {
                  // if (asset_properties.includes(item.id)) {
                  //   const newsValues = asset_properties.replace(`${item.id}`, '')
                  //   formik.setFieldValue('asset_properties', newsValues)
                  // } else if (asset_properties.length > 0) {
                  //   formik.setFieldValue('asset_properties', `${asset_properties}, ${item.id}`)
                  // } else {
                  //   formik.setFieldValue('asset_properties', `${item.id}`)
                  // }
                  if (newValues.includes(item.id)) {
                    setNewValues(newValues.replace(`${item.id}`, ''))
                  } else {
                    setNewValues(`${newValues},${item.id}`)
                  }
                  setShowApplyButton(true)
                }}
              />
            )
          })}
        </StyledSearchedItems>
      </StyledMenu>
      <StyledFooter showApplyButton={showApplyButton}>
        <StyledFooterButton
          onClick={async () => {
            await formik.setFieldValue(assetField, newValues)
            // setNewValues(asset_properties)
            onClose()
            setShowApplyButton(false)
          }}
        >
          <Typography
            value={'Apply'}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
        </StyledFooterButton>
      </StyledFooter>
    </>
  )
}

export default ContentMenu

const StyledMenu = styled.div<{ showApplyButton: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 12px 8px;
  gap: 4px;

  background: rgba(0, 0, 0, 0.7);
  /* Drop shadow + blur/popover */

  box-shadow: 2px 6px 15px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 6px 6px 0px 0px;

  width: 244px;
  height: 318px;
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
const StyledFooter = styled.div<{ showApplyButton: boolean }>`
  width: 100%;

  padding: 8px;
  padding-top: 0px;

  display: flex;

  background: rgba(0, 0, 0, 0.7);

  box-shadow: 2px 6px 15px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);

  border-radius: 0px 0px 6px 6px;

  opacity: 0;

  max-height: 0px;
  transition: opacity 0.3s, max-height 0.3s;
  ${p =>
    p.showApplyButton &&
    css`
      opacity: 1;
      max-height: 100px;
    `};
`
const StyledFooterButton = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  cursor: pointer;
  height: fit-content;

  padding: 8px;
  padding-top: 12px;
  display: flex;
  justify-content: flex-end;
`
