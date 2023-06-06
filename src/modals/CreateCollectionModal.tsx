import withRenderModal from 'hocs/withRenderModal'

import styled from 'styled-components'

import Modal from 'modals/Modal'

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

  return (
    <>
      <StyledRoot>
        <Modal
          fullscreen={true}
          modalWidth={'100%'}
          close={closeModal}
          backgroundColor={'radial-gradient(107.39% 52.7% at 50% 50%, #3E4EA9 0%, #111B52 100%)'}
        >
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
