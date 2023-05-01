import styled, { css } from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Add from '@l3-lib/ui-core/dist/icons/Add'

import { useCollectionByIdService } from 'services/useCollectionService'

import Eth from 'assets/icons/eth.svg'
import polygonIcon from 'assets/icons/polygonIcon.png'

type ContractMiniCardProps = {
  name?: string
  collectionId?: any
  isEmpty?: boolean
  onClick?: () => void
  chain?: string
}

const ContractMiniCard = ({
  name,
  collectionId,
  isEmpty,
  onClick,
  chain,
}: ContractMiniCardProps) => {
  const { data: collection } = useCollectionByIdService({
    id: collectionId,
  })

  let chainIcon = ''
  if (chain === 'Ethereum') {
    chainIcon = Eth
  } else if (chain === 'Polygon') {
    chainIcon = polygonIcon
  }

  let cardBg = ''
  if (chain === 'Ethereum') {
    cardBg =
      'https://c4.wallpaperflare.com/wallpaper/909/214/342/ethereum-logo-minimalism-wallpaper-preview.jpg'
  } else if (chain === 'Polygon') {
    cardBg = 'https://www.securities.io/wp-content/uploads/2023/01/Polygon-Featured.jpg'
  }

  return (
    <StyledRoot onClick={collectionId && onClick} clickable={collectionId} bgImg={cardBg}>
      {isEmpty ? (
        <StyledWrapper>
          <StyledButton onClick={onClick}>
            <Add />
          </StyledButton>
          <Typography
            value={'Create Contract'}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
            customColor={'#FFF'}
          />
        </StyledWrapper>
      ) : (
        <>
          {chain && (
            <StyledChainWrapper>
              <img src={chainIcon} alt='' />
              <StyledTextWrapper className='showMe'>
                <Typography
                  value={chain}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                  customColor={'#FFF'}
                />
              </StyledTextWrapper>
            </StyledChainWrapper>
          )}
          {!collectionId ? (
            <StyledWrapper>
              <StyledAddButton onClick={onClick}>
                <Add />
              </StyledAddButton>
              <Typography
                value='Link Collection'
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
                customColor={'#FFF'}
              />
            </StyledWrapper>
          ) : (
            <StyledWrapper>
              <StyledImg
                src={
                  collection?.main_media ||
                  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png'
                }
              />
              <StyledTextWrapper>
                <Typography
                  value={`Linked to`}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                  customColor={'#FFF'}
                />

                <Typography
                  value={`${collection?.name}`}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                  customColor={'#FFF'}
                  style={{ textDecoration: 'underline' }}
                />
              </StyledTextWrapper>
            </StyledWrapper>
          )}

          <Typography
            value={name}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
            customColor={'#FFF'}
          />
        </>
      )}
    </StyledRoot>
  )
}

export default ContractMiniCard

const StyledRoot = styled.div<{ clickable: boolean; bgImg: string }>`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 16px 8px;

  gap: 8px;

  width: 260px;
  height: 158px;

  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.4) 100%);
  backdrop-filter: blur(8px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 16px;

  background-image: ${p =>
    p.bgImg &&
    `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%), url(${p.bgImg})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  ${p =>
    p.clickable &&
    css`
      cursor: pointer;
    `};
`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 4px;
`

const StyledAddButton = styled.div`
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
`
const StyledButton = styled.div`
  margin-top: 30px;

  cursor: pointer;
`
const StyledImg = styled.img`
  border-radius: 6px;
  width: 48px;
  height: 48px;
`
const StyledTextWrapper = styled.div`
  display: flex;
  gap: 4px;

  align-items: center;
`
const StyledChainWrapper = styled.div`
  position: absolute;
  left: 12px;
  top: 14px;

  height: 30px;
  min-height: 30px;

  overflow: hidden;
  display: flex;
  gap: 12px;
  /* margin-bottom: 5px; */
  padding: 10px;
  border-radius: 100px;
  align-items: center;

  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(1px);

  max-width: 30px;
  transition: max-width 0.3s;
  &:hover {
    max-width: 100px;

    .showMe {
      opacity: 1;
    }
  }
`
