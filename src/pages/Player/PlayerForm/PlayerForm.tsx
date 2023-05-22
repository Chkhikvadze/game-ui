import { AvatarIcon } from '@radix-ui/react-icons'
import { StyledUploadLogo } from 'modals/CreateGameModal'

// eslint-disable-next-line import/no-extraneous-dependencies
import AddCustomFields from 'components/AddCustomFields'
import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'
import ToggleFormik from 'components/ToggleFormik'

import ReloadOutline from '@l3-lib/ui-core/dist/icons/ReloadOutline'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'

import azuki1 from '../../../assets/avatars/azuki_2.jpg'

import {
  StyledContainer,
  StyledHeader,
  StyleToggleContainer,
  StyledBodyContainer,
  StyledHeaderRightContainer,
  StyledTypography,
  StyledTextFieldForm,
  StyledTypographySm,
  StyledCustomFiedlsContainer,
  StyledGenerateBtn,
} from 'styles/modalFormStyle.css'

type PlayerFormType = {
  formik?: any
  handleChangeFile?: any
  onDeleteImg?: any
  fileUploadType?: any
  generateRandomCryptoString?: any
  editMode?: boolean
}

const PlayerForm = ({
  formik,
  handleChangeFile,
  onDeleteImg,
  fileUploadType,
  generateRandomCryptoString,
  editMode = false,
}: PlayerFormType) => {
  const { avatar, custom_props } = formik?.values
  const { unique_id } = formik?.initialValues

  const defaultAvatar = avatar || azuki1

  console.log('avatar', avatar)

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledUploadLogo
          name={'avatar'}
          onChange={(e: any) => handleChangeFile(e, 'avatar')}
          fileUploadType={fileUploadType}
          img={avatar}
          uploadIcon={<AvatarIcon style={{ width: 50, height: 50, color: '#fff' }} />}
          onDeleteImg={() => onDeleteImg('avatar')}
        />
        <StyledHeaderRightContainer>
          <StyledTextFieldForm>
            <StyledTypography>Player ID</StyledTypography>
            {!editMode ? (
              <StyledGenerateBtn>
                <FormikTextField
                  name='unique_id'
                  placeholder='Unique Id'
                  iconName={ReloadOutline}
                  onIconClick={() => generateRandomCryptoString()}
                />
              </StyledGenerateBtn>
            ) : (
              <StyledGenerateBtn>
                <FormikTextField
                  name='unique_id'
                  placeholder='Unique Id'
                  iconName={Copy}
                  onIconClick={() => navigator.clipboard.writeText(unique_id)}
                  disabled={true}
                />
              </StyledGenerateBtn>
            )}
          </StyledTextFieldForm>
          <StyleToggleContainer>
            <ToggleFormik name={'is_create_wallet'} disabled={editMode} />
            <StyledTypographySm>Create Wallet</StyledTypographySm>
          </StyleToggleContainer>
        </StyledHeaderRightContainer>
      </StyledHeader>

      <StyledBodyContainer>
        <FormikTextField name='username' placeholder='Username' label='Username' />
        <FormikTextField field_name='name' label='Full name' placeholder='Full name' />
        <FormikTextField field_name='email' label='Email' placeholder='Email' disabled={editMode} />
      </StyledBodyContainer>

      <StyledCustomFiedlsContainer>
        <AddCustomFields name='custom_props' formik={formik} data={custom_props || []} />
      </StyledCustomFiedlsContainer>
    </StyledContainer>
  )
}

export default PlayerForm
