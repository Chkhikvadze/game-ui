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

import TabHeader from 'pages/Collection/Collections/TabHeader'

import exampleImg from '../assets/exampleImg.png'
import exampleImg2 from '../assets/exampleImg2.png'
import exampleImg3 from '../assets/exampleImg3.png'

import ContractCard from './ContractCard'
import { FLexSpaceBetween, StyledContainerWrapper, StyledInnerGroup } from 'styles/globalStyle.css'

const Contracts = () => {
  const { openCreateContractModal } = useContracts()

  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <FLexSpaceBetween>
        <TabList>
          <Tab onClick={() => setActiveTab(0)}>All</Tab>
          <Tab onClick={() => setActiveTab(1)}>Active</Tab>
          <Tab onClick={() => setActiveTab(2)}>Draft</Tab>
        </TabList>

        <Button size={Button.sizes.MEDIUM} leftIcon={Add} onClick={openCreateContractModal}>
          <Typography value={'Create'} type={Typography.types.LABEL} size={Typography.sizes.md} />
        </Button>
      </FLexSpaceBetween>

      <TabsContext activeTabId={activeTab} className='tab_pannels_container'>
        <TabPanels>
          <TabPanel>
            <>
              <TabHeader heading='Live' paragraph='Game which are successfully deployed' />
              <StyledContainerWrapper className='wrapper_card'>
                <ContractCard
                  image={exampleImg}
                  title={'Poligon PoS'}
                  subtitle={'Support the most widely used Ethereum scaling ecosystem...'}
                  outline={'normal'}
                />
                <ContractCard
                  image={exampleImg}
                  title={'Poligon PoS'}
                  subtitle={
                    'Ethereum scalability, maintaining security with the first ZK-rollup...'
                  }
                  outline={'warning'}
                />
                <ContractCard
                  image={exampleImg2}
                  title={'Polygon zkEVM'}
                  subtitle={
                    'Ethereum scalability, maintaining security with the first ZK-rollup...'
                  }
                />
                <ContractCard
                  image={exampleImg3}
                  title={'Polygon zkEVM'}
                  subtitle={'Support the most widely used Ethereum scaling ecosystem...'}
                />
              </StyledContainerWrapper>
            </>
            <StyledInnerGroup>
              <TabHeader heading='Draft' paragraph='Game which are successfully deployed' />
              <StyledContainerWrapper className='wrapper_card'>
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
                  subtitle={
                    'Ethereum scalability, maintaining security with the first ZK-rollup...'
                  }
                />
                <ContractCard
                  image={exampleImg}
                  title={'Poligon PoS'}
                  subtitle={'Support the most widely used Ethereum scaling ecosystem...'}
                  outline={'normal'}
                />
              </StyledContainerWrapper>
            </StyledInnerGroup>
          </TabPanel>

          <TabPanel>
            <TabHeader heading='Live' paragraph='Game which are successfully deployed' />
            <StyledContainerWrapper className='wrapper_card'>
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
            </StyledContainerWrapper>
          </TabPanel>

          <TabPanel>
            <TabHeader heading='Draft' paragraph='Game which are successfully deployed' />
            <StyledContainerWrapper className='wrapper_card'>
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
            </StyledContainerWrapper>
          </TabPanel>
        </TabPanels>
      </TabsContext>

      <CreateContractModal />
    </>
  )
}

export default Contracts
