import styled, { css } from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Button from '@l3-lib/ui-core/dist/Button'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import TextField from '@l3-lib/ui-core/dist/TextField'
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
import miniCardBg from '../assets/miniCardBg.png'
import miniCardBg2 from '../assets/miniCardBg2.png'
import miniCardBg3 from '../assets/miniCardBg3.png'

import ContractCard from '../Contracts/ContractCard'
import MiniCard from '../ContractComponents/Card/MiniCard'
import PlugInsComponent from '../ContractComponents/PlugInsComponent'
import CustomBadge from '../ContractComponents/CustomBadge'

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

  const [selectedContract, setSelectedContract] = useState<any>({
    first: true,
    second: false,
    third: false,
  })
  const [selectedChain, setSelectedChain] = useState<any>({
    first: true,
    second: false,
    third: false,
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
                      type={stepStatus.stepOne === 'fulfilled' ? 'positive' : 'primary'}
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
                          subtitleText: 'PolygonPoS',
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
                        selected={selectedChain.first}
                        onClick={() => setSelectedChain({ first: true })}
                        image={exampleImg}
                        title={'Poligon PoS'}
                        subtitle={'Support the most widely used Ethereum scaling ecosystem...'}
                        isCreate={true}
                      />
                      <ContractCard
                        selected={selectedChain.second}
                        onClick={() => setSelectedChain({ second: true })}
                        image={exampleImg3}
                        title={'Poligon PoS'}
                        subtitle={'Polygon zkEVM'}
                        isCreate={true}
                      />
                      <ContractCard
                        selected={selectedChain.third}
                        onClick={() => setSelectedChain({ third: true })}
                        image={exampleImg2}
                        title={'Poligon PoS'}
                        subtitle={''}
                        isCreate={true}
                      />
                    </StyledScrollDiv>
                  </StyledTransitionDiv>
                </StyledWizardWrapper>
                <StyledWizardWrapper>
                  <StyledMultiStepIndicatorWrapper>
                    <StyledMultiStepIndicator
                      type={stepStatus.stepTwo === 'fulfilled' ? 'positive' : 'primary'}
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
                          subtitleText: 'ERC1155',
                          titleText: 'Select contract',
                          stepNumber: '2',
                        },
                      ]}
                    />
                    <StyledLine />
                  </StyledMultiStepIndicatorWrapper>
                  <StyledTransitionDiv show={stepStatus.stepTwo === 'active'}>
                    <StyledScrollDiv>
                      <MiniCard
                        selected={selectedContract.first}
                        suggested={true}
                        onClick={() => {
                          setSelectedContract({ first: true })
                        }}
                        title={'ERC1155'}
                        description={
                          'Supports multiple tokens, even different types of tokens, in a single contract.'
                        }
                        image={miniCardBg2}
                      />
                      <MiniCard
                        selected={selectedContract.second}
                        suggested={false}
                        onClick={() => {
                          setSelectedContract({ second: true })
                        }}
                        title={'ERC721'}
                        description={'Requires individual smart contracts for each token.'}
                        image={miniCardBg3}
                      />
                      <MiniCard
                        selected={selectedContract.third}
                        suggested={false}
                        onClick={() => {
                          setSelectedContract({ third: true })
                        }}
                        title={'ERC721'}
                        description={'Requires individual smart contracts for each token.'}
                        image={miniCardBg}
                      />
                    </StyledScrollDiv>
                  </StyledTransitionDiv>
                </StyledWizardWrapper>
                <StyledWizardWrapper>
                  <StyledMultiStepIndicatorWrapper>
                    <StyledMultiStepIndicator
                      type={stepStatus.stepThree === 'fulfilled' ? 'positive' : 'primary'}
                      onClick={() =>
                        setStepStatus({
                          stepOne: 'pending',
                          stepTwo: 'pending',
                          stepThree: 'active',
                        })
                      }
                      steps={[
                        {
                          status: stepStatus.stepThree,
                          titleText: 'Add details',
                          subtitleText:
                            'Select predefined plug-ins from right panel, or custom yours',
                          stepNumber: '3',
                        },
                      ]}
                    />
                    <StyledLine />
                  </StyledMultiStepIndicatorWrapper>
                  <StyledTransitionDiv show={stepStatus.stepThree === 'active'}>
                    <StyledInputsWrapper>
                      <StyledInput>
                        <Typography
                          value='Max assets per player'
                          type={Typography.types.P}
                          size={Typography.sizes.lg}
                          customColor={'#fff'}
                        />
                        <StyledTextFieldWrapper>
                          <TextField placeholder='0' />
                        </StyledTextFieldWrapper>
                      </StyledInput>

                      <StyledInput>
                        <Typography
                          value='Max assets per transaction'
                          type={Typography.types.P}
                          size={Typography.sizes.lg}
                          customColor={'#fff'}
                        />
                        <StyledTextFieldWrapper>
                          <TextField placeholder='0' />
                        </StyledTextFieldWrapper>
                      </StyledInput>
                      <StyledInput>
                        <Typography
                          value='Royalties'
                          type={Typography.types.P}
                          size={Typography.sizes.lg}
                          customColor={'#fff'}
                        />
                        <StyledBadgeWrapper>
                          <CustomBadge value={'2%'} />
                          <CustomBadge value={'5% suggested'} selected />
                          <CustomBadge value={'7%'} />
                          <CustomBadge value={'Custom'} />
                        </StyledBadgeWrapper>

                        <Typography
                          value='Royalty split'
                          type={Typography.types.P}
                          size={Typography.sizes.lg}
                          customColor={'#fff'}
                        />

                        <Dropdown
                          placeholder='Select or Add new wallet'
                          size={Dropdown.size.SMALL}
                        />
                      </StyledInput>
                    </StyledInputsWrapper>
                  </StyledTransitionDiv>
                </StyledWizardWrapper>

                <StyledWizardWrapper>
                  <StyledMultiStepIndicatorWrapper>
                    <StyledMultiStepIndicator
                      type={stepStatus.stepFour === 'fulfilled' ? 'positive' : 'primary'}
                      onClick={() =>
                        setStepStatus({
                          stepOne: 'pending',
                          stepTwo: 'pending',
                          stepThree: 'pending',
                          stepFour: 'active',
                        })
                      }
                      steps={[
                        {
                          status: stepStatus.stepFour,
                          titleText: 'Deploy',
                          subtitleText: '',
                          stepNumber: '4',
                        },
                      ]}
                    />
                  </StyledMultiStepIndicatorWrapper>
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
                } else if (stepStatus.stepThree === 'active') {
                  setStepStatus({ ...stepStatus, stepThree: 'fulfilled', stepFour: 'active' })
                } else if (stepStatus.stepFour === 'active') {
                  setStepStatus({ ...stepStatus, stepFour: 'fulfilled' })
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

              <div>
                <StyledBigImg src={detailImg2} alt='' />
              </div>
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

          {stepStatus.stepThree === 'active' && (
            <StyledStepDetail>
              <PlugInsComponent />
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

  overflow: hidden;
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
  max-height: 100vh;
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

  overflow: scroll;
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

  /* max-height: 100vh; */

  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
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
  padding-left: 0px;
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

  max-width: calc(50vw - 125px);
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
      max-height: 800px;
      opacity: 1;
      margin-bottom: 50px;
    `};
`
const StyledStepperContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
`
const StyledLine = styled.div`
  height: 38px;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  width: 0px;

  margin-left: 27px;
`
const StyledMultiStepIndicatorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;
`
const StyledInput = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;
`
const StyledBadgeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 8px;
`

const StyledTextFieldWrapper = styled.div`
  width: 80px;
`
