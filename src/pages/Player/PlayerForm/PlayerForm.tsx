import styled from 'styled-components'

import { StyledUploadLogo } from 'modals/CreateProjectModal'
import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'

import { AvatarIcon } from '@radix-ui/react-icons'

// eslint-disable-next-line import/no-extraneous-dependencies
import cryptoRandomString from 'crypto-random-string'
import { useEffect, useState } from 'react'
import Button from 'oldComponents/atoms/Button'
import AddCustomFields from 'components/AddCustomFields'
import Toggle from '@l3-lib/ui-core/dist/Toggle'
import usePlayers from '../Players/usePlayers'
import { Field, FormikProvider } from 'formik'
import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'
import ReloadOutline from '@l3-lib/ui-core/dist/icons/ReloadOutline'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'
import ToggleFormik from 'components/ToggleFormik'

type PlayerFormType = {
  formik?: any
  handleChangeFile: any
  onDeleteImg: any
  fileUploadType: any
  walletByPlayer?: any
  addPLayerWallet?: any
  generateRandomCryptoString?: any
  editMode?: boolean
}

const PlayerForm = ({
  formik,
  handleChangeFile,
  onDeleteImg,
  fileUploadType,
  generateRandomCryptoString,
  walletByPlayer,
  addPLayerWallet,
  editMode = false,
}: PlayerFormType) => {
  const { avatar, custom_props } = formik?.values
  const { unique_id } = formik?.initialValues

  return (
    // <FormikProvider value={formik}>
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
                />
              </StyledGenerateBtn>
            )}
          </StyledTextFieldForm>
          <StyleToggleContainer>
            <ToggleFormik name={'is_create_wallet'} />
            <StyledTypographySm>Create Wallet</StyledTypographySm>
          </StyleToggleContainer>
        </StyledHeaderRightContainer>
      </StyledHeader>

      <StyledBodyContainer>
        <FormikTextField name='username' placeholder='Username' label='Username' />
        <FormikTextField field_name='name' label='Full name' placeholder='Full name' />
        <FormikTextField field_name='email' label='Email' placeholder='Email' />
      </StyledBodyContainer>

      <StyledCustomFiedlsContainer>
        <AddCustomFields name='custom_props' formik={formik} data={custom_props || []} />
      </StyledCustomFiedlsContainer>

      {/* {walletByPlayer && walletByPlayer.address && ( */}
      <>
        {/* <StyledGenerateBtn>
            <FormikTextField
              field_name={`walletByPlayer.address`}
              iconName={Copy}
              onIconClick={() => navigator.clipboard.writeText(unique_id)}
              label='address'
            />
          </StyledGenerateBtn> */}

        {/* <StyledGenerateBtn>
            <FormikTextField
              field_name={`walletByPlayer.protocol`}
              iconName={Copy}
              onIconClick={() => navigator.clipboard.writeText(unique_id)}
              label='Protocol'
            />
          </StyledGenerateBtn>

          <StyledGenerateBtn>
            <FormikTextField field_name={`walletByPlayer.network`} label='Network' />
          </StyledGenerateBtn> */}
      </>
      {/* )} */}
    </StyledContainer>
    // </FormikProvider>
  )
}

export default PlayerForm

const StyledContainer = styled.div`
  width: 522px;
  // max-height: 616px;
  background: rgba(0, 0, 0, 0.2);
  mix-blend-mode: normal;
  backdrop-filter: blur(100px);
  padding: 59px 40px;
  border-radius: 16px;
  overflow: hidden;

  .l3-style-toggle_toggle {
    margin: 0;
  }
`

const StyledHeader = styled.div`
  padding: 18px 10px 18px 21px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 53px;
  align-items: center;
`

const StyledHeaderRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const StyledButton = styled.button`
  color: #00b2ee;
`
const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
`

const StyledTypography = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
`

const StyleToggleContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`

const StyledTypographySm = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
`

const StyledTextFieldForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const StyledBodyContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const StyledTypogrphyBg = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  color: #ffffff;
`

const StyledCustomFiedlsContainer = styled.div`
  margin-top: 16px;
`

const StyledGenerateBtn = styled.div`
  display: flex;
  .l3-style-clickable {
    width: 25px !important;
    height: 25px !important;
    &svg {
      width: 25px !important;
      height: 25px !important;
    }
  }
`
