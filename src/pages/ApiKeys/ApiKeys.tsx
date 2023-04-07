import { useRef } from 'react'
import { useModal } from 'hooks'
import styled from 'styled-components'

import DataGrid from 'components/DataGrid'
import columnConfig from './columnConfig'

import Button from '@l3-lib/ui-core/dist/Button'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import NavigationChevronRight from '@l3-lib/ui-core/dist/icons/NavigationChevronUp'
import Add from '@l3-lib/ui-core/dist/icons/Add'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'

import useApiKeys from './useApiKeys'
import EditApiModal from './EditApiKey'
import ShowApiKeyModal from '../ApiKeys/ShowApiKey/ShowApiKeyModal'
import CreateApiModal from './CreateApiKey/CreateApiModal'

const ApiKeys = () => {
  const { apiKeys, handleEditApiKey } = useApiKeys()
  const gridRef = useRef({})

  const { openModal } = useModal()

  const openCreateAPIModal = () => {
    openModal({
      name: 'add-api-keys-modal',
    })
  }

  const config = columnConfig({ handleEditApiKey })

  return (
    <>
      <StyledContainerWrapper>
        <StyledLeftSideHeadingWrapper>
          <StyledLeftSideHeading
            type={Heading.types.h1}
            value='Standard keys'
            size='medium'
            customColor={'#FFFFFF'}
          />
        </StyledLeftSideHeadingWrapper>
        <StyledContainer>
          <StyledTypography>
            <Typography
              value='These keys will allow you to authenticate API request. '
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
              <Typography
                value=' Learn more'
                type={Typography.types.P}
                size={Typography.sizes.lg}
              />
            </Button>
          </StyledTypographyWrapper>
        </StyledContainer>
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
            ref={gridRef}
            data={apiKeys?.items || []}
            columnConfig={config}
            // groupPanel={groupPanel}

            // deleteRow={deleteRow}
            // openEditModal={openEditAssetModal}
            // noBorder={true}
          />
        </StyledGridWrapper>
      </StyledContainerWrapper>
      <CreateApiModal />
      <ShowApiKeyModal />
      <EditApiModal />
    </>
  )
}

export default ApiKeys

const StyledContainerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overscroll-behavior: none;
`

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
  position: relative;
  justify-content: flex-start;
  align-items: center;
  height: 36px;
  top: 40px;
  left: 24px;
`
export const StyledLeftSideHeading = styled(Heading)`
  line-height: 36px !important;
  font-size: 28px !important;
  color: #ffffff;
`
const StyledContainer = styled.div`
  display: flex;
  position: relative;
  margin-top: 40px;
  left: 24px;
  justify-content: center;
  width: fit-content;
  align-items: center;
  @media (max-width: 656px) {
    display: none;
  }
`
export const StyledTypography = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  height: 28px;
  color: rgba(255, 255, 255, 0.6);
`
export const StyledTypographyWrapper = styled.div`
  border-bottom: 1px solid #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95px;
  min-width: 30px;
  height: 20px;
  margin-left: 10px;
  color: #ffffff;
  @media (max-width: 420px) {
    margin-left: auto;
    margin-top: auto;
    display: flex;
    position: relative;
    top: 40px;
  }
`
export const StyledButtonWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 223px;
  height: 56px;
  float: right;
  bottom: 53px;
  right: 24px;
  @media (max-width: 926px) {
    top: 5px;
  }
`
export const StyledGridWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 40px;
  width: 100%;
  height: 900px;
  @media (max-width: 940px) {
    display: flex;
    position: relative;
    margin-top: 60px;
  }
`
