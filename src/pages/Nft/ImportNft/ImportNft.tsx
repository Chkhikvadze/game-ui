import React from 'react'
import styled from 'styled-components'
import withRenderModal from 'hocs/withRenderModal'


import ButtonLink from 'oldComponents/atoms/ButtonLink'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
import Modal from 'oldComponents/molecules/Modal'

import FileUploadField from 'atoms/FileUploadField'
import { ImageIcon } from '@radix-ui/react-icons'

import ReviewImport from './ReviewImport'
import useImportNft from './userImportNft'

type CreateProjectModalProps = {
  closeModal: () => void
}

const ImportNft = ({ closeModal }: CreateProjectModalProps) => {
  const { handleFileChange, step, parsedCsvData } = useImportNft()

  function renderTabs(tabIndex: number) {
    switch (tabIndex) {
      case 0:
        return (
          <StyledUploadImg
            name={'nft_asset_url'}
            onChange={handleFileChange}
            placeholder={'Upload Background image'}
            fileUploadType={''}
            img={''}
            label={'Asset url'}
            description={`This image will appear as a background image of the game. 1500 x 1700 recommended.`}
            uploadIcon={<ImageIcon style={{ width: 50, height: 50, color: '#fff' }} />}
            onDeleteImg={() => {}}
          />
        )

      case 1:
        return <ReviewImport data={parsedCsvData} />

      default:
        return <>Error..!</>
    }
  }

  return (
    <>
      <StyledRoot>
        <Modal close={closeModal} header={'Import Nft'} modalWidth="100%">
          <StyledFormSection>{renderTabs(step)}</StyledFormSection>
        </Modal>
      </StyledRoot>
    </>
  )
}

export default withRenderModal('import-nft-modal')(ImportNft)

export const StyledActionsContainer = styled.div`
  display: flex;
  justify-items: flex-end;
`

export const StyledModalButtonLink = styled(ButtonLink)`
  text-decoration: none;
  margin-right: 12px;
  margin-top: 3px;
`

export const StyledUploadImg = styled(FileUploadField)`
  width: 100%;
  height: 300px;
`

export const StyledFormSection = styled.div<{ columns?: string }>`
  gap: 30px;
  width: 1200px;
  & .root_container {
    width: fit-content;
  }
`