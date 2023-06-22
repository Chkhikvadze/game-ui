import styled from 'styled-components'

import { StyledTextHeaderWrapper } from '../Appearance/Appearance'
import { useGeneralForm } from './useGeneralForm'

import { getIconByText } from 'helpers'

import Avatar from '@l3-lib/ui-core/dist/Avatar'
import Button from '@l3-lib/ui-core/dist/Button'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'

import { PathOne, PathTwo, PathThree, PathFour, Avatar_1, Avatar_2, Avatar_3 } from 'assets/avatars'

import GetStartedComponent from './GeneralFormComponents/GetStartedComponent'
import TextFieldController from 'components/TextFieldController'

const GeneralForm = () => {
  const { fields, handleSubmit, onSubmit, control, watch, collectionCount, playerCount } =
    useGeneralForm()

  return (
    <StyledGeneralFormContainer>
      <GetStartedComponent />

      <div>
        <Heading
          value={'Key insights'}
          type={Heading.types.h1}
          customColor='#FFFFFF'
          size='medium'
        />
        <Heading />
        <Typography
          value={'Check the most relevant information with custom widgets, add or remove them.'}
          type={Heading.types.p}
          size={Typography.sizes.lg}
          customColor='rgba(255, 255, 255, 0.6)'
        />

        <StyledKeyContainer>
          <StyledKeyContainerItem>
            <Heading
              value={'Total value'}
              type={Heading.types.h1}
              customColor='rgba(255, 255, 255, 0.6)'
              style={{ fontSize: 24, lineHeight: '32px' }}
            />
            <Heading
              value={'453k'}
              type={Heading.types.h2}
              customColor='#FFFFFF'
              style={{ fontSize: 32, lineHeight: '44px' }}
            />
          </StyledKeyContainerItem>
          <StyledKeyContainerItem>
            <Heading
              value={'#Collections'}
              type={Heading.types.h1}
              // size={Typography.sizes.sm}
              customColor='rgba(255, 255, 255, 0.6)'
              style={{ fontSize: 24, lineHeight: '32px' }}
            />
            <Heading
              value={collectionCount === 0 ? '0' : collectionCount}
              type={Heading.types.h2}
              // size={Typography.sizes.sm}
              customColor='#FFFFFF'
              style={{ fontSize: 32, lineHeight: '44px' }}
            />
          </StyledKeyContainerItem>
          <StyledKeyContainerItem>
            <StyledHeaderGroup>
              <StyledAvatarGroup>
                <Avatar
                  size={Avatar.sizes.SMALL}
                  src={Avatar_1}
                  type={Avatar.types.IMG}
                  rectangle
                />
                <Avatar
                  size={Avatar.sizes.SMALL}
                  src={Avatar_2}
                  type={Avatar.types.IMG}
                  rectangle
                />
                <Avatar
                  size={Avatar.sizes.SMALL}
                  src={Avatar_3}
                  type={Avatar.types.IMG}
                  rectangle
                />
              </StyledAvatarGroup>
              <Heading
                value={'Players'}
                type={Heading.types.h1}
                // size={Typography.sizes.sm}
                customColor='rgba(255, 255, 255, 0.6)'
                style={{ fontSize: 24, lineHeight: '32px' }}
              />
            </StyledHeaderGroup>
            {/* <StyledContainerWithAvatars> */}
            {/* <StyledAvatarGroup>
              <img src={AvatarOne} alt='avatar' />
              <img src={AvatarTwo} alt='avatar' />
              <img src={AvatarThree} alt='avatar' />
            </StyledAvatarGroup> */}
            {/* </StyledContainerWithAvatars> */}
            <Heading
              value={playerCount?.length === 0 ? '0' : playerCount}
              type={Heading.types.h2}
              // size={Typography.sizes.sm}
              customColor='#FFFFFF'
              style={{ fontSize: 32, lineHeight: '44px' }}
            />
          </StyledKeyContainerItem>
        </StyledKeyContainer>

        <StyledDevicesSection>
          <StyledTextHeaderWrapper>
            <Heading
              value={'Social links'}
              type={Heading.types.h1}
              customColor='#FFFFFF'
              size='medium'
            />
            <Button kind={Button.kinds.SECONDARY} onClick={handleSubmit(onSubmit)}>
              Add
            </Button>
          </StyledTextHeaderWrapper>
          <Heading />
          <Typography
            value={
              'Add custom social URLs to let your players find and discover specific communities, content and more.'
            }
            type={Heading.types.p}
            size={Typography.sizes.lg}
            customColor='rgba(255, 255, 255, 0.6)'
          />

          <StyledFieldGroupContainer>
            {fields.map((field, index) => {
              const field_value = watch(`socialLinks.${index}.url`)
              return (
                <StyledTextFieldGroup key={field.id}>
                  <img src={getIconByText(field_value)} alt='' />
                  <TextFieldController field_name={`socialLinks.${index}.url`} control={control} />
                </StyledTextFieldGroup>
              )
            })}
          </StyledFieldGroupContainer>
        </StyledDevicesSection>
        <StyledDevicesSection>
          <Heading
            value={'Devices'}
            type={Heading.types.h1}
            // size={Typography.sizes.sm}
            customColor='#FFFFFF'
            size='medium'
          />
          <Heading />
          <Typography
            value={
              'Choose which devices your game is available on - informational only, no API integration.'
            }
            type={Heading.types.p}
            size={Typography.sizes.lg}
            customColor='rgba(255, 255, 255, 0.6)'
          />
          <StyledDeviceIconSection>
            <img src={PathOne} alt='' />
            <img src={PathTwo} alt='' />
            <img src={PathThree} alt='' />
            <img src={PathFour} alt='' />
          </StyledDeviceIconSection>
        </StyledDevicesSection>
        <StyledDevicesSection>
          <Heading
            value={'Other information'}
            type={Heading.types.h1}
            // size={Typography.sizes.sm}
            customColor='#FFFFFF'
            size='medium'
          />
          <Heading />
          <Typography
            value={
              'Add custom social URLs to let your players find and discover specific communities, content and more. '
            }
            type={Heading.types.p}
            size={Typography.sizes.lg}
            customColor='rgba(255, 255, 255, 0.6)'
          />
        </StyledDevicesSection>
      </div>
    </StyledGeneralFormContainer>
  )
}

export default GeneralForm

const StyledKeyContainer = styled.div`
  display: grid;
  grid-template-columns: 156px 156px 328px;
  margin-top: 24px;
  gap: 16px;
`

const StyledKeyContainerItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 17px 18.5px;
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: max-content;
  row-gap: 12px;
  width: auto;
  justify-items: center;
`

export const StyledTextFieldGroup = styled.div`
  display: grid;
  grid-template-columns: 25px minmax(auto, 432px);
  gap: 15.75px;
  align-items: start;
  img {
    margin-top: 7.75px;
  }
`

// const StyledSocialLinkSection = styled.section`
//   margin-top: 56px;
// `
const StyledGeneralFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`

export const StyledDevicesSection = styled.section`
  margin-top: 56px;
`
export const StyledFieldGroupContainer = styled.div`
  margin-top: 24px;
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: max-content;
  gap: 16px;
`

const StyledDeviceIconSection = styled.div`
  margin-top: 32.5px;
  display: flex;
  align-items: center;
  gap: 23px;
`

export const StyledAvatarGroup = styled.div`
  display: flex;
  & .l3-style-avatar:not(:first-child) {
    margin-left: -10px;
  }
`

export const StyledHeaderGroup = styled.div`
  display: flex;
  gap: 7.8px;
`
