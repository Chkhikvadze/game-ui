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
        <StyledBox>
          <StyledLeftSideContainerWrapper>
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
                value='These keys will allow you to authenticate API request. '
                type={Typography.types.P}
                size={Typography.sizes.lg}
              />
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
            </StyledTypography>
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
          </StyledLeftSideContainerWrapper>
        </StyledBox>
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

  margin-left: auto;
  margin-top: auto;
  display: flex;
  position: relative;
  top: 35px;
  right: 70px;
  width: fit-content;
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
  // top: 40px;
  // left: 24px;
  @media (max-width: 809px) {
    margin-left: auto;
    margin-top: auto;
    display: flex;
    position: relative;
    bottom: 40px;
  }
`
export const StyledLeftSideHeading = styled(Heading)`
  line-height: 36px !important;
  font-size: 28px !important;
  color: #ffffff;
`
const StyledContainer = styled.div`
  display: flex;
  position: relative;
  -webkit-box-pack: center;
  justify-content: center;
  width: fit-content;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 85px;
  right: 167px;
`
export const StyledTypography = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  height: 28px;
  margin-top: 20px;
  color: rgba(255, 255, 255, 0.6);
  @media (max-width: 1209px) {
    margin-left: auto;
    margin-top: auto;
    display: flex;
    position: relative;
    top: 60px;
  }
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
  @media (max-width: 320px) {
    margin-left: auto;
    margin-top: auto;
    display: flex;
    position: relative;
    right: 65px;
    top: 40px;
    width: fit-content;
  }
`
export const StyledButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  -webkit-box-pack: end;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: fit-content;
  height: 56px;
  top: 23px;
  right: 24px;
  @media (max-width: 830px) {
    display: flex;
    position: fixed;
    margin-left: auto;
    top: 75px;
  }
`
export const StyledGridWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 40px;
  width: 100%;
  height: 900px;
`
const StyledBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 120px;
  margin-top: 45px;
`
const StyledLeftSideContainerWrapper = styled.div`
  width: fit-content;
  height: 100px;
`
