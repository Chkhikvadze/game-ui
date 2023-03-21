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

import Eth from 'assets/icons/eth.svg'

import { StyledButtonWrapper, StyledCardWrapper, StyledRoot } from 'pages/Project/Projects/Projects'
import TabHeader from 'pages/Collection/Collections/TabHeader'
import ProjectCard from 'pages/Project/Projects/Card/ProjectCard'

import CollectionFooter from 'pages/Project/Projects/Card/CardFooter/CollectionFooter'
import styled from 'styled-components'

import exampleImg from '../assets/exampleImg.png'
import exampleImg2 from '../assets/exampleImg2.png'

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
              <ProjectCard
                hideButton={true}
                outline={'normal'}
                itemInfo={{
                  title: 'Poligon PoS',
                  subTitle: 'undefined',
                  image: exampleImg,
                }}
                cardFooter={
                  <CollectionFooter
                    title={'Poligon PoS'}
                    subTitle={'Support the most widely used Ethereum scaling ecosystem...'}
                  />
                }
                topLeftIcon={
                  <StyledChainWrapper>
                    <img src={Eth} alt='' />
                    <Typography
                      value='Testnet'
                      type={Typography.types.LABEL}
                      size={Typography.sizes.xss}
                    />
                  </StyledChainWrapper>
                }
              />
              <ProjectCard
                hideButton={true}
                outline={'warning'}
                itemInfo={{
                  title: 'Poligon PoS',
                  subTitle: 'undefined',
                  image: exampleImg,
                }}
                cardFooter={
                  <CollectionFooter
                    title={'Poligon PoS'}
                    subTitle={
                      'Ethereum scalability, maintaining security with the first ZK-rollup...'
                    }
                  />
                }
                topLeftIcon={
                  <StyledChainWrapper>
                    <img src={Eth} alt='' />
                    <Typography
                      value='Testnet'
                      type={Typography.types.LABEL}
                      size={Typography.sizes.xss}
                    />
                  </StyledChainWrapper>
                }
              />
              <ProjectCard
                hideButton={true}
                itemInfo={{
                  title: 'Poligon PoS',
                  subTitle: 'undefined',
                  image: exampleImg2,
                }}
                cardFooter={
                  <CollectionFooter
                    title={'Polygon zkEVM'}
                    subTitle={
                      'Ethereum scalability, maintaining security with the first ZK-rollup...'
                    }
                  />
                }
                topLeftIcon={
                  <StyledChainWrapper>
                    <img src={Eth} alt='' />
                    <Typography
                      value='Testnet'
                      type={Typography.types.LABEL}
                      size={Typography.sizes.xss}
                    />
                  </StyledChainWrapper>
                }
              />
            </StyledCardWrapper>

            <TabHeader heading='Draft' paragraph='Game which are successfully deployed' />

            <StyledCardWrapper></StyledCardWrapper>
          </TabPanel>

          <TabPanel>
            {<TabHeader heading='Live' paragraph='Game which are successfully deployed' />}
            <StyledCardWrapper></StyledCardWrapper>
          </TabPanel>

          <TabPanel>
            {<TabHeader heading='Draft' paragraph='Game which are successfully deployed' />}
            <StyledCardWrapper></StyledCardWrapper>
          </TabPanel>
        </TabPanels>
      </TabsContext>

      <CreateContractModal />
    </StyledRoot>
  )
}

export default Contracts

const StyledChainWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;

  align-items: center;
`
