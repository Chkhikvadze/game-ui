// import { FormikProvider, useField } from 'formik'
import styled from 'styled-components'

// import { CustomTable } from 'oldComponents/atoms/CustomTable'
// import { StyledButton, StyledInputContainer, StyledTextField } from './teamsStyle'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Heading from '@l3-lib/ui-core/dist/Heading'

import Button from '@l3-lib/ui-core/dist/Button'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import DataGrid from 'components/DataGrid'
import columnConfig from './columnConfig'

import SearchIcon from '@l3-lib/ui-core/dist/icons/SearchOutline'
import Description from '@l3-lib/ui-core/dist/icons/Description'

import AddMemberModal from './CreateTeamModal/CreateTeamModal'

import { StyledHeaderGroup, StyledInnerWrapper } from 'styles/globalStyle.css'
import { useRef, useState } from 'react'
import useTeams from './useTeams'
import { useTranslation } from 'react-i18next'
import { useModal } from 'hooks'
import { StyledGroupContainer } from 'routes/LayoutStyle'

// import useTeams from './useTeams'

const Teams = () => {
  const { t } = useTranslation()
  const { openCreateTeamsModal, assignedUserList, handleDeleteAccountAccess, refetch } = useTeams()

  const gridRef = useRef({})

  const config = columnConfig()
  const { openModal, closeModal } = useModal()

  const deleteRow = async (itemId: string) => {
    await handleDeleteAccountAccess(itemId)
    refetch()
  }

  const getContextMenuItems = (params: any) => {
    const itemId = params.node.data?.id

    const result = [
      ...params.defaultItems,
      {
        // custom item
        name: 'Delete',
        // disabled: true,
        action: () => {
          // console.log('params', params.node.data.id)
          // console.log('params', params)
          const deleteFunc = async () => {
            await deleteRow(itemId)
            closeModal('delete-confirmation-modal')
          }
          openModal({
            name: 'delete-confirmation-modal',
            data: {
              deleteItem: deleteFunc,
              closeModal: () => closeModal('delete-confirmation-modal'),
              label: t('are-you-sure-you-want-to-delete-this-row?'),
              title: t('delete-row'),
            },
          })
        },
      },
    ]

    return result
  }

  return (
    <>
      <StyledGroupContainer mb='20'>
        <StyledHeaderGroup>
          <StyledHeadingWrapper>
            <Heading
              type={Heading.types.h1}
              size={Heading.sizes.lg}
              value={`${assignedUserList.length} Members`}
            />
          </StyledHeadingWrapper>

          <StyledIconButtonWrapper>
            {/* <IconButton
            icon={SearchIcon}
            kind={IconButton.kinds.TERTIARY}
            size={IconButton.sizes.LARGE}
            // shape='Square'
          />

          <IconButton
            icon={Description}
            kind={IconButton.kinds.TERTIARY}
            size={IconButton.sizes.LARGE}
            // shape='Square'
          /> */}

            <Button
              kind={Button.kinds.PRIMARY}
              size={Button.sizes.LARGE}
              // leftIcon={Add}
              onClick={openCreateTeamsModal}
            >
              <StyledLabelTypography
                value='Add member'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </Button>
            {/* <MenuButton component={MenuDots}>
            <StyledButtonsWrapper>
              <StyledClickableDiv>
                <Typography
                  value={t('remove-selected')}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'rgba(250,250,250, 0.8)'}
                />
              </StyledClickableDiv>
            </StyledButtonsWrapper>
          </MenuButton> */}
          </StyledIconButtonWrapper>
        </StyledHeaderGroup>
      </StyledGroupContainer>
      {/* <StyledGridWrapper> */}
      <DataGrid
        ref={gridRef}
        data={assignedUserList || []}
        columnConfig={config}
        contextMenu={getContextMenuItems}
        headerHeight={130}
        // groupPanel={groupPanel}

        // deleteRow={deleteRow}
        // openEditModal={openEditAssetModal}
        // noBorder={true}
      />
      {/* </StyledGridWrapper> */}

      <AddMemberModal />
    </>
  )
}

export default Teams

const StyledLabelTypography = styled(Typography)`
  color: #ffffff;
`
const StyledHeadingWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  color: #ffffff;
  width: 180px;
  height: 40px;
`
const StyledIconButtonWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: auto;
  gap: 10px;
`
const StyledAddMemberPopupWrapper = styled.div`
  display: grid;
  grid-template: 'b b a' auto 'b b c' 2ch 'b b c' 1em / 20% 20px;
`
export const StyledGridWrapper = styled.div`
  // display: flex;
  // position: relative;
  // margin-top: 40px;
  // width: 100%;
  height: 1000px;
`
const StyledButtonsWrapper = styled.div`
  margin-top: 15px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 4px;

  background: rgba(0, 0, 0, 0.2);

  padding: 16px;

  box-shadow: 2px 6px 15px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);

  border-radius: 6px;
`
export const StyledClickableDiv = styled.div`
  cursor: pointer;
`

{
  /* <StyleHeaderGroup>
        <h1 style={{ color: 'white', textAlign: 'center' }}>Teams</h1>
      </StyleHeaderGroup>
      <StyledInnerWrapper>
        <FormikProvider value={formik}>
          <StyledInputContainer>
            <StyledTextField
              name='shared_email'
              placeholder='Enter email'
              label='Enter email address to share account access'
              mandatory
              useField={useField}
            />
            <StyledButton color='primary' onClick={formik.handleSubmit} disabled={!disabled}>
              Share
            </StyledButton>
          </StyledInputContainer>

          <Typography variant='h4' mt={50} mb={10} weight={600}>
            Shared list
          </Typography>

          <CustomTable
            templateColumns='1fr'
            size='14px'
            displayHeader
            columnsConfig={config}
            data={assignedUserList}
            alignItems='end'
            rowDifferentColors
            tableWidth='700px'
          />
        </FormikProvider>
      </StyledInnerWrapper> */
}
