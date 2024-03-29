import React, { useState, useContext } from 'react'
import { AuthContext, ToastContext } from 'contexts'

import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Toast from '@l3-lib/ui-core/dist/Toast'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import Button from '@l3-lib/ui-core/dist/Button'
import TextType from '@l3-lib/ui-core/dist/icons/TextType'

import Icon from '@l3-lib/ui-core/dist/Icon'
import polygonIcon from 'assets/icons/polygonIcon.png'
import ethIcon from 'assets/icons/eth.svg'
import Check from '@l3-lib/ui-core/dist/icons/Check'
import styled, { css } from 'styled-components'

import LeftArrowIconSvg from 'assets/svgComponents/LeftArrowIconSvg'
import { StyledTabContext } from 'pages/Game/EditGame/EditGame'
import ContentItem from './AssetFormComponents/ContentItem'
import ActionFooter from './AssetFormComponents/ActionFooter'
import ContentMenu from './AssetFormComponents/ContentMenu'
import { usePropertiesService } from 'services/usePropertyService'
import { useCollectionByIdService, useContractByCollectionIdService } from 'services'

import {
  useAchievementsService,
  useAttributesService,
  useRewardsService,
} from 'services/useAssetResourcesService'
import FormikAutoSave from 'helpers/FormikAutoSave'
import AttributeItem from './AssetFormComponents/AttributeItem'
import PropertyItem from './AssetFormComponents/PropertyItem'
import AchievementItem from './AssetFormComponents/AchievementItem'
import Add from '@l3-lib/ui-core/dist/icons/Add'
import AvatarDropDown from 'components/AvatarDropDown'
import Spotlight from 'components/Spotlight'
import { StyledAvatarContainer, StyledFooter } from 'components/Layout/LayoutStyle'

type assetFormType = {
  closeModal: () => void
  formik: any
  handleUploadImages?: any
  loadingMediaUpload?: boolean
  handleDeleteImages?: any
  isEdit?: boolean
  collectionId: string
}

const AssetForm = ({
  closeModal,
  formik,
  handleUploadImages,
  loadingMediaUpload,
  isEdit,
  collectionId,
  handleDeleteImages,
}: assetFormType) => {
  // todo levanion move this logics in an external hook

  const { user } = React.useContext(AuthContext)
  const { first_name } = user

  const { toast, setToast } = useContext(ToastContext)

  const { asset_price, asset_name } = formik?.values

  const [activeTab, setActiveTab] = useState(0)
  const [bgImage, setBgImage] = useState('')

  const [menuDetails, setMenuDetails] = useState({
    name: '',
    items: [],
    assetField: '',
  })

  const { data: collection } = useCollectionByIdService({
    id: collectionId,
  })

  const { game_id } = collection || {}

  const { data: properties, refetch: propertiesRefetch } = usePropertiesService({
    game_id: game_id,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const { data: attributes, refetch: attributesRefetch } = useAttributesService({
    game_id: game_id,
    page: 1,
    limit: 100,
  })

  const { data: achievements, refetch: achievementsRefetch } = useAchievementsService({
    game_id: game_id,
    page: 1,
    limit: 100,
  })

  const { data: rewards, refetch: rewardsRefetch } = useRewardsService({
    game_id: game_id,
    page: 1,
    limit: 100,
  })

  const propertiesCount = properties?.items?.length
  const achievementsCount = achievements?.items?.length
  const rewardsCount = rewards?.items?.length

  const pickedProperties = properties?.items?.filter((property: any) =>
    formik?.values?.asset_properties?.map((value: any) => value?.id).includes(property.id),
  )
  const pickedAttributes = attributes?.items?.filter((attribute: any) =>
    formik?.values?.asset_attributes?.map((value: any) => value?.id).includes(attribute.id),
  )
  const pickedAchievements = achievements?.items?.filter((achievement: any) =>
    formik?.values?.asset_achievements?.map((value: any) => value?.id).includes(achievement.id),
  )
  const pickedRewards = rewards?.items?.filter((reward: any) =>
    formik?.values?.asset_rewards?.map((value: any) => value?.id).includes(reward.id),
  )

  const { data: collectionContract } = useContractByCollectionIdService({
    id: collectionId,
  })

  let priceIcon = ''
  if (collectionContract?.blockchain === 'Polygon') {
    priceIcon = polygonIcon
  } else if (collectionContract?.blockchain === 'Ethereum') {
    priceIcon = ethIcon
  }

  const [showAllAchievements, setShowAllAchievements] = useState(false)
  const [showAllProperties, setShowAllProperties] = useState(false)
  const [showAllRewards, setShowAllRewards] = useState(false)

  const displayedAchievements = showAllAchievements
    ? pickedAchievements
    : pickedAchievements.slice(0, 2)

  const displayedProperties = showAllProperties ? pickedProperties : pickedProperties.slice(0, 2)

  const displayedRewards = showAllRewards ? pickedRewards : pickedRewards.slice(0, 2)

  // todo levanion leave only this
  return (
    <StyledRoot>
      <StyledHeader>
        <StyledHeaderText>{collection?.name}</StyledHeaderText>
        <StyledCloseButton onClick={() => closeModal()}>
          <Typography
            value='Close'
            type={Typography.types.HEADING}
            size={Typography.sizes.xss}
            customColor={'color: rgba(255, 255, 255, 0.6)'}
          />
        </StyledCloseButton>
      </StyledHeader>
      <FormikAutoSave />
      <StyledContainer>
        <StyledOuterColumn>
          <StyledWrapper>
            <StyledHeaderBtn onClick={() => closeModal()}>
              <>
                {/* <LeftArrowIconSvg /> {isEdit ? 'Edit Asset' : 'Create Asset'} */}
                {/* <Typography
                  value='Variants'
                  type={Typography.types.HEADING}
                  size={Typography.sizes.xss}
                  customColor={'#FFF'}
                />
                <StyledAddMediaButton>
                  <Add size='22' />
                </StyledAddMediaButton> */}
              </>
            </StyledHeaderBtn>
          </StyledWrapper>
          <StyledWrapper>
            <StyledVariant>
              <StyledVariantItem>
                <Check color='white' size='42' />
                {/* <Typography
                  value='Name'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'#FFF'}
                /> */}
                <StyledEditableHeading
                  editing={!isEdit}
                  value={asset_name}
                  placeholder={'enter name'}
                  type={EditableHeading.types.h2}
                  onCancelEditing={() => closeModal()}
                  // todo levanion move this logic an external function
                  onFinishEditing={(value: any) => {
                    if (value !== '') {
                      formik.setFieldValue('asset_name', value)
                    }
                  }}
                />
              </StyledVariantItem>
            </StyledVariant>
          </StyledWrapper>
          {/* <StyledContainerWrapper>
            <Typography
              value='Wakanda Soldier'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
              customColor={'rgba(255, 255, 255, 0.80)'}
            />
          </StyledContainerWrapper> */}
          {/* <StyledDivideLine /> */}

          {/* <StyledWrapper>
           <StyledAddButton>
             <Typography
               value='Add variant'
               type={Typography.types.LABEL}
               size={Typography.sizes.md}
               customColor={'#FFF'}
             />
             <Add />
           </StyledAddButton>
         </StyledWrapper> */}
        </StyledOuterColumn>
        <StyledMiddleColumn>
          {bgImage.length > 0 && <StyledImg src={bgImage} />}

          <StyledMenuWrapper show={menuDetails.name}>
            <ContentMenu
              title={menuDetails.name}
              onClose={() => setMenuDetails({ name: '', items: [], assetField: '' })}
              items={menuDetails.items}
              formik={formik}
              assetField={menuDetails.assetField}
            />
          </StyledMenuWrapper>
          <ActionFooter
            formik={formik}
            handleUploadImages={handleUploadImages}
            loadingMediaUpload={loadingMediaUpload}
            setBgImage={setBgImage}
            bgImage={bgImage}
            handleDeleteImages={handleDeleteImages}
          />
        </StyledMiddleColumn>
        <StyledOuterColumnRight>
          <TabList size='small'>
            <Tab onClick={() => setActiveTab(0)}>Content</Tab>
            <Tab onClick={() => setActiveTab(1)}>Transactions</Tab>
          </TabList>
          <StyledTabContext activeTabId={activeTab} className='tab_pannels_container'>
            <TabPanels>
              <TabPanel>
                <StyledContent>
                  <ContentItem
                    onClick={() =>
                      setMenuDetails({
                        name: 'Attributes',
                        items: attributes?.items,
                        assetField: 'asset_attributes',
                      })
                    }
                    title={'Attributes'}
                    // subTitle='Connect API'
                    items={
                      <StyledListWrapper>
                        {pickedAttributes?.map((attribute: any, index: number) => {
                          return (
                            <AttributeItem
                              key={index}
                              image={attribute.media}
                              name={attribute.name}
                              min={attribute.min}
                              max={attribute.max}
                              formik={formik}
                              id={attribute.id}
                            />
                          )
                        })}
                      </StyledListWrapper>
                    }
                  />

                  <ContentItem
                    title={'Properties'}
                    onClick={() =>
                      setMenuDetails({
                        name: 'Properties',
                        items: properties?.items,
                        assetField: 'asset_properties',
                      })
                    }
                    items={
                      <StyledListWrapper>
                        {displayedProperties?.map((property: any, index: number) => {
                          return (
                            <PropertyItem
                              key={index}
                              name={property.name}
                              image={property.media}
                              onClick={() => {
                                const values = formik?.values?.asset_properties.filter(
                                  (value: any) => value.id !== property.id,
                                )
                                formik.setFieldValue('asset_properties', values)
                                if (menuDetails?.name?.length > 0) {
                                  setMenuDetails({
                                    name: '',
                                    items: [],
                                    assetField: '',
                                  })
                                }
                              }}
                            />
                          )
                        })}
                        <StyledButtonWrapper>
                          {propertiesCount > 2 && (
                            <Button
                              onClick={() => setShowAllProperties(!showAllProperties)}
                              size={Button.sizes.SMALL}
                              kind={Button.kinds.TERTIARY}
                            >
                              See more
                            </Button>
                          )}
                        </StyledButtonWrapper>
                      </StyledListWrapper>
                    }
                  />

                  <ContentItem
                    title={'Achievements'}
                    onClick={() =>
                      setMenuDetails({
                        name: 'Achievements',
                        items: achievements?.items,
                        assetField: 'asset_achievements',
                      })
                    }
                    items={
                      <StyledListWrapper>
                        {displayedAchievements?.map((achievement: any, index: number) => {
                          return (
                            <AchievementItem
                              key={index}
                              image={achievement.media}
                              name={achievement.name}
                              onClick={() => {
                                const values = formik?.values?.asset_achievements.filter(
                                  (value: any) => value.id !== achievement.id,
                                )
                                formik.setFieldValue('asset_achievements', values)
                                if (menuDetails?.name?.length > 0) {
                                  setMenuDetails({
                                    name: '',
                                    items: [],
                                    assetField: '',
                                  })
                                }
                              }}
                            />
                          )
                        })}
                        <StyledButtonWrapper>
                          {achievementsCount > 2 && (
                            <Button
                              onClick={() => setShowAllAchievements(!showAllAchievements)}
                              size={Button.sizes.SMALL}
                              kind={Button.kinds.TERTIARY}
                            >
                              See more
                            </Button>
                          )}
                        </StyledButtonWrapper>
                      </StyledListWrapper>
                    }
                  />

                  <ContentItem
                    title={'Rewards'}
                    noBorder
                    onClick={() =>
                      setMenuDetails({
                        name: 'Rewards',
                        items: rewards?.items,
                        assetField: 'asset_rewards',
                      })
                    }
                    items={
                      <StyledListWrapper>
                        {displayedRewards?.map((reward: any, index: number) => {
                          return (
                            <AchievementItem
                              key={index}
                              image={reward.media}
                              name={reward.name}
                              onClick={() => {
                                const values = formik?.values?.asset_rewards.filter(
                                  (value: any) => value.id !== reward.id,
                                )
                                formik.setFieldValue('asset_rewards', values)
                                if (menuDetails?.name?.length > 0) {
                                  setMenuDetails({
                                    name: '',
                                    items: [],
                                    assetField: '',
                                  })
                                }
                              }}
                            />
                          )
                        })}
                        <StyledButtonWrapper>
                          {rewardsCount > 2 && (
                            <Button
                              onClick={() => setShowAllRewards(!showAllRewards)}
                              size={Button.sizes.SMALL}
                              kind={Button.kinds.TERTIARY}
                            >
                              See more
                            </Button>
                          )}
                        </StyledButtonWrapper>
                      </StyledListWrapper>
                    }
                  />
                </StyledContent>
              </TabPanel>

              <TabPanel>Transactions</TabPanel>
            </TabPanels>
          </StyledTabContext>
        </StyledOuterColumnRight>

        <Toast
          label={toast?.message}
          type={toast?.type}
          autoHideDuration={1000}
          open={toast?.open}
          onClose={() => setToast({ open: false })}
        />
      </StyledContainer>

      <StyledFooter id='main_footer'>
        <StyledAvatarContainer>
          <AvatarDropDown />
          <span>{first_name}</span>
        </StyledAvatarContainer>
        <div>
          <Spotlight />
        </div>
        <div></div>
      </StyledFooter>
    </StyledRoot>
  )
}

export default AssetForm

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 40px;
  height: 32px;
  width: 100%;
`

const StyledCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
`

const StyledHeaderText = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: #fff;
  flex-grow: 1;
`
const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 26px;
  // margin-top: 20px;
  width: 97%;
  height: 100%;
  max-height: 85%;
  // margin-bottom: 60px;
  background: var(--basic-foreground-black-1, rgba(0, 0, 0, 0.1));
  box-shadow: 0px 14.900728225708008px 18.625911712646484px 0px rgba(0, 0, 0, 0.05),
    -0.6208637356758118px 0.6208637356758118px 0.6208637356758118px -1.2417274713516235px
      rgba(255, 255, 255, 0.35) inset;
  backdrop-filter: blur(60.844642639160156px);
`

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  min-height: 600px;
  background: #3981f6;
  overflow-x: auto;
  /* backdrop-filter: blur(100px); */
`
const StyledOuterColumn = styled.div`
  min-width: 300px;
  width: fit-content;
  height: 100%;
  border-radius: 26px 0px 0px 26px;

  // background: rgba(0, 0, 0, 0.2);
  // background: transparent;
  // box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(100px);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 20px;
  gap: 5px;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

const StyledOuterColumnRight = styled.div`
  min-width: 300px;
  width: fit-content;
  height: 100%;
  border-radius: 0px 26px 26px 0px;

  // background: rgba(0, 0, 0, 0.2);
  background: transparent;
  // box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(100px);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 20px;
  gap: 5px;

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

const StyledMiddleColumn = styled.div`
  position: relative;

  min-width: 600px;
  width: 100%;
  /* background: yellow; */

  display: flex;
  justify-content: center;
`
const StyledWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 14px;
`
const StyledHeaderBtn = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  color: #ffffff;
  display: flex;
  gap: 25px;
  align-items: center;
  cursor: pointer;
  svg {
    path {
      fill: #fff;
      fill-opacity: 1;
    }
  }
`
const StyledVariant = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 6px 10px;
  // margin: 2px 0;
  gap: 4px;
  width: 265px;
  height: 44px;

  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  // border: 2px solid #73fafd;
`
const StyledDivideLine = styled.div`
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  height: 1px;

  width: 100%;
`

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 10px;
`

const StyledVariantItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledIconImg = styled.img`
  width: 14px;

  margin: 10px 5px;
`
const StyledMenuWrapper = styled.div<{ show: string }>`
  position: absolute;
  right: 20px;
  top: 150px;

  display: none;
  ${p =>
    p.show.length > 0 &&
    css`
      display: block;
    `};
  /* ${p =>
    p.show === 'Properties' &&
    css`
      top: 200px;
    `};
  ${p =>
    p.show === 'Achievements' &&
    css`
      top: 270px;
    `}; */
`

const StyledEditableHeading = styled(EditableHeading)`
  width: 250px;
  color: rgba(255, 255, 255, 0.8);

  margin-left: 5px;
`
const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const StyledListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
const StyledAddMediaButton = styled.div`
  width: 38px;
  min-width: 38px;
  height: 38px;

  // background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`

const StyledContainerWrapper = styled.div`
  display: flex;
  padding: 6px 10px;
  align-items: center;
  width: 187px;
  height: 32px;
  gap: 22px;
  align-self: stretch;
  border-radius: 6px;
`
