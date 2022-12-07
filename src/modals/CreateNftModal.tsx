import React from 'react'
import { FormikProvider } from 'formik'

import styled from 'styled-components'
import withRenderModal from 'hocs/withRenderModal'
import { nft_type_options } from 'utils/constants'

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import Button from 'oldComponents/atoms/Button'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
import Modal from 'oldComponents/molecules/Modal'
import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'
import CustomSelectField from 'oldComponents/atoms/CustomSelect'

import { useNft } from 'pages/Nft/Nfts/useNft'
import { StyledFormSection } from './modalStyle'

type CreateProjectModalProps = {
  closeModal: () => void
}

const CreateNftModal = ({ closeModal }: CreateProjectModalProps) => {
  const { formik } = useNft()

  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <Modal
            close={closeModal}
            header={'Create Nft'}
            footer={
              <StyledActionsContainer>
                <StyledModalButtonLink style={{}} onClick={closeModal}>
                  Cancel
                </StyledModalButtonLink>

                <Button color="primary" onClick={formik.handleSubmit}>
                  Save
                </Button>
              </StyledActionsContainer>
            }
          >
            <StyledFormSection>
              <CustomTextField name="nft_name" placeholder="Name" label="Name" mandatory />
              <CustomTextField
                name="nft_price"
                placeholder="Price"
                label="Price"
                numeric
                mandatory
              />
              <CustomTextField
                name="nft_supply"
                placeholder="Supply"
                label="Supply"
                numeric
                mandatory
              />
              <CustomSelectField
                name="nft_type"
                placeholder="Type"
                label="Type"
                options={nft_type_options}
                mandatory
              />
            </StyledFormSection>
          </Modal>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}

export default withRenderModal('create-nft-modal')(CreateNftModal)

// const StyledForm = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-column-gap: 24px;
//   grid-row-gap: 16px;
//   width: 600px;
// `

export const StyledActionsContainer = styled.div`
  display: flex;
  justify-items: flex-end;
`

export const StyledModalButtonLink = styled(ButtonLink)`
  text-decoration: none;
  margin-right: 12px;
  margin-top: 3px;
`
