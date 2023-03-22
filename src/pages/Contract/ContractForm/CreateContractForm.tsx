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

import ScrollContainer from 'react-indiana-drag-scroll'

import detailImg from '../assets/detailImg.png'
import detailImg2 from '../assets/detailImg2.png'

import exampleImg from '../assets/exampleImg.png'
import exampleImg2 from '../assets/exampleImg2.png'
import exampleImg3 from '../assets/exampleImg3.png'
import ContractCard from '../Contracts/ContractCard'

type CreateContractFormProps = {
  closeModal: () => void
}

const CreateContractForm = ({ closeModal }: CreateContractFormProps) => {
  const [startEdit, setStartEdit] = useState(true)

  const [stepStatus, setStepStatus] = useState<any>({
    stepOne: 'active',
    stepTwo: 'pending',
    stepThree: 'pending',
  })

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
                  // if (!value) {
                  //   setValue('project_name', 'Untitled')
                  // } else {
                  //   setValue('project_name', value)
                  // }
                  setStartEdit(false)
                }}
              />

              <StyledStepperContainer>
                <StyledWizardWrapper>
                  <StyledMultiStepIndicatorWrapper>
                    <StyledMultiStepIndicator
                      onClick={() =>
                        setStepStatus({
                          stepOne: 'active',
                          stepTwo: 'pending',
                          stepThree: 'pending',
                        })
                      }
                      steps={[
                        {
                          status: stepStatus.stepOne,
                          subtitleText: 'Heading',
                          titleText: 'Select Chain(Layer 2)',
                          stepNumber: '1',
                        },
                      ]}
                    />
                    <StyledLine />
                  </StyledMultiStepIndicatorWrapper>
                  <StyledTransitionDiv show={stepStatus.stepOne === 'active'}>
                    <StyledScrollDiv>
                      <ContractCard
                        isCreate={true}
                        image={exampleImg}
                        title={'Poligon PoS'}
                        subtitle={'Support the most widely used Ethereum scaling ecosystem...'}
                      />
                      <ContractCard
                        isCreate={true}
                        image={exampleImg3}
                        title={'Poligon PoS'}
                        subtitle={'Polygon zkEVM'}
                      />
                      <ContractCard
                        isCreate={true}
                        image={exampleImg2}
                        title={'Poligon PoS'}
                        subtitle={''}
                      />
                    </StyledScrollDiv>
                  </StyledTransitionDiv>
                </StyledWizardWrapper>
                <StyledWizardWrapper>
                  <StyledMultiStepIndicatorWrapper>
                    <StyledMultiStepIndicator
                      onClick={() =>
                        setStepStatus({
                          stepOne: 'pending',
                          stepTwo: 'active',
                          stepThree: 'pending',
                        })
                      }
                      steps={[
                        {
                          status: stepStatus.stepTwo,
                          subtitleText: 'Heading',
                          titleText: 'Select contract',
                          stepNumber: '2',
                        },
                      ]}
                    />
                    <StyledLine />
                  </StyledMultiStepIndicatorWrapper>
                  <StyledTransitionDiv show={stepStatus.stepTwo === 'active'}>
                    <StyledScrollDiv>
                      <ContractCard
                        isCreate={true}
                        image={exampleImg}
                        title={'ERC1155'}
                        subtitle={'Etc'}
                      />
                      <ContractCard
                        isCreate={true}
                        image={exampleImg}
                        title={'ERC1155'}
                        subtitle={'Etc'}
                      />
                    </StyledScrollDiv>
                  </StyledTransitionDiv>
                </StyledWizardWrapper>
                <StyledWizardWrapper>
                  <StyledMultiStepIndicator
                    onClick={() =>
                      setStepStatus({ stepOne: 'pending', stepTwo: 'pending', stepThree: 'active' })
                    }
                    steps={[
                      {
                        status: stepStatus.stepThree,
                        subtitleText: 'Heading',
                        titleText: 'Add details',
                        stepNumber: '3',
                      },
                    ]}
                  />
                  {stepStatus.stepThree === 'active' && <div>Step three</div>}
                </StyledWizardWrapper>
              </StyledStepperContainer>
            </StyledFormSection>
          </StyledFormWrapper>

          <StyledButtonWrapper>
            <Button
              leftIcon={PlayOutline}
              size={Button.sizes.LARGE}
              onClick={() => {
                if (stepStatus.stepOne === 'active') {
                  setStepStatus({ ...stepStatus, stepOne: 'fulfilled', stepTwo: 'active' })
                } else if (stepStatus.stepTwo === 'active') {
                  setStepStatus({ ...stepStatus, stepTwo: 'fulfilled', stepThree: 'active' })
                }
              }}
            >
              Next
            </Button>
          </StyledButtonWrapper>
        </StyledContainer>

        <StyledStepDetailWrapper>
          {stepStatus.stepOne === 'active' && (
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
                <StyledScrollDiv>
                  <StyledImg src={detailImg} alt='' />
                  <StyledImg src={detailImg} alt='' />
                  <StyledImg src={detailImg} alt='' />
                </StyledScrollDiv>
              </div>

              <Typography
                value='Polygon zkEVM harnesses the power of ZK proofs to reduce transaction cost and massively increase throughput, all while inheriting the security of Ethereum L1.'
                type={Typography.types.P}
                size={Typography.sizes.lg}
                customColor={'rgba(255, 255, 255, 0.6)'}
              />
            </StyledStepDetail>
          )}
          {stepStatus.stepTwo === 'active' && (
            <StyledStepDetail>
              <div>
                <Heading
                  type={Heading.types.h1}
                  value='ERC1155'
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

              <StyledBigImg src={detailImg2} alt='' />
            </StyledStepDetail>
          )}
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
  max-width: 50%;
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

  gap: 55px;
`
const StyledEditableHeading = styled(EditableHeading)`
  width: fit-content;
  color: rgba(255, 255, 255, 0.6);
`
const StyledMultiStepIndicator = styled(MultiStepIndicator)`
  /* width: fit-content;
  height: fit-content; */
  margin-bottom: 0px;
`
const StyledImg = styled.img`
  width: 400px;
  height: 266px;

  mix-blend-mode: screen;
`
const StyledBigImg = styled.img`
  width: 100%;
  height: 570px;
  mix-blend-mode: screen;
`

const StyledScrollDiv = styled(ScrollContainer)`
  display: flex;
  gap: 16px;

  max-width: calc(50vw - 140px);
`
const StyledWizardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const StyledTransitionDiv = styled.div<{ show?: boolean }>`
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  margin-bottom: 0;
  transition: max-height 0.3s, opacity 0.3s, overflow 0s;
  ${p =>
    p.show &&
    css`
      max-height: 350px;
      opacity: 1;
      margin-bottom: 20px;
    `};
`
const StyledStepperContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
`
const StyledLine = styled.div`
  height: 38px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 0px;

  margin-left: 67px;
`
const StyledMultiStepIndicatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
