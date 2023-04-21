import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useContracts } from './useContracts'

import { useContractsService } from 'services/useContractService'

import CreateContractModal from 'modals/CreateContractModal'

import ContractCards from './ContractCards'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import Add from '@l3-lib/ui-core/dist/icons/Add'

import { StyleHeaderGroup, StyledInnerGroup, StyledInnerWrapper } from 'styles/globalStyle.css'

const Contracts = () => {
  const { openCreateContractModal } = useContracts()

  const [, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { projectId } = useParams()

  const { data } = useContractsService({ page: 1, limit: 100, project_id: projectId })
  const [activeTab, setActiveTab] = useState(0)

  const liveItems = data?.items.filter(item => item.status === 'Deployed')
  const draftItems = data?.items.filter(item => item.status === 'Draft')

  const live = (
    <ContractCards
      heading='Live'
      paragraph='Game which are successfully deployed'
      contracts={liveItems}
      onClick={contractId => navigate(`/game/${projectId}/contracts/${contractId}`)}
    />
  )

  const drafts = (
    <ContractCards
      heading='Draft'
      paragraph='Game which are saved as draft'
      contracts={draftItems}
      onClick={contractId => {
        setSearchParams({
          contractId,
        })
        openCreateContractModal()
      }}
    />
  )

  return (
    <>
      <StyleHeaderGroup>
        <TabList>
          <Tab onClick={() => setActiveTab(0)}>All</Tab>
          <Tab onClick={() => setActiveTab(1)}>Active</Tab>
          <Tab onClick={() => setActiveTab(2)}>Draft</Tab>
        </TabList>

        <Button size={Button.sizes.MEDIUM} leftIcon={Add} onClick={openCreateContractModal}>
          <Typography value={'Create'} type={Typography.types.LABEL} size={Typography.sizes.md} />
        </Button>
      </StyleHeaderGroup>
      <StyledInnerWrapper>
        <TabsContext activeTabId={activeTab} className='tab_pannels_container'>
          <TabPanels>
            <TabPanel>
              {live}
              {drafts}
            </TabPanel>

            <TabPanel>{live}</TabPanel>
            <TabPanel>{drafts}</TabPanel>
          </TabPanels>
        </TabsContext>
      </StyledInnerWrapper>
      <CreateContractModal />
    </>
  )
}

export default Contracts
