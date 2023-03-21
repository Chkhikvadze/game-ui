import styled, { css } from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Button from '@l3-lib/ui-core/dist/Button'
import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'
import MultiStepIndicator from '@l3-lib/ui-core/dist/MultiStepIndicator'

import Close from '@l3-lib/ui-core/dist/icons/Close'
import PlayOutline from '@l3-lib/ui-core/dist/icons/PlayOutline'
import { useState } from 'react'

import detailImg from '../assets/detailImg.png'
import ScrollContainer from 'react-indiana-drag-scroll'

type CreateContractFormProps = {
  closeModal: () => void
}

const CreateContractForm = ({ closeModal }: CreateContractFormProps) => {
  const [startEdit, setStartEdit] = useState(true)

  return (
    <StyledRoot>
      <StyledForm>
        <StyledIconButtonWrapper>
          <IconButton
            onClick={closeModal}
            icon={Close}
            kind={IconButton.kinds.TERTIARY}
            size={IconButton.sizes.LARGE}
          />
        </StyledIconButtonWrapper>

        <StyledContainer>
          <StyledFormWrapper>
            <StyledFormSection>
              <StyledEditableHeading
                editing={startEdit}
                value={'Untitled'}
                placeholder={`Enter your Contract Heading`}
                onCancelEditing={closeModal}
                type={EditableHeading.types.h1}
                onFinishEditing={(value: string) => {
                  //   if (!value) {
                  //     setValue('project_name', 'Untitled')
                  //   } else {
                  //     setValue('project_name', value)
                  //   }
                  setStartEdit(false)
                }}
              />

              <StyledMultiStepIndicator
                textPlacement={MultiStepIndicator.textPlacements.VERTICAL}
                steps={[
                  {
                    key: 'FULFILLED',
                    status: 'fulfilled',
                    subtitleText: '',
                    titleText: 'Select Chain(Layer 2)',
                  },
                  {
                    key: 'PENDING',
                    status: 'pending',
                    subtitleText: '',
                    titleText: 'Select contract',
                  },
                  {
                    key: 'PENDING-2',
                    status: 'pending',
                    subtitleText: '',
                    titleText: 'Add details',
                  },
                ]}
              />
            </StyledFormSection>
          </StyledFormWrapper>

          <StyledButtonWrapper>
            <Button type='submit' leftIcon={PlayOutline} size={Button.sizes.LARGE}>
              Start
            </Button>
          </StyledButtonWrapper>
        </StyledContainer>

        <StyledStepDetailWrapper>
          <StyledStepDetail>
            <div>
              <Heading
                type={Heading.types.h1}
                value='Polygon PoS'
                size='medium'
                customColor={'rgba(255, 255, 255, 0.8)'}
              />
            </div>
            <Typography
              value='Polygon PoS is one of the most used protocols in the world. The network has tens of thousands of dApps, more than 3 million average daily transactions, $5 billion in secured assets, and some of the top brands building on it.'
              type={Typography.types.P}
              size={Typography.sizes.lg}
              customColor={'rgba(255, 255, 255, 0.6)'}
            />

            <div>
              <StyledCollectionScroll>
                <StyledImg src={detailImg} alt='' />
                <StyledImg src={detailImg} alt='' />
                <StyledImg src={detailImg} alt='' />
              </StyledCollectionScroll>
            </div>

            <Typography
              value='Polygon zkEVM harnesses the power of ZK proofs to reduce transaction cost and massively increase throughput, all while inheriting the security of Ethereum L1.'
              type={Typography.types.P}
              size={Typography.sizes.lg}
              customColor={'rgba(255, 255, 255, 0.6)'}
            />

            <div>
              <StyledCollectionScroll>
                <StyledImg src={detailImg} alt='' />
                <StyledImg src={detailImg} alt='' />
                <StyledImg src={detailImg} alt='' />
              </StyledCollectionScroll>
            </div>
          </StyledStepDetail>
        </StyledStepDetailWrapper>
      </StyledForm>
    </StyledRoot>
  )
}

export default CreateContractForm

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`
const StyledForm = styled.form`
  position: relative;
  display: flex;
  justify-content: flex-end;

  height: 100%;
`

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 30px;

  padding: 64px;

  height: 100%;
  width: 100%;
`
const StyledButtonWrapper = styled.div<{ finish?: boolean }>`
  margin-top: auto;

  opacity: 1;
  transition: opacity 300ms;
  ${props =>
    props.finish &&
    css`
      pointer-events: none;
      opacity: 0;
    `}
`

const StyledIconButtonWrapper = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;

  padding: 20px;

  z-index: 1;
`
const StyledStepDetailWrapper = styled.div`
  padding: 150px 60px;
  padding-bottom: 0px;
  /* height: 100%; */
  width: 100%;

  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;

  max-height: 100vh;
`

const StyledStepDetail = styled.div`
  display: flex;
  flex-direction: column;

  gap: 30px;

  height: 100%;
  width: 100%;

  border-radius: 6px;

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`
const StyledFormWrapper = styled.div<{ finish?: boolean }>`
  margin-top: auto;

  opacity: 1;
  transition: opacity 300ms;
  ${props =>
    props.finish &&
    css`
      pointer-events: none;
      opacity: 0;
    `}
`

const StyledFormSection = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start;
  justify-content: flex-start; */

  gap: 55px;
`
const StyledEditableHeading = styled(EditableHeading)`
  width: fit-content;
  color: rgba(255, 255, 255, 0.6);
`
const StyledMultiStepIndicator = styled(MultiStepIndicator)`
  /* width: fit-content;
  height: fit-content; */
`
// const StyledTextWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 30px;
// `
const StyledImg = styled.img`
  width: 400px;
  height: 266px;
`
const StyledCollectionScroll = styled(ScrollContainer)`
  display: flex;
  gap: 16px;
`
