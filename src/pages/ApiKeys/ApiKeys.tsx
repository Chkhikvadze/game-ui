import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import columnConfig from './columnConfig'

import { useModal } from 'hooks'
import Button from '@l3-lib/ui-core/dist/Button'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import NavigationChevronRight from '@l3-lib/ui-core/dist/icons/NavigationChevronUp'
import Add from '@l3-lib/ui-core/dist/icons/Add'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'
import DataGrid from 'components/DataGrid'
import CreateApiModal from './CreateApiKey/CreateApiModal'
// import Heading from 'oldComponents/atoms/Heading'
// import { StyledButton, StyledTypography } from './ApiKeysStyle'

// import { tempData } from './tempData'
import useApiKeys from './useApiKeys'
import { useUpdateCacheThenServerAsset } from 'services'
import EditApiModal from './EditApiKey'
import ShowApiKeyModal from '../ApiKeys/ShowApiKey/ShowApiKeyModal'
// import { CustomTable } from 'oldComponents/atoms/CustomTable'

const ApiKeys = () => {
  const { apiKeys, handleEditApiKey } = useApiKeys()
  const gridRef: any = useRef({})
  const cellEditFn = useUpdateCacheThenServerAsset()
  const [groupPanel, setGroupPanel] = useState(false)

  const { openModal } = useModal()

  const openCreateAPIModal = () => {
    openModal({
      name: 'add-api-keys-modal',
    })
  }

  const config = columnConfig({ handleEditApiKey })

  return (
    <>
      <StyledRightSideHeadingWrapper>
        <StyledRightSideButtonWrapper>
          <Button
            onClick={() => window.open('https://docs.l3vels.xyz', '_blank')}
            kind={Button.kinds.TERTIARY}
            size={Button.sizes.SMALL}
          >
            <Typography
              value='Learn more about API authentication'
              type={Typography.types.P}
              size={Typography.sizes.lg}
            />
          </Button>
        </StyledRightSideButtonWrapper>
        <StyledRightSideIconButtonWrapper>
          <IconButton
            onClick={() => window.open('https://docs.l3vels.xyz', '_blank')}
            icon={NavigationChevronRight}
            kind={IconButton.kinds.TERTIARY}
            size={IconButton.sizes.SMALL}
          />
        </StyledRightSideIconButtonWrapper>
      </StyledRightSideHeadingWrapper>
      <StyledLeftSideHeadingWrapper>
        <StyledLeftSideHeading
          type={Heading.types.h1}
          value='Standard keys'
          size='medium'
          customColor={'#FFFFFF'}
        />
      </StyledLeftSideHeadingWrapper>
      <StyledTypography>
        <Typography
          value='These keys will allow you to authenticate API request.'
          type={Typography.types.P}
          size={Typography.sizes.lg}
        />
      </StyledTypography>
      <StyledTypographyWrapper>
        <Button
          onClick={() => window.open('https://docs.l3vels.xyz', '_blank')}
          kind={Button.kinds.TERTIARY}
          size={Button.sizes.SMALL}
        >
          <Typography value='Learn more' type={Typography.types.P} size={Typography.sizes.lg} />
        </Button>
      </StyledTypographyWrapper>
      <StyledButtonWrapper>
        <Button
          onClick={openCreateAPIModal}
          leftIcon={Add}
          kind={Button.kinds.PRIMARY}
          size={Button.sizes.LARGE}
        >
          Create secret key
        </Button>
      </StyledButtonWrapper>
      <StyledGridWrapper>
        <DataGrid
          ref={gridRef as any}
          data={apiKeys?.items || []}
          columnConfig={config}
          // groupPanel={groupPanel}

          // deleteRow={deleteRow}
          // openEditModal={openEditAssetModal}
          // noBorder={true}
        />
      </StyledGridWrapper>
      <CreateApiModal />
      <ShowApiKeyModal />
      <EditApiModal />

      {/* <>
<Heading title={"Api keys"}/>

<StyledButton onClick={openCreateAPIModal}>
    <StyledTypography variant="caption">Add New Key</StyledTypography>
</StyledButton>

<CustomTable
    templateColumns="1fr repeat(1, 1fr)  repeat(1,1fr)"
    size="14px"
    displayHeader
    columnsConfig={config}
    data={apiKeys?.items || []}
    alignItems="end"
    rowDifferentColors
    tableWidth={'1200px'}
/>
<CreateApiModal/>
<EditApiModal/>
</> */}
    </>
  )
}

export default ApiKeys

export const StyledRightSideHeadingWrapper = styled.div`
  display: flex;
  position: relative;
  float: right;
`
export const StyledRightSideButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ffffff;
  width: 305px;
  height: 20px;
  float: right;
  top: 42px;
  right: 90px;
`
export const StyledRightSideIconButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 6px;
  height: 12px;
  float: right;
  top: 46px;
  right: 53px;
  transform: rotate(90deg);
`
export const StyledLeftSideHeadingWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 756px;
  height: 36px;
  top: 101px;
`
export const StyledLeftSideHeading = styled(Heading)`
  line-height: 36px !important;
  font-size: 28px !important;
  color: #ffffff;
`
export const StyledTypography = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  width: 756px;
  height: 28px;
  top: 120px;
  color: rgba(255, 255, 255, 0.6);
`

export const StyledTypographyWrapper = styled.div`
  border-bottom: 1px solid #ffffff;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 95px;
  height: 20px;
  top: 96px;
  left: 448px;
  color: #ffffff;
`

export const StyledButtonWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 223px;
  height: 56px;
  float: right;
  top: 40px;
  right: 24px;
`
export const StyledGridWrapper = styled.div`
  display: flex;
  position: relative;
  top: 140px;
  width: 100%;
  min-width: 100%;
  height: 1000px;
`
