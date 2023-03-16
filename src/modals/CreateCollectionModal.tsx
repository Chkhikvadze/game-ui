import withRenderModal from 'hocs/withRenderModal'

import styled from 'styled-components'

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'

import Modal from 'oldComponents/molecules/Modal'

import { useCollection } from 'pages/Collection/Collections/useCollection'

import { useTranslation } from 'react-i18next'

import backgroundImg from '../pages/Project/ProjectForm/assets/adventure.svg'
import CreateForm from 'components/CreateForm'
import CreateCollectionForm from 'components/CreateForm/CreateCollectionForm'

type CreateCollectionModalProps = {
  closeModal: () => void
}

const CreateCollectionModal = ({ closeModal }: CreateCollectionModalProps) => {
  const { formHook, handleSubmit } = useCollection()
  const { t } = useTranslation()

  const collectionName = formHook?.watch('collection_name')
  const collectionCategory = formHook?.watch('collection_categories')

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
            form={<CreateCollectionForm closeModal={closeModal} formHook={formHook} />}
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

export const StyledModalButtonLink = styled(ButtonLink)`
  text-decoration: none;
  margin-right: 12px;
  margin-top: 3px;
`
