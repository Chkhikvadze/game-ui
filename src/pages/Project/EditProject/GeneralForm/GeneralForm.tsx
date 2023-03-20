import Button from '@l3-lib/ui-core/dist/Button'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'

import PathOne from 'assets/avatars/Path_1.svg'
import PathTwo from 'assets/avatars/Path_2.svg'
import PathThree from 'assets/avatars/Path_3.svg'
import PathFour from 'assets/avatars/Path_4.svg'

import Avatar_1 from 'assets/avatars/azuki_2.jpg'
import Avatar_2 from 'assets/avatars/monkey_2.jpg'
import Avatar_3 from 'assets/avatars/monkey_3.jpg'

import TextField from '@l3-lib/ui-core/dist/TextField'
import { StyledTextHeaderWrapper } from '../Appearance'

import DefaultIcon from 'assets/icons/default_icon.svg'
import TwitterIcon from 'assets/icons/twitter_icon.svg'

import Avatar from '@l3-lib/ui-core/dist/Avatar'

import useGeneralForm from './useGeneralForm'

const findIconByTextField = (inputValue: string) => {
  const icon = inputValue.includes('twitter') ? TwitterIcon : DefaultIcon

  return icon
}

const GeneralForm = () => {
  const { register, fields, append, onHandleClickEnter } = useGeneralForm()

  return (
    <StyledGeneralFormContainer>
      <section className='key_section'>
        <Heading
          value={'Key insights'}
          type={Heading.types.h1}
          // size={Typography.sizes.sm}
          customColor='#FFFFFF'
          style={{ fontSize: 24, lineHeight: 'normal' }}
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
              // size={Typography.sizes.sm}
              customColor='rgba(255, 255, 255, 0.6)'
              style={{ fontSize: 24, lineHeight: '32px' }}
            />
            <Heading
              value={'453k'}
              type={Heading.types.h2}
              // size={Typography.sizes.sm}
              customColor='#FFFFFF'
              style={{ fontSize: 32, lineHeight: '44px' }}
            />
          </StyledKeyContainerItem>
          <StyledKeyContainerItem>
            <Heading
              value={'#Collection'}
              type={Heading.types.h1}
              // size={Typography.sizes.sm}
              customColor='rgba(255, 255, 255, 0.6)'
              style={{ fontSize: 24, lineHeight: '32px' }}
            />
            <Heading
              value={'23'}
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
              value={'23'}
              type={Heading.types.h2}
              // size={Typography.sizes.sm}
              customColor='#FFFFFF'
              style={{ fontSize: 32, lineHeight: '44px' }}
            />
          </StyledKeyContainerItem>
        </StyledKeyContainer>
      </section>
      <StyledDevicesSection>
        <StyledTextHeaderWrapper>
          <Heading
            value={'Social links'}
            type={Heading.types.h1}
            // size={Typography.sizes.sm}
            customColor='#FFFFFF'
            style={{ fontSize: 24, lineHeight: 'normal' }}
          />
          <Button
            kind={Button.kinds.SECONDARY}
            onClick={() =>
              append({
                value: '',
              })
            }
          >
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
            return (
              <StyledTextFieldGroup key={field.id}>
                <img src={findIconByTextField(field.value)} alt='' />
                <TextField
                  {...register(`socialLinks.${index}.value` as const)}
                  onKeyDown={onHandleClickEnter}
                  size={Typography.sizes.sm}
                />
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
          style={{ fontSize: 24, lineHeight: 'normal' }}
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
          style={{ fontSize: 24, lineHeight: 'normal' }}
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

const StyledTextFieldGroup = styled.div`
  display: grid;
  grid-template-columns: 25px minmax(auto, 432px);
  gap: 15.75px;
  align-items: center;
`

// const StyledSocialLinkSection = styled.section`
//   margin-top: 56px;
// `
const StyledGeneralFormContainer = styled.div``

const StyledDevicesSection = styled.section`
  margin-top: 56px;
`
const StyledFieldGroupContainer = styled.div`
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

const StyledAvatarGroup = styled.div`
  display: flex;
  & .l3-style-avatar:not(:first-child) {
    margin-left: -10px;
  }
`

const StyledHeaderGroup = styled.div`
  display: flex;
  gap: 7.8px;
`
