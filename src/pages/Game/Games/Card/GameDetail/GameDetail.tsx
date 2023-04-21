import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import styled from 'styled-components'
import {
  StyledCollectionImg,
  StyledCollectionSection,
  StyledDetailWrapper,
  StyledPlayerAvatarWrapper,
  StyledPlayerSection,
} from '../GameCardStyles'
import ScrollContainer from 'react-indiana-drag-scroll'

interface GameDetailProps {
  collections: { collectionImages: [string]; collectionCount: number }
  players: { playerImages: [string]; playerCount: number }
}

const GameDetail = ({ collections, players }: GameDetailProps) => (
  <StyledDetailWrapper>
    <StyledPlayerSection>
      <Typography
        value={players?.playerCount !== undefined && `${players.playerCount} Players`}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor='#fff'
      />
      <StyledPlayerAvatarWrapper>
        {players?.playerImages &&
          players.playerImages
            .slice(0, 4)
            .map((image: string) => (
              <StyledAvatar
                key={image}
                size={Avatar.sizes.SMALL}
                src={image}
                type={Avatar.types.IMG}
                rectangle
              />
            ))}
      </StyledPlayerAvatarWrapper>
    </StyledPlayerSection>

    <StyledCollectionSection>
      <Typography
        value={
          collections?.collectionCount !== undefined && `${collections.collectionCount} Collections`
        }
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor='#fff'
      />
      <ScrollContainer>
        <StyledCollectionScroll>
          {collections?.collectionImages &&
            collections.collectionImages.map((image: string) => (
              <StyledCollectionImg key={image} src={image} alt='' />
            ))}
        </StyledCollectionScroll>
      </ScrollContainer>
    </StyledCollectionSection>
  </StyledDetailWrapper>
)

export default GameDetail

const StyledAvatar = styled(Avatar)`
  width: 25px;
`
const StyledCollectionScroll = styled(ScrollContainer)`
  display: flex;
  gap: 6px;
`
