import { useRef, useState } from 'react'

import Button from '@l3-lib/ui-core/dist/Button'
import PersonaOutline from '@l3-lib/ui-core/dist/icons/PersonaOutline'

import IconButton from '@l3-lib/ui-core/dist/IconButton'
import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import TextField from '@l3-lib/ui-core/dist/TextField'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'

import Add from '@l3-lib/ui-core/dist/icons/Add'
import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import Close from '@l3-lib/ui-core/dist/icons/Close'
import SearchOutline from '@l3-lib/ui-core/dist/icons/SearchOutline'

import polygonIcon from 'assets/icons/polygonIcon.png'

import CustomSelectField from 'oldComponents/atoms/CustomSelect'
import AddCustomFields from 'components/AddCustomFields'

import FormikTextField from 'components/TextFieldFormik'

import {
  StyledContainer,
  StyledBodyContainer,
  StyledCustomFiedlsContainer,
} from 'styles/modalFormStyle.css'
import styled, { css } from 'styled-components'

import LeftArrowIconSvg from 'assets/svgComponents/LeftArrowIconSvg'
import { StyledTabContext } from 'pages/Game/EditGame/EditGame'
import ContentItem from './AssetFormComponents/ContentItem'
import ActionFooter from './AssetFormComponents/ActionFooter'
import ContentMenu from './AssetFormComponents/ContentMenu'
import { usePropertiesService } from 'services/usePropertyService'
import { useCollectionByIdService } from 'services/useCollectionService'
import { useParams } from 'react-router-dom'
import MenuListItem from './AssetFormComponents/MenuListItem'

type assetFormType = {
  closeModal: () => void
  formik: any

  // formik: any
  // propertiesOptions: any
  // assetOption: any
  // isEdit?: boolean
  handleUploadImages: any
  loadingMediaUpload: boolean
}

const AssetForm = ({
  closeModal,
  formik,
  handleUploadImages,
  loadingMediaUpload,
}: assetFormType) => {
  // const { custom_props } = formik?.values

  // const uploadRef = useRef(null as any)

  // const onButtonClick = async (inputFile: any) => {
  //   inputFile.current.click()
  // }
  const { asset_price, asset_name } = formik?.values

  const [activeTab, setActiveTab] = useState(0)
  const [bgImage, setBgImage] = useState('')

  const [menuDetails, setMenuDetails] = useState({ name: '', items: [] })

  const params = useParams()
  const collectionId: string = params?.collectionId!

  const { data: collection } = useCollectionByIdService({
    id: collectionId,
  })

  const { game_id } = collection

  const { data: properties, refetch: propertiesRefetch } = usePropertiesService({
    game_id: game_id || '',
    collection_id: collectionId,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const pickedProperties = properties?.items?.filter((property: any) =>
    formik?.values?.asset_properties?.includes(property.id),
  )

  console.log('pickedProperties', pickedProperties)
  return (
    <StyledRoot>
      <StyledOuterColumn>
        <StyledWrapper>
          <StyledHeaderBtn onClick={() => closeModal()}>
            <>
              <LeftArrowIconSvg /> Create Asset
            </>
          </StyledHeaderBtn>
        </StyledWrapper>

        <StyledWrapper>
          <StyledVariant>
            <StyledVariantItem>
              <TextType />
              <Typography
                value='Name'
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
                customColor={'#FFF'}
              />
              <StyledEditableHeading
                editing={true}
                value={asset_name}
                placeholder={asset_name}
                type={EditableHeading.types.h6}
                onFinishEditing={(value: any) => {
                  if (value === '') {
                    formik.setFieldValue('asset_name', 'Untitled')
                  } else {
                    formik.setFieldValue('asset_name', value)
                  }
                }}
              />
            </StyledVariantItem>
            <StyledVariantItem>
              <StyledIconImg src={polygonIcon} alt='' />
              <Typography
                value='Price'
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
                customColor={'#FFF'}
              />
              <StyledEditableHeading
                value={asset_price}
                placeholder={`0`}
                type={EditableHeading.types.h6}
                onFinishEditing={(value: any) => {
                  if (value === null) {
                    formik.setFieldValue('asset_price', 0)
                  } else {
                    formik.setFieldValue('asset_price', value)
                  }
                }}
              />
            </StyledVariantItem>
          </StyledVariant>
        </StyledWrapper>

        <StyledDivideLine />

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

        <div style={{ marginTop: 'auto' }}>
          <Button onClick={formik.handleSubmit} leftIcon={PersonaOutline}>
            Create asset
          </Button>
        </div>
      </StyledOuterColumn>

      <StyledMiddleColumn>
        {bgImage.length > 0 && <StyledImg src={bgImage} />}

        <StyledMenuWrapper show={menuDetails.name}>
          <ContentMenu
            title={menuDetails.name}
            onClose={() => setMenuDetails({ name: '', items: [] })}
            items={menuDetails.items}
            formik={formik}
          />
        </StyledMenuWrapper>
        <ActionFooter
          formik={formik}
          handleUploadImages={handleUploadImages}
          loadingMediaUpload={loadingMediaUpload}
          setBgImage={setBgImage}
          bgImage={bgImage}
        />
      </StyledMiddleColumn>

      <StyledOuterColumn>
        <TabList size='small'>
          <Tab onClick={() => setActiveTab(0)}>Content</Tab>
          <Tab onClick={() => setActiveTab(1)}>Transactions</Tab>
        </TabList>
        <StyledTabContext activeTabId={activeTab} className='tab_pannels_container'>
          <TabPanels>
            <TabPanel>
              <StyledContent>
                <ContentItem
                  onClick={() => setMenuDetails({ name: 'Attributes', items: [] })}
                  title={'Attributes'}
                  subTitle='Connect API'
                />

                <ContentItem
                  title={'Properties'}
                  onClick={() => setMenuDetails({ name: 'Properties', items: properties?.items })}
                  items={
                    <StyledListWrapper>
                      {pickedProperties?.map((property: any) => {
                        return (
                          <MenuListItem
                            onClick={() => {
                              formik.setFieldValue(
                                'asset_properties',
                                formik?.values?.asset_properties.replace(`${property.id}`, ''),
                              )
                              if (menuDetails?.name?.length > 0) {
                                setMenuDetails({ name: '', items: [] })
                              }
                            }}
                            secondary
                            key={property.id}
                            selected={false}
                            image={property.main_media}
                            name={property.name}
                          />
                        )
                      })}
                    </StyledListWrapper>
                  }
                />

                <ContentItem
                  title={'Achievements'}
                  noBorder
                  onClick={() => setMenuDetails({ name: 'Achievements', items: [] })}
                />

                {/* <ContentItem onClick={() => {}} title={'Rewards'} subTitle='Connect API' /> */}

                {/* <ContentItem onClick={() => {}} title={'Formats'} /> */}

                {/* <ContentItem onClick={() => {}} title={'Relations'} /> */}

                {/* <ContentItem onClick={() => {}} title={'Export'} noBorder /> */}
              </StyledContent>
            </TabPanel>

            <TabPanel>Transactions</TabPanel>
          </TabPanels>
        </StyledTabContext>
      </StyledOuterColumn>
    </StyledRoot>
    // <StyledContainer>
    //   <StyledBodyContainer>
    //     <FormikTextField name='asset_name' placeholder='Name' label='Name' />

    //     <FormikTextField name='asset_description' placeholder='Description' label='Description' />
    //     <FormikTextField name='asset_supply' placeholder='Supply' label='Supply' />
    //     <FormikTextField name='asset_price' placeholder='Price' label='Price' />
    //     <CustomSelectField
    //       name='asset_properties'
    //       placeholder='Properties'
    //       label='Properties'
    //       options={propertiesOptions || []}
    //       mandatory
    //       isMulti
    //       labelColor='#fff'
    //     />
    //     <CustomSelectField
    //       name='parent_asset'
    //       placeholder='Parent asset'
    //       label='Parent asset'
    //       options={assetOption || []}
    //       mandatory
    //       labelColor='#fff'
    //     />

    //     {!isEdit && (
    //       <div>
    //         <Button onClick={() => onButtonClick(uploadRef)} disabled={loadingMediaUpload}>
    //           {loadingMediaUpload ? 'Uploading' : 'Add Medias'}
    //         </Button>
    //         <input
    //           type='file'
    //           multiple
    //           ref={uploadRef}
    //           style={{ display: 'none' }}
    //           onChange={e => handleUploadImages(e, 'medias')}
    //         />
    //       </div>
    //     )}
    //   </StyledBodyContainer>

    //   <StyledCustomFiedlsContainer>
    //     {!isEdit && (
    //       <AddCustomFields name='custom_props' formik={formik} data={custom_props || []} />
    //     )}
    //   </StyledCustomFiedlsContainer>
    // </StyledContainer>
  )
}

export default AssetForm

const StyledRoot = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100vh;

  overflow-x: auto;
`
const StyledOuterColumn = styled.div`
  width: 300px;
  min-width: fit-content;
  height: 100%;

  background: rgba(0, 0, 0, 0.2);

  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(100px);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 20px;
  gap: 16px;

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
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #fff;
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
  justify-content: space-between;
  padding: 10px 8px;
  margin: 2px 0;

  width: 260px;
  height: 96px;

  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  border: 2px solid #73fafd;
`
const StyledDivideLine = styled.div`
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  height: 1px;

  width: 100%;
`
const StyledAddButton = styled.div`
  width: 100%
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;
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
`
const StyledIconImg = styled.img`
  width: 14px;

  margin: 10px 5px;
`
const StyledMenuWrapper = styled.div<{ show: string }>`
  position: absolute;
  right: 20px;
  top: 100px;

  display: none;
  ${p =>
    p.show.length > 0 &&
    css`
      display: block;
    `};
  ${p =>
    p.show === 'Properties' &&
    css`
      top: 200px;
    `};
  ${p =>
    p.show === 'Achievements' &&
    css`
      top: 270px;
    `};
`
const StyledSearchItem = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  color: white;
`
const StyledEditableHeading = styled(EditableHeading)`
  width: 250px;
  color: #fff;
  margin-left: 5px;
`
const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`
const StyledListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
