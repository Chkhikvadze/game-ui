import PluginItem from '../components/PluginItem'
import PluginList from '../components/PluginList'

import contractsImg from '../../assets/contracts.png'
import walletsImg from '../../assets/wallets.png'
import marketsImg from '../../assets/markets.png'

const CommunityPlugins = () => {
  return (
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
  )
}

export default CommunityPlugins
