import React, { useRef } from 'react'
import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Heading from '@l3-lib/ui-core/dist/Heading'

import Add from '@l3-lib/ui-core/dist/icons/Add'

import Button from '@l3-lib/ui-core/dist/Button'
import DataGrid from 'components/DataGrid'

import columnConfig from './columnConfig'
import { data } from '../Webhook/webhookDta/Webhookdata'
import { useWebhook } from './useWebhook'
import CreateWebhookModal from './createWebhookModal'

const Webhook = () => {
  const gridRef = useRef({})

  const config = columnConfig()

  const { openCreateWebhookModal, webhooks } = useWebhook()

  return (
    <>
      <StyledContainer>
        <StyledHeadingWrapper>
          <Heading type={Heading.types.h1} size={Heading.sizes.sm} value='Webhooks' />
        </StyledHeadingWrapper>
        <StyledTertiaryButtonWrapper>
          <Button kind={Button.kinds.TERTIARY} size={Button.sizes.LARGE}>
            <StyledLabelTypography
              value='Import test endpoint > 1'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
            />
          </Button>
        </StyledTertiaryButtonWrapper>
        <StyledPrimaryButtonWrapper>
          <Button
            kind={Button.kinds.PRIMARY}
            size={Button.sizes.LARGE}
            leftIcon={Add}
            onClick={openCreateWebhookModal}
          >
            <StyledLabelTypography
              value='Add endpoint'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
            />
          </Button>
        </StyledPrimaryButtonWrapper>
        <StyledGridWrapper>
          <DataGrid
            ref={gridRef}
            data={webhooks?.items || []}
            columnConfig={config}
            // groupPanel={groupPanel}

            // deleteRow={deleteRow}
            // openEditModal={openEditAssetModal}
            // noBorder={true}
          />
        </StyledGridWrapper>
        <CreateWebhookModal />
      </StyledContainer>
    </>
  )
}

export default Webhook

const StyledContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const StyledHeadingWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 530px;
  height: 32px;
  justify-content: flex-start;
  align-items: center;
  color: #ffffff;
  top: 65px;
`
const StyledTertiaryButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  float: right;
  right: 320px;
  top: 65px;
  @media (max-width: 1117px) {
    top: 115px;
  }
`
const StyledLabelTypography = styled(Typography)`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
`
const StyledPrimaryButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  float: right;
  justify-content: center;
  align-items: center;
  width: 195px;
  height: 56px;
  right: 40px;
  top: 65px;
  @media (max-width: 1117px) {
    top: 115px;
  }
`
const StyledGridWrapper = styled.div`
  display: flex;
  position: relative;
  top: 160px;
  width: 100%;
  min-width: 100%;
  height: 1000px;
`
