import { FormikProvider } from 'formik'

import styled from 'styled-components'

import withRenderModal from 'hocs/withRenderModal'

import Button from '@l3-lib/ui-core/dist/Button'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'

import { starsIcon } from 'assets/icons'

import PersonaOutline from '@l3-lib/ui-core/dist/icons/PersonaOutline'

import { useTranslation } from 'react-i18next'
import FullScreenModal from 'components/FullScreenModal'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import useTeams from '../useTeams'
import TeamForm from '../TeamForm'

// import { StyledFormSection } from 'pages/ApiKeys/ApiKeysStyle'

const CreateTeamModal = () => {
  const { formik, closeModal, assignedUserList } = useTeams()

  const { t } = useTranslation()

  return (
    <FullScreenModal>
      <StyledModalWrapper className='modal_wrapper'>
        <StyledHeader>
          <StyledCloseBtn onClick={() => closeModal('create-team-modal')}>
            <CloseIconSvg color='rgba(255, 255, 255, 0.8);' />
          </StyledCloseBtn>
        </StyledHeader>
        <StyledModalBody>
          <FormikProvider value={formik}>
            <div>
              <TeamForm
                formik={formik}
                assignedUserList={assignedUserList}
                // closeModal={closeModal}
              />
            </div>
          </FormikProvider>
        </StyledModalBody>
      </StyledModalWrapper>
    </FullScreenModal>
  )
}

export default withRenderModal('create-team-modal')(CreateTeamModal)

const StyledFormSection = styled.div<{ columns?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  width: 400px;
`

const StyledModalWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 40px;
  padding: 40px 41px;

  height: 100%;
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

const StyledTypography = styled.p<{ disabled?: boolean }>`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  pointer-events: ${p => p.disabled && 'none'};
`

const StyledModalBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const StyledModalFooter = styled.div`
  padding: 30px 0px 50px 50px;

  display: flex;
  align-items: center;
  gap: 20px;
`
