import { useState } from 'react'
import styled, { css } from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Tags from '@l3-lib/ui-core/dist/Tags'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import IconButton from '@l3-lib/ui-core/dist/IconButton'

import Add from '@l3-lib/ui-core/dist/icons/Add'
import StarOutline from '@l3-lib/ui-core/dist/icons/StarOutline'
import Close from '@l3-lib/ui-core/dist/icons/Close'

import attr1 from 'assets/avatars/attr1.png'
import attr2 from 'assets/avatars/attr2.png'
import attr3 from 'assets/avatars/attr3.png'

import icon1 from './assets/icon1.png'
import icon2 from './assets/icon2.png'
import icon3 from './assets/icon3.png'
import icon4 from './assets/icon4.png'

import achive1 from 'assets/avatars/achive1.png'
import achive2 from 'assets/avatars/achive2.png'

type AssetCardProps = {
  title: string
  medias: string[]
}

const AssetCard = ({ title, medias }: AssetCardProps) => {
  const [activeDetails, setActiveDetails] = useState('')

  const handleActive = (value: string) => {
    if (activeDetails !== value) {
      setActiveDetails(value)
    } else {
      setActiveDetails('')
    }
  }

  const [bgImage, setBgImage] = useState(medias[0])

  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleDotClick = (index: number) => {
    if (index !== selectedIndex) {
      setSelectedIndex(index)
    }
  }

  const limitedDotData = medias.slice(0, 4)

  return (
    <StyledRoot>
      <StyledActions>
        <StyledHeader>
          <StyledHeaderCenter>
            <Typography
              value={title}
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
              customColor={'#FFF'}
            />
            <StyledTag
              label='Legendary'
              size='small'
              outlined
              readOnly
              color={'gradient_blue'}
              leftIcon={StarOutline}
            />
          </StyledHeaderCenter>

          <StyledHeaderRight>
            <Typography
              value='0,96'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor={'#FFF'}
            />
          </StyledHeaderRight>
        </StyledHeader>

        {activeDetails.length === 0 && (
          <StyledAttributesWrapper>
            <StyledAvatar size={Avatar.sizes.SMALL} src={attr1} type={Avatar.types.IMG} rectangle />
            <StyledAvatar size={Avatar.sizes.SMALL} src={attr2} type={Avatar.types.IMG} rectangle />
            <StyledAvatar size={Avatar.sizes.SMALL} src={attr3} type={Avatar.types.IMG} rectangle />
            <IconButton
              size={IconButton.sizes.SMALL}
              icon={Add}
              kind={IconButton.kinds.TERTIARY}
              ariaLabel='Add'
            />
          </StyledAttributesWrapper>
        )}

        <StyledDetailsContainer showDetails={activeDetails.length > 0}>
          {activeDetails.length > 0 && (
            <StyledDetails>
              <StyledDetailsHeader>
                <Typography
                  value={activeDetails}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.lg}
                  customColor={'#FFF'}
                />
                <IconButton
                  size={IconButton.sizes.XXS}
                  icon={Close}
                  kind={IconButton.kinds.TERTIARY}
                  onClick={() => setActiveDetails('')}
                />
              </StyledDetailsHeader>

              {activeDetails === 'Achievement' && (
                <StyledDetailsContent>
                  <StyledAchievementContainer>
                    <Avatar
                      size={Avatar.sizes.SMALL}
                      src={achive1}
                      type={Avatar.types.IMG}
                      rectangle
                    />
                    <Typography
                      value='A successful alliance'
                      type={Typography.types.LABEL}
                      size={Typography.sizes.xss}
                      customColor={'#FFF'}
                    />
                  </StyledAchievementContainer>
                  <StyledAchievementContainer>
                    <Avatar
                      size={Avatar.sizes.SMALL}
                      src={achive2}
                      type={Avatar.types.IMG}
                      rectangle
                    />
                    <Typography
                      value='Intermediate artillery ace'
                      type={Typography.types.LABEL}
                      size={Typography.sizes.xss}
                      customColor={'#FFF'}
                    />
                  </StyledAchievementContainer>
                  <StyledAchievementContainer>
                    <Avatar
                      size={Avatar.sizes.SMALL}
                      src={achive2}
                      type={Avatar.types.IMG}
                      rectangle
                    />
                    <Typography
                      value='A successful round '
                      type={Typography.types.LABEL}
                      size={Typography.sizes.xss}
                      customColor={'#FFF'}
                    />
                  </StyledAchievementContainer>
                  <StyledAchievementContainer>
                    <Avatar
                      size={Avatar.sizes.SMALL}
                      src={achive2}
                      type={Avatar.types.IMG}
                      rectangle
                    />
                    <Typography
                      value='Treasure founder'
                      type={Typography.types.LABEL}
                      size={Typography.sizes.xss}
                      customColor={'#FFF'}
                    />
                  </StyledAchievementContainer>
                </StyledDetailsContent>
              )}
              {activeDetails === 'Styles' && <StyledDetailsContent>2</StyledDetailsContent>}
              {activeDetails === 'Relations' && <StyledDetailsContent>3</StyledDetailsContent>}
              {activeDetails === 'Attributes' && <StyledDetailsContent>4</StyledDetailsContent>}
            </StyledDetails>
          )}

          <StyledFooter showDetails={activeDetails.length > 0}>
            <StyledButton
              active={activeDetails === 'Achievement'}
              onClick={() => {
                handleActive('Achievement')
              }}
            >
              <img src={icon1} alt='' />
            </StyledButton>
            <StyledButton
              active={activeDetails === 'Styles'}
              onClick={() => {
                handleActive('Styles')
              }}
            >
              <img src={icon3} alt='' />
            </StyledButton>
            <StyledButton
              active={activeDetails === 'Relations'}
              onClick={() => {
                handleActive('Relations')
              }}
            >
              <img src={icon2} alt='' />
            </StyledButton>

            <StyledButton
              active={activeDetails === 'Attributes'}
              onClick={() => {
                handleActive('Attributes')
              }}
            >
              <img src={icon4} alt='' />
            </StyledButton>
          </StyledFooter>
        </StyledDetailsContainer>
      </StyledActions>

      {medias?.length > 1 && (
        <StyledPaginationWrapper>
          {limitedDotData.map((media, index) => {
            const isClickable = index === selectedIndex - 1 || index === selectedIndex + 1
            const isSelected = index === selectedIndex
            return (
              <StyledDot
                key={index}
                selected={isSelected}
                clickable={isClickable}
                onClick={() => {
                  setBgImage(media)
                  handleDotClick(index)
                }}
              />
            )
          })}
        </StyledPaginationWrapper>
      )}

      <StyledImg src={bgImage} alt='' />
    </StyledRoot>
  )
}

export default AssetCard

const StyledRoot = styled.div`
  position: relative;

  width: 266px;
  min-width: 266px;
  height: 300px;

  border-radius: 16px;
`
const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`
const StyledActions = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  justify-content: flex-end;
`
const StyledDetailsContainer = styled.div<{ showDetails: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  /* padding: 6px 19px; */
  /* gap: 6px; */

  background: rgba(0, 0, 0, 0.2);
  box-shadow: 16px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);

  width: 100%;
  min-height: fit-content;
  border-radius: 0 0 16px 16px;

  ${p =>
    p.showDetails &&
    css`
      height: 100%;
      position: absolute;
      border-radius: 16px;
    `};
`
const StyledFooter = styled.div<{ showDetails: boolean }>`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;

  padding: 6px 19px;

  min-height: 42px;
  height: 42px;
  width: 100%;
  border-top: 2px solid transparent;

  ${p =>
    p.showDetails &&
    css`
      border-top-color: rgba(255, 255, 255, 0.2);
    `};
`

const StyledHeader = styled.div`
  position: relative;
  width: 100%;

  margin-bottom: auto;

  display: flex;
  justify-content: center;
  /* align-items: flex-start; */

  padding-top: 12px;
`
const StyledHeaderCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledTag = styled(Tags)`
  backdrop-filter: blur(8px);
`
const StyledAttributesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  align-items: flex-end;

  margin-right: 10px;
`
const StyledAvatar = styled(Avatar)`
  margin-right: 5px;
`
const StyledHeaderRight = styled.div`
  position: absolute;
  right: 3%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px;

  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0px 1.48148px 4.44444px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(74.0741px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 4.44444px;
`
const StyledButton = styled.div<{ active: boolean }>`
  width: 32px;
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 4px;

  cursor: pointer;

  ${p =>
    p.active &&
    css`
      background: rgba(0, 0, 0, 0.5);
    `};
`

const StyledDetails = styled.div`
  height: 100%;
  width: 100%;

  padding: 13px 19px;
`

const StyledDetailsHeader = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  justify-content: space-between;
`
const StyledDetailsContent = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledAchievementContainer = styled.div`
  display: flex;
  width: 100%;

  align-items: center;
  gap: 10px;

  margin-top: 13px;
`
const StyledPaginationWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;

  width: 100%;

  bottom: 50px;
  /* left: 45%; */
`

const StyledDot = styled.div<{ selected: boolean; clickable: boolean }>`
  border-radius: 100px;

  width: 4px;
  height: 4px;
  background: #ffffff;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.2);
  opacity: 0.6;

  ${props =>
    props.selected &&
    css`
      width: 8px;
      height: 8px;
      opacity: 1;
    `}
  ${props =>
    props.clickable &&
    css`
      width: 6px;
      height: 6px;

      background: #ffffff;
      opacity: 0.8;

      cursor: pointer;
    `}
`
