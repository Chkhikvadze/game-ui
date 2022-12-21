import styled from 'styled-components'

import { StyledUploadLogo } from 'modals/CreateProjectModal'
import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'

import { AvatarIcon } from '@radix-ui/react-icons'

// eslint-disable-next-line import/no-extraneous-dependencies
import cryptoRandomString from 'crypto-random-string'
import { TextField } from '@mui/material'
import { useState } from 'react'
import Button from 'oldComponents/atoms/Button'
import AddCustomFields from 'components/AddCustomFields'

type PlayerFormType = {
  formik: any
  handleChangeFile: any
  onDeleteImg: any
  fileUploadType: any
  walletByPlayer?: any
  addPLayerWallet?: any
  isEdit?: boolean
}

const PlayerForm = ({
  formik,
  handleChangeFile,
  onDeleteImg,
  fileUploadType,
  walletByPlayer,
  addPLayerWallet,
  isEdit,
}: PlayerFormType) => {
  const {
    avatar,
    // custom_props
  } = formik?.values
  const { player_unique_id, custom_props } = formik?.initialValues

  const generateString = () => {
    let randomString = cryptoRandomString({ length: 11 })
    formik.setFieldValue('player_unique_id', randomString)
  }

  // const removeValue = (index: any) => {
  //   const newValue = custom_props.filter((item: any, index2: any) => index2 !== index)
  //   formik.setFieldValue('custom_props', newValue)

  //   console.log(newValue)
  // }

  let initialFieldsNumber: number[] = []
  const [customFieldsNumber, setCustomFieldsNumber] = useState(isEdit ? [] : [1])

  const [checked, setChecked] = useState(false)

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
          <StyledDiv>
            <TextField value={`${player_unique_id}`} label={'Unique Id'} disabled />
            <button
              onClick={() => {
                navigator.clipboard.writeText(player_unique_id)
              }}
            >
              Copy
            </button>
          </StyledDiv>
        )}
      </div>

      {walletByPlayer && walletByPlayer.address && (
        <>
          <StyledDiv>
            <TextField value={`${walletByPlayer.address}`} label={'Wallet Address'} disabled />
            <button
              onClick={() => {
                navigator.clipboard.writeText(walletByPlayer.address)
              }}
            >
              Copy
            </button>
          </StyledDiv>
          <>
            <TextField value={`${walletByPlayer.protocol}`} label={'Protocol'} disabled />
          </>
          <>
            <TextField value={`${walletByPlayer.network}`} label={'Network'} disabled />
          </>
        </>
      )}

      {isEdit && !walletByPlayer.address && (
        <Button color="primary" onClick={() => addPLayerWallet()}>
          Create Wallet
        </Button>
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
      {!isEdit && (
        <label>
          Create Wallet
          <input
            // name="create_wallet"
            type="checkbox"
            defaultChecked={checked}
            onChange={() => {
              setChecked(!checked)
              formik.setFieldValue('is_create_wallet', !checked)
            }}
          />
        </label>
      )}

      {isEdit &&
        custom_props?.length &&
        custom_props?.forEach(() => {
          initialFieldsNumber = [...initialFieldsNumber, 1]
        })}
      <AddCustomFields
        name="custom_props"
        fieldNum={[...initialFieldsNumber, ...customFieldsNumber]}
        // removeValue={removeValue}
      />
      <button onClick={() => setCustomFieldsNumber((state: any) => [...state, 1])}>Add New</button>
    </>
  )
}

export default PlayerForm

const StyledButton = styled.button`
  color: #00b2ee;
`
const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
`
