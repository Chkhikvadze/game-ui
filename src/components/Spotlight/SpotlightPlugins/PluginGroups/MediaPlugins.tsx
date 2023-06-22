import PluginItem from '../components/PluginItem'
import PluginList from '../components/PluginList'

import reportsImg from '../../assets/reports.png'
import levelsImg from '../../assets/levels.png'
import assetsImg from '../../assets/assets.png'
import rewardsImg from '../../assets/rewards.png'
import achievementsImg from '../../assets/achievements.png'
import attributesImg from '../../assets/attributes.png'

const MediaPlugins = () => {
  return (
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
  )
}

export default MediaPlugins
