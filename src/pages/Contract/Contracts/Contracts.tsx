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

import styled from 'styled-components'

import exampleImg from '../assets/exampleImg.png'
import exampleImg2 from '../assets/exampleImg2.png'
import exampleImg3 from '../assets/exampleImg3.png'

import ContractCard from './ContractCard'

const Contracts = () => {
  const { openCreateContractModal } = useContracts()

  const [activeTab, setActiveTab] = useState(0)

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
            <TabHeader heading='Live' paragraph='Game which are successfully deployed' />

            <StyledCardWrapper>
              <ContractCard
                image={exampleImg}
                title={'Poligon PoS'}
                subtitle={'Support the most widely used Ethereum scaling ecosystem...'}
                outline={'normal'}
              />
              <ContractCard
                image={exampleImg}
                title={'Poligon PoS'}
                subtitle={'Ethereum scalability, maintaining security with the first ZK-rollup...'}
                outline={'warning'}
              />
              <ContractCard
                image={exampleImg2}
                title={'Polygon zkEVM'}
                subtitle={'Ethereum scalability, maintaining security with the first ZK-rollup...'}
              />
              <ContractCard
                image={exampleImg3}
                title={'Polygon zkEVM'}
                subtitle={'Support the most widely used Ethereum scaling ecosystem...'}
              />
            </StyledCardWrapper>

            <TabHeader heading='Draft' paragraph='Game which are successfully deployed' />

            <StyledCardWrapper>
              <ContractCard
                image={exampleImg}
                title={'Poligon PoS'}
                subtitle={'Support the most widely used Ethereum scaling ecosystem...'}
                outline={'normal'}
              />
              <ContractCard
                image={exampleImg3}
                title={'Polygon zkEVM'}
                subtitle={'Support the most widely used Ethereum scaling ecosystem...'}
              />
              <ContractCard
                image={exampleImg2}
                title={'Polygon zkEVM'}
                subtitle={'Ethereum scalability, maintaining security with the first ZK-rollup...'}
              />
              <ContractCard
                image={exampleImg}
                title={'Poligon PoS'}
                subtitle={'Support the most widely used Ethereum scaling ecosystem...'}
                outline={'normal'}
              />
            </StyledCardWrapper>
          </TabPanel>

          <TabPanel>
            {<TabHeader heading='Live' paragraph='Game which are successfully deployed' />}
            <StyledCardWrapper>
              <ContractCard
                image={exampleImg}
                title={'Poligon PoS'}
                subtitle={'Support the most widely used Ethereum scaling ecosystem...'}
                outline={'normal'}
              />
              <ContractCard
                image={exampleImg}
                title={'Poligon PoS'}
                subtitle={'Ethereum scalability, maintaining security with the first ZK-rollup...'}
                outline={'warning'}
              />
              <ContractCard
                image={exampleImg2}
                title={'Polygon zkEVM'}
                subtitle={'Ethereum scalability, maintaining security with the first ZK-rollup...'}
              />
              <ContractCard
                image={exampleImg3}
                title={'Polygon zkEVM'}
                subtitle={'Support the most widely used Ethereum scaling ecosystem...'}
              />
            </StyledCardWrapper>
          </TabPanel>

          <TabPanel>
            {<TabHeader heading='Draft' paragraph='Game which are successfully deployed' />}
            <StyledCardWrapper>
              <ContractCard
                image={exampleImg}
                title={'Poligon PoS'}
                subtitle={'Support the most widely used Ethereum scaling ecosystem...'}
                outline={'normal'}
              />
              <ContractCard
                image={exampleImg3}
                title={'Polygon zkEVM'}
                subtitle={'Support the most widely used Ethereum scaling ecosystem...'}
              />
              <ContractCard
                image={exampleImg2}
                title={'Polygon zkEVM'}
                subtitle={'Ethereum scalability, maintaining security with the first ZK-rollup...'}
              />
              <ContractCard
                image={exampleImg}
                title={'Poligon PoS'}
                subtitle={'Support the most widely used Ethereum scaling ecosystem...'}
                outline={'normal'}
              />
            </StyledCardWrapper>
          </TabPanel>
        </TabPanels>
      </TabsContext>

      <CreateContractModal />
    </StyledRoot>
  )
}

export default Contracts
