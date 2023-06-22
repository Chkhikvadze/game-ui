import { useState } from 'react'
import styled from 'styled-components'

import Search from '@l3-lib/ui-core/dist/Search'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

import PluginItem from './components/PluginItem'
import PluginList from './components/PluginList'

import contractsImg from '../assets/contracts.png'
import walletsImg from '../assets/wallets.png'
import marketsImg from '../assets/markets.png'
import reportsImg from '../assets/reports.png'
import levelsImg from '../assets/levels.png'
import assetsImg from '../assets/assets.png'
import rewardsImg from '../assets/rewards.png'
import achievementsImg from '../assets/achievements.png'
import attributesImg from '../assets/attributes.png'

const SpotlightPlugins = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <StyledRoot>
      <StyledHeader>
        <Search />
        <TabList size='small'>
          <Tab onClick={() => setActiveTab(0)}>All</Tab>
          <Tab onClick={() => setActiveTab(1)}>Web3</Tab>
          <Tab onClick={() => setActiveTab(1)}>Media</Tab>
          <Tab onClick={() => setActiveTab(1)}>Community</Tab>
        </TabList>
      </StyledHeader>

      <PluginList title={'Web3'} description={'Here are all of your games, etc and etc'}>
        <PluginItem
          image={contractsImg}
          title='Contracts'
          description='Create contracts for any language, and chain, deploy it right away. '
        />
        <PluginItem
          image={walletsImg}
          title='Wallets'
          description='Support wallets into your games, airdrop user assets and more'
        />
        <PluginItem
          image={marketsImg}
          title='Markets'
          description='Integrate and deploy on OpenSea, Rarebly, etcetc etcetc'
        />
      </PluginList>
      <PluginList title={'L3'} description={'We have created a'}>
        <PluginItem
          image={reportsImg}
          title='Reports'
          description='Support wallets into your games, airdrop user assets and more'
        />
        <PluginItem
          image={levelsImg}
          title='Levels'
          description='Support wallets into your games, airdrop user assets and more'
        />
        <PluginItem
          image={assetsImg}
          title='Assets'
          description='Support wallets into your games, airdrop user assets and more'
        />
        <PluginItem
          image={rewardsImg}
          title='Rewards'
          description='Support wallets into your games, airdrop user assets and more'
        />
        <PluginItem
          image={achievementsImg}
          title='Achievements'
          description='Support wallets into your games, airdrop user assets and more'
        />
        <PluginItem
          image={attributesImg}
          title='Attributes'
          description='Support wallets into your games, airdrop user assets and more'
        />
      </PluginList>

      <PluginList
        title={'Community'}
        description={'Check on the latest plugins built by the community'}
      >
        <PluginItem
          image={contractsImg}
          title='Unreal'
          description='Create contracts for any language, and chain, deploy it right away. '
        />
        <PluginItem
          image={walletsImg}
          title='Unity'
          description='Support wallets into your games, airdrop user assets and more'
        />
        <PluginItem
          image={marketsImg}
          title='Scenario'
          description='Integrate and deploy on OpenSea, Rarebly, etcetc etcetc'
        />
        <PluginItem
          image={contractsImg}
          title='Immutable'
          description='Create contracts for any language, and chain, deploy it right away. '
        />
      </PluginList>
    </StyledRoot>
  )
}

export default SpotlightPlugins

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 32px;
  gap: 48px;

  width: 878px;
  height: 448px;
  overflow-y: scroll;

  /* Basic foreground/black.1 */

  background: rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  backdrop-filter: blur(50px);
`
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
