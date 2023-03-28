import { useState } from 'react'

import { useContracts } from './useContracts'

import CreateContractModal from 'modals/CreateContractModal'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

import Add from '@l3-lib/ui-core/dist/icons/Add'

import { StyledButtonWrapper, StyledCardWrapper, StyledRoot } from 'pages/Project/Projects/Projects'
import TabHeader from 'pages/Collection/Collections/TabHeader'

import ContractCard from './ContractCard'
import { useContractsService } from 'services/useContractService'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { CHAIN_ID_TO_CONTRACT } from './Contract.utils'

const Contracts = () => {
  const { openCreateContractModal } = useContracts()
  const [searchParams, setSearchParams] = useSearchParams()

  const { projectId } = useParams()

  const { data, loading } = useContractsService({ page: 1, limit: 20, project_id: projectId })
  const [activeTab, setActiveTab] = useState(0)

  const draftItems = data?.items.filter(item => item.status === 'Draft')

  const drafts = draftItems?.length ? (
    <>
      <TabHeader heading='Draft' paragraph='Game which are saved as template' />
      <StyledCardWrapper>
        {draftItems?.map(({ id, name, chain_id }) => {
          const { title, subtitle, image } = CHAIN_ID_TO_CONTRACT[chain_id] || {}

          return (
            <ContractCard
              key={id}
              image={image}
              title={name || title}
              subtitle={subtitle}
              outline={'normal'}
              onClick={() => {
                setSearchParams({
                  contractId: id,
                })
                openCreateContractModal()
              }}
            />
          )
        })}
      </StyledCardWrapper>
    </>
  ) : null

  const liveItems = data?.items.filter(item => item.status !== 'Draft')

  const live = liveItems?.length ? (
    <>
      <TabHeader heading='Live' paragraph='Game which are successfully deployed' />
      <StyledCardWrapper>
        {liveItems?.map(({ id, chain_id }) => {
          const { title, subtitle, image } = CHAIN_ID_TO_CONTRACT[chain_id] || {}

          return (
            <ContractCard
              key={id}
              image={image}
              title={title}
              subtitle={subtitle}
              outline={'normal'}
            />
          )
        })}
      </StyledCardWrapper>
    </>
  ) : null

  return (
    <StyledRoot>
      <StyledButtonWrapper>
        <Button size={Button.sizes.MEDIUM} leftIcon={Add} onClick={openCreateContractModal}>
          <Typography value={'Create'} type={Typography.types.LABEL} size={Typography.sizes.md} />
        </Button>
      </StyledButtonWrapper>

      <TabsContext activeTabId={activeTab}>
        <TabList>
          <Tab onClick={() => setActiveTab(0)}>All</Tab>
          <Tab onClick={() => setActiveTab(1)}>Active</Tab>
          <Tab onClick={() => setActiveTab(2)}>Draft</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {live}
            {drafts}
          </TabPanel>
          <TabPanel>{live}</TabPanel>
          <TabPanel>{drafts}</TabPanel>
        </TabPanels>
      </TabsContext>

      <CreateContractModal />
    </StyledRoot>
  )
}

export default Contracts
