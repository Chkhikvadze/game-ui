import { AvatarIcon } from '@radix-ui/react-icons'
import { StyledUploadLogo } from 'modals/CreateProjectModal'
import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'

// eslint-disable-next-line import/no-extraneous-dependencies
import cryptoRandomString from 'crypto-random-string'
import { useState } from 'react'

type PlayerFormType = {
  useHook: any
}

const PlayerForm = ({ useHook }: PlayerFormType) => {
  const [
    ,
    // randomString
    setRandomString,
  ] = useState('')

  // let randomString = "";

  const { formik, handleChangeFile, onDeleteImg, fileUploadType } = useHook()
  const { avatar } = formik?.values
  // const { setFieldValue } = formik;

  // console.log(setFieldValue);

  const generateString = () => {
    setRandomString(cryptoRandomString({ length: 11 }))
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <CustomTextField
          name="unique_id"
          placeholder="Unique Id"
          label="Player unique Id"
          // format={(value: any) => {
          //   value = randomString;
          //   // console.log("value", value);
          //   return value;
          // }}
          // defaultButton={
          //   <button
          //     onClick={() => {
          //       generateString();
          //       setFieldValue("unique_id", randomString);
          //     }}
          //   >
          //     Generate
          //   </button>
          // }
          mandatory
        />

        <button onClick={generateString}>generate</button>
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
