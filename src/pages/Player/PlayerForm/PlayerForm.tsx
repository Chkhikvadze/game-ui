import styled from 'styled-components'

import { StyledUploadLogo } from 'modals/CreateProjectModal'
import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'

import { AvatarIcon } from '@radix-ui/react-icons'

// eslint-disable-next-line import/no-extraneous-dependencies
import cryptoRandomString from 'crypto-random-string'
import { TextField } from '@mui/material'

type PlayerFormType = {
  formik: any
  handleChangeFile: any
  onDeleteImg: any
  fileUploadType: any
  walletByPlayer?: any
}

const PlayerForm = ({
  formik,
  handleChangeFile,
  onDeleteImg,
  fileUploadType,
  walletByPlayer,
}: PlayerFormType) => {
  const { avatar } = formik?.values
  const { player_unique_id } = formik?.initialValues

  const generateString = () => {
    let randomString = cryptoRandomString({ length: 11 })
    formik.setFieldValue('player_unique_id', randomString)
  }

  // console.log(formik)

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {player_unique_id === '' ? (
          <CustomTextField
            name="player_unique_id"
            placeholder="Unique Id"
            label="Player unique Id"
            defaultButton={
              <StyledButton
                onClick={() => {
                  generateString()
                }}
              >
                Generate
              </StyledButton>
            }
            mandatory
          />
        ) : (
          <TextField value={`${player_unique_id}`} label={'Unique Id'} disabled />
        )}

        {/* <button onClick={generateString}>generate</button> */}
      </div>

      {walletByPlayer && (
        <>
          <>
            <TextField value={walletByPlayer.address} label={'Wallet Address'} disabled />
          </>
          <>
            <TextField value={walletByPlayer.protocol} label={'Protocol'} disabled />
          </>
          <>
            <TextField value={walletByPlayer.network} label={'Network'} disabled />
          </>
        </>
      )}

      <StyledUploadLogo
        name={'avatar'}
        onChange={(e: any) => handleChangeFile(e, 'avatar')}
        placeholder={'Upload Avatar image'}
        fileUploadType={fileUploadType}
        img={avatar}
        label={'Avatar'}
        description={'This image will also be used for navigation. 350 x 350 recommended.'}
        uploadIcon={<AvatarIcon style={{ width: 50, height: 50, color: '#fff' }} />}
        onDeleteImg={() => onDeleteImg('avatar')}
      />

      <CustomTextField
        name="name"
        placeholder="Name"
        label="Name"
        // mandatory
      />

      <CustomTextField name="username" placeholder="Username" label="Username" mandatory />

      <CustomTextField
        name="email"
        placeholder="Email"
        label="Email"
        // mandatory
      />
    </>
  )
}

export default PlayerForm

const StyledButton = styled.button`
  color: #00b2ee;
`
