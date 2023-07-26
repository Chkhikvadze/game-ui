import withRenderModal from 'hocs/withRenderModal'

import styled from 'styled-components'

import Modal from '@l3-lib/ui-core/dist/Modal'

import { useCollection } from 'pages/Collection/Collections/useCollection'

import backgroundImg from 'pages/Game/GameForm/assets/adventure.png'
import CreateForm from 'components/CreateForm'
import CreateCollectionForm from 'components/CreateForm/CreateCollectionForm'

type CreateCollectionModalProps = {
  closeModal: () => void
  data: any
}

const CreateCollectionModal = ({ closeModal, data }: CreateCollectionModalProps) => {
  const { formHook, handleSubmit, collectionCategories } = useCollection(data)

  const collectionName = formHook.watch('collection_name')
  const collectionCategory = formHook.watch('collection_categories')

  const closeCreateCollectionModal = () => {
    closeModal()
  }

  return (
    <>
      <StyledRoot>
        <Modal fullscreen show isClean onClose={closeCreateCollectionModal}>
          <CreateForm
            closeModal={closeModal}
            formHook={formHook}
            handleSubmit={handleSubmit}
            nameValue={collectionName}
            categoryValue={collectionCategory}
            backgroundImg={backgroundImg}
            finishText={'Collection unlocked'}
            form={
              <CreateCollectionForm
                closeModal={closeModal}
                formHook={formHook}
                collectionCategories={collectionCategories}
              />
            }
          />
        </Modal>
      </StyledRoot>
    </>
  )
}

export default withRenderModal('create-collection-modal')(CreateCollectionModal)

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

export const StyledRoot = styled.div<{ leftSide?: boolean }>`
  margin-top: 30px;
  margin-bottom: 50px;

  ${({ leftSide }) =>
    !leftSide &&
    `
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  `};

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`
