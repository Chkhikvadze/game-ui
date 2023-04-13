import { FormikProvider } from 'formik'
import withRenderModal from 'hocs/withRenderModal'
import Button from 'oldComponents/atoms/Button'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
// import CustomTextField from "oldComponents/molecules/CustomTextField/CustomTextField";
import Modal from 'oldComponents/molecules/Modal'
import PlayerForm from 'pages/Player/PlayerForm'
import usePlayers from 'pages/Player/Players/usePlayers'
import styled from 'styled-components'
import { StyledModalButtonLink } from './CreateProjectModal'
import { StyledFormSection } from './modalStyle'

import { useTranslation } from 'react-i18next'
import FullScreenModal from 'components/FullScreenModal/FullScreenModal'

import { closeIcon, starsIcon } from 'assets/icons'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'

// import { StyledFromSection } from './modalStyle'

type CreatePlayerModalProps = {
  closeModal: () => void
}

const CreatePlayerModal = ({ closeModal }: CreatePlayerModalProps) => {
  const { formik, handleChangeFile, onDeleteImg, fileUploadType, generateRandomCryptoString } =
    usePlayers()
  console.log('🚀 ~ formik:', formik.values)
  const { t } = useTranslation()
  // return (
  //   <>
  //     <StyledRoot>
  //       <FormikProvider value={formik}>
  //         <Modal
  //           close={closeModal}
  //           header={'Create Player'}
  //           footer={
  //             <StyledActionsContainer>
  //               <StyledModalButtonLink style={{}} onClick={closeModal}>
  //                 {t('cancel')}
  //               </StyledModalButtonLink>

  //               <Button color='primary' onClick={formik.handleSubmit}>
  //                 {t('save')}
  //               </Button>
  //             </StyledActionsContainer>
  //           }
  //         >
  //           <StyledFormSection>
  //             <PlayerForm
  //               formik={formik}
  //               handleChangeFile={handleChangeFile}
  //               onDeleteImg={onDeleteImg}
  //               fileUploadType={fileUploadType}
  //             />
  //           </StyledFormSection>
  //         </Modal>
  //       </FormikProvider>
  //     </StyledRoot>
  //   </>
  // )

  const createPlayer = () => {
    console.log('create player')
    formik.handleSubmit()
  }

  return (
    <FullScreenModal>
      <StyledModalWrapper className='modal_wrapper'>
        <StyledHeader>
          <StyledHeaderGroup>
            <img src={starsIcon} alt='start' />
            <StyledTypography>Add AI Test Players</StyledTypography>
          </StyledHeaderGroup>
          <StyledCloseBtn onClick={closeModal}>
            <CloseIconSvg color='rgba(255, 255, 255, 0.8);' />
          </StyledCloseBtn>
        </StyledHeader>
        <StyledModalBody>
          <FormikProvider value={formik}>
            <PlayerForm
              formik={formik}
              handleChangeFile={handleChangeFile}
              onDeleteImg={onDeleteImg}
              fileUploadType={fileUploadType}
              generateRandomCryptoString={generateRandomCryptoString}
            />
          </FormikProvider>
        </StyledModalBody>
        <StyledModalFooter>
          <StyledTypography onClick={createPlayer}>Add another player</StyledTypography>
        </StyledModalFooter>
        {/* <div className='footer'>footer</div> */}
      </StyledModalWrapper>
    </FullScreenModal>
  )
}

export default withRenderModal('create-player-modal')(CreatePlayerModal)

const StyledModalWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 40px;
  padding: 40px 41px;
`

const StyledHeaderGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`
const StyledCloseBtn = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  cursor: pointer;
`

const StyledTypography = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
`

const StyledModalBody = styled.div`
  display: flex;
  justify-content: center;
`

const StyledModalFooter = styled.div`
  padding: 94px 58px 64px;
`
