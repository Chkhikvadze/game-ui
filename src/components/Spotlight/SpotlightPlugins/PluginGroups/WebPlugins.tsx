import PluginItem from '../components/PluginItem'
import PluginList from '../components/PluginList'

import contractsImg from '../../assets/contracts.png'
import walletsImg from '../../assets/wallets.png'
import marketsImg from '../../assets/markets.png'

const WebPlugins = () => {
  return (
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
  )
}

export default WebPlugins
