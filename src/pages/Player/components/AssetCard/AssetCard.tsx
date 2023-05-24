import { useState } from 'react'
import styled, { css } from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Tags from '@l3-lib/ui-core/dist/Tags'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Badge from '@l3-lib/ui-core/dist/Badge'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

import StarOutline from '@l3-lib/ui-core/dist/icons/StarOutline'
import NavigationChevronUp from '@l3-lib/ui-core/dist/icons/NavigationChevronUp'
import NavigationChevronDown from '@l3-lib/ui-core/dist/icons/NavigationChevronDown'
import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import Points from '@l3-lib/ui-core/dist/icons/Points'
import Bolt from '@l3-lib/ui-core/dist/icons/Bolt'
import WhatsNew from '@l3-lib/ui-core/dist/icons/WhatsNew'

import polygonIcon from 'assets/icons/polygonIcon.png'
import doneIcon from './assets/done.png'

type AssetCardProps = {
  title: string
  medias: string[]
  story: string
  supply: number
  attributes: any
  achievements: any
  rewards: any
  status: string
  mintedAmount: number
  price: number
}

const AssetCard = ({
  title,
  medias,
  story,
  supply,
  attributes,
  status,
  achievements,
  rewards,
  mintedAmount,
  price,
}: AssetCardProps) => {
  const [showDetails, setShowDetails] = useState(false)

  const [bgImage, setBgImage] = useState(medias[0])

  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleDotClick = (index: number, media: string) => {
    setBgImage(media)
    setSelectedIndex(index)
  }

  const limitedDotData = medias?.slice(0, 4)
  const limitedMedias = medias?.slice(0, 2)
  const limitedAttributes = attributes?.slice(0, 4)

  const [activeTab, setActiveTab] = useState(0)

  return (
    <StyledRoot>
      <StyledActions>
        {!showDetails && (
          <>
            <StyledHeader>
              <StyledHeaderItem left>
                {mintedAmount && <img src={doneIcon} alt='' />}
                <Typography
                  value={mintedAmount || '-'}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.sm}
                  customColor={'#FFF'}
                />
              </StyledHeaderItem>
              <StyledHeaderItem right>
                {price && <img src={polygonIcon} alt='' />}
                <Typography
                  value={price || '-'}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.sm}
                  customColor={'#FFF'}
                />
              </StyledHeaderItem>
            </StyledHeader>

            <StyledAttributesWrapper>
              {limitedAttributes?.map((attribute: any) => {
                return (
                  <StyledAvatar
                    key={attribute?.media}
                    size={Avatar.sizes.SMALL}
                    src={attribute?.media}
                    type={Avatar.types.IMG}
                    rectangle
                  />
                )
              })}
            </StyledAttributesWrapper>

            <StyledTitle>
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
            </StyledTitle>
          </>
        )}

        <StyledActionButton>
          <IconButton
            size={IconButton.sizes.SMALL}
            kind={IconButton.kinds.TERTIARY}
            icon={showDetails ? NavigationChevronUp : NavigationChevronDown}
            onClick={() => setShowDetails(!showDetails)}
          />
        </StyledActionButton>

        <StyledDetailsContainer showDetails={showDetails}>
          <StyledDetailsHeader>
            <Typography
              value={title}
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
              customColor={'#FFF'}
            />
            <StyledBadgeWrapper>
              <Badge isDot={true} dot='positive' />
              <Typography
                value={status}
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
                customColor={'rgba(255, 255, 255, 0.8)'}
              />
            </StyledBadgeWrapper>

            <StyledTabList size='small'>
              <StyledTab onClick={() => setActiveTab(0)} className='tab'>
                <TextType />
              </StyledTab>
              <StyledTab onClick={() => setActiveTab(1)} className='tab'>
                <StyledIconWrapper>
                  <Points />
                </StyledIconWrapper>
              </StyledTab>
              <StyledTab onClick={() => setActiveTab(2)} className='tab'>
                <StyledIconWrapperSecondary>
                  <Bolt />
                </StyledIconWrapperSecondary>
              </StyledTab>
              <StyledTab onClick={() => setActiveTab(3)} className='tab'>
                <StyledIconWrapperSecondary>
                  <WhatsNew />
                </StyledIconWrapperSecondary>
              </StyledTab>
            </StyledTabList>

            <StyledTabsContext activeTabId={activeTab}>
              <StyledTabPanels>
                <StyledTabPanel>
                  <StyledInTabContainer>
                    <StyledVariantsWrapper>
                      <Typography
                        value='Variants'
                        type={Typography.types.LABEL}
                        size={Typography.sizes.xss}
                        customColor={'#FFF'}
                      />
                      <StyledMediasWrapper>
                        {limitedMedias?.map((url: string) => {
                          return <StyledMedia src={url} key={url} />
                        })}

                        {medias?.length > 2 && (
                          <StyledHiddenMedias>
                            <Typography
                              value={`+${medias?.length - 2}`}
                              type={Typography.types.LABEL}
                              size={Typography.sizes.xss}
                              customColor={'#FFF'}
                            />
                          </StyledHiddenMedias>
                        )}
                      </StyledMediasWrapper>
                    </StyledVariantsWrapper>

                    <StyledVariantsWrapper>
                      <Typography
                        value='Supply'
                        type={Typography.types.LABEL}
                        size={Typography.sizes.xss}
                        customColor={'#FFF'}
                      />
                      <Typography
                        value={supply || '-'}
                        type={Typography.types.LABEL}
                        size={Typography.sizes.xss}
                        customColor={'rgba(255, 255, 255, 0.8)'}
                      />
                    </StyledVariantsWrapper>

                    <StyledStoryWrapper>
                      <Typography
                        value='Story'
                        type={Typography.types.LABEL}
                        size={Typography.sizes.xss}
                        customColor={'#FFF'}
                      />
                      <Typography
                        value={story || '-'}
                        type={Typography.types.LABEL}
                        size={Typography.sizes.xss}
                        customColor={'rgba(255, 255, 255, 0.8)'}
                      />
                    </StyledStoryWrapper>
                  </StyledInTabContainer>
                </StyledTabPanel>

                <TabPanel>
                  <StyledInTabContainer>
                    {achievements?.map((achievement: any) => {
                      return (
                        <StyledListItem key={achievement.id}>
                          <StyledItemTitle>
                            <StyledAvatar
                              size={Avatar.sizes.SMALL}
                              src={achievement.media}
                              type={Avatar.types.IMG}
                              rectangle
                            />
                            <Typography
                              value={achievement.name}
                              type={Typography.types.LABEL}
                              size={Typography.sizes.xss}
                              customColor={'#FFF'}
                            />
                          </StyledItemTitle>
                        </StyledListItem>
                      )
                    })}
                  </StyledInTabContainer>
                </TabPanel>

                <TabPanel>
                  <StyledInTabContainer>
                    {attributes?.map((attribute: any) => {
                      return (
                        <StyledListItem key={attribute.id}>
                          <StyledItemTitle>
                            <StyledAvatar
                              size={Avatar.sizes.SMALL}
                              src={attribute.media}
                              type={Avatar.types.IMG}
                              rectangle
                            />
                            <Typography
                              value={attribute.name}
                              type={Typography.types.LABEL}
                              size={Typography.sizes.xss}
                              customColor={'#FFF'}
                            />
                          </StyledItemTitle>
                        </StyledListItem>
                      )
                    })}
                  </StyledInTabContainer>
                </TabPanel>
                <TabPanel>
                  <StyledInTabContainer>
                    {rewards?.map((reward: any) => {
                      return (
                        <StyledListItem key={reward.id}>
                          <StyledItemTitle>
                            <StyledAvatar
                              size={Avatar.sizes.SMALL}
                              src={reward.media}
                              type={Avatar.types.IMG}
                              rectangle
                            />
                            <Typography
                              value={reward.name}
                              type={Typography.types.LABEL}
                              size={Typography.sizes.xss}
                              customColor={'#FFF'}
                            />
                          </StyledItemTitle>
                        </StyledListItem>
                      )
                    })}
                  </StyledInTabContainer>
                </TabPanel>
              </StyledTabPanels>
            </StyledTabsContext>
          </StyledDetailsHeader>
        </StyledDetailsContainer>
      </StyledActions>

      {medias?.length > 1 && !showDetails && (
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
                  handleDotClick(index, media)
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
  height: 0px;
  width: 0px;
  ${p =>
    p.showDetails &&
    css`
      display: flex;
      flex-direction: column;
      /* justify-content: flex-end; */
      align-items: center;

      background: linear-gradient(180deg, rgba(0, 0, 0, 0) -1.16%, #000000 100%);
      /* Blur/cake */

      filter: drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.15));
      backdrop-filter: blur(100px);

      width: 100%;
      height: 100%;
      position: absolute;
      border-radius: 16px;
    `};
`

const StyledHeader = styled.div`
  position: relative;
  width: 100%;

  margin-bottom: auto;

  display: flex;
  justify-content: space-between;
  /* align-items: flex-start; */

  padding: 0px 14px;
  padding-top: 12px;
`
const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */

  margin-bottom: 16px;
  margin-left: 16px;
`
const StyledTag = styled(Tags)`
  backdrop-filter: blur(8px);
  width: fit-content;
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
const StyledHeaderItem = styled.div<{ right?: boolean; left?: boolean }>`
  min-width: 50px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;

  padding: 6px 8px;

  border-radius: 4.44444px;

  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0px 1.48148px 4.44444px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(74.0741px);
  /* Note: backdrop-filter has minimal browser support */

  ${props =>
    props.right &&
    css`
      margin-left: auto;
    `}
  ${props =>
    props.left &&
    css`
      margin-right: auto;
    `}
`

const StyledDetailsHeader = styled.div`
  width: 100%;
  height: fit-content;

  padding-top: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;
`

const StyledPaginationWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;

  width: 100%;

  bottom: 12px;
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

const StyledActionButton = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 100px;
  z-index: 101;
`
const StyledBadgeWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const StyledTabList = styled(TabList)`
  /* .tabs--wrapper .tabs-list {
    padding: 0px !important;
    background-color: red;
  } */
`

const StyledTab = styled(Tab)`
  min-width: 32px;
  max-width: 32px;
  display: flex;

  /* height: fit-content; */
  border-radius: 100px;
`
const StyledIconWrapper = styled.div`
  color: transparent;
`
const StyledIconWrapperSecondary = styled.div`
  min-width: 32px;
  max-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledTabsContext = styled(TabsContext)`
  width: 100%;
`
const StyledTabPanels = styled(TabPanels)`
  width: 100%;
`
const StyledTabPanel = styled(TabPanel)`
  width: 100%;
  margin-top: 10px;
`
const StyledInTabContainer = styled.div`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  height: 125px;
  padding: 0px 22px;

  display: flex;
  flex-direction: column;
  gap: 7px;
`
const StyledMedia = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 2px;
`
const StyledHiddenMedias = styled.div`
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;

  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledMediasWrapper = styled.div`
  display: flex;
  gap: 4px;
`
const StyledVariantsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 18px;
`
const StyledStoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`
const StyledListItem = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledItemTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`
