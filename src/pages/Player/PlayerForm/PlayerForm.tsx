import { AvatarIcon } from '@radix-ui/react-icons'
import { StyledUploadLogo } from 'modals/CreateProjectModal'
import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'

// eslint-disable-next-line import/no-extraneous-dependencies
import cryptoRandomString from 'crypto-random-string'
import styled from 'styled-components'

type PlayerFormType = {
  formik: any
  handleChangeFile: any
  onDeleteImg: any
  fileUploadType: any
}

const PlayerForm = ({ formik, handleChangeFile, onDeleteImg, fileUploadType }: PlayerFormType) => {
  const { avatar } = formik?.values

  const generateString = () => {
    let randomString = cryptoRandomString({ length: 11 })
    formik.setFieldValue('player_unique_id', randomString)
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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

        {/* <button onClick={generateString}>generate</button> */}
      </div>

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
