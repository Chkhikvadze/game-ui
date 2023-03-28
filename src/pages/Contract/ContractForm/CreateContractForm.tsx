import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Button from '@l3-lib/ui-core/dist/Button'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import TextField from '@l3-lib/ui-core/dist/TextField'
import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'

import Close from '@l3-lib/ui-core/dist/icons/Close'
import PlayOutline from '@l3-lib/ui-core/dist/icons/PlayOutline'
import API from '@l3-lib/ui-core/dist/icons/API'
import Code from '@l3-lib/ui-core/dist/icons/Code'

import { useState } from 'react'

import detailImg from '../assets/detailImg.png'
import detailImg2 from '../assets/detailImg2.png'

import ContractCard from '../Contracts/ContractCard'
import PlugInsComponent from '../ContractComponents/PlugInsComponent'
import CustomBadge from '../ContractComponents/CustomBadge'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { CHAIN_CARDS, CODE_HIGHLIGHTER_STYLE, SAMPLE_CODE } from './CreateContractFormUtils'
import {
  StyledADetailTransition,
  StyledBadgeWrapper,
  StyledBigImg,
  StyledButtonWrapper,
  StyledCodeButton,
  StyledContainer,
  StyledEditableHeading,
  StyledForm,
  StyledFormSection,
  StyledFormWrapper,
  StyledIconButtonWrapper,
  StyledIconWrapper,
  StyledImg,
  StyledInput,
  StyledInputsWrapper,
  StyledLine,
  StyledMultiStepIndicator,
  StyledMultiStepIndicatorWrapper,
  StyledRoot,
  StyledScrollDiv,
  StyledStepDetail,
  StyledStepDetailWrapper,
  StyledStepperContainer,
  StyledTextFieldWrapper,
  StyledTransitionDiv,
  StyledWizardWrapper,
} from './CreateContractFormStyles'

type CreateContractFormProps = {
  closeModal: () => void
}

const CreateContractForm = ({ closeModal }: CreateContractFormProps) => {
  const [startEdit, setStartEdit] = useState(true)

  const [stepStatus, setStepStatus] = useState({
    stepOne: 'active',
    stepTwo: 'pending',
    stepThree: 'pending',
  })

  const [selectedChainIndex, setSelectedChainIndex] = useState(0)

  const [showCode, setShowCode] = useState(false)

  return (
    <StyledRoot>
      <StyledForm>
        <StyledIconButtonWrapper>
          <StyledCodeButton
            onClick={() => {
              setShowCode(!showCode)
            }}
          >
            <StyledIconWrapper>{!showCode ? <Code /> : <API />}</StyledIconWrapper>
            <Typography
              value={showCode ? 'Docs' : 'Code'}
              type={Typography.types.P}
              size={Typography.sizes.sm}
              customColor={'#fff'}
            />
          </StyledCodeButton>

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
                          subtitleText: 'Polygon PoS',
                          titleText: 'Select Chain (Layer 2)',
                          stepNumber: '1',
                        },
                      ]}
                    />
                    <StyledLine />
                  </StyledMultiStepIndicatorWrapper>
                  <StyledTransitionDiv show={stepStatus.stepOne === 'active'}>
                    <StyledScrollDiv>
                      {CHAIN_CARDS.map(({ title, subtitle, image }, index) => (
                        <ContractCard
                          key={index}
                          selected={selectedChainIndex === index}
                          onClick={() => setSelectedChainIndex(index)}
                          image={image}
                          title={title}
                          subtitle={subtitle}
                          isCreate
                        />
                      ))}
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
                          titleText: 'Add details',
                          subtitleText:
                            'Select predefined plug-ins from right panel, or custom yours',
                          stepNumber: '2',
                        },
                      ]}
                    />
                    <StyledLine />
                  </StyledMultiStepIndicatorWrapper>
                  <StyledTransitionDiv show={stepStatus.stepTwo === 'active'}>
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
                          titleText: 'Deploy',
                          subtitleText: '',
                          stepNumber: '3',
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
                  setStepStatus({ ...stepStatus, stepThree: 'fulfilled' })
                }
              }}
            >
              Next
            </Button>
          </StyledButtonWrapper>
        </StyledContainer>

        <StyledStepDetailWrapper>
          <StyledStepDetail>
            <StyledADetailTransition show={showCode}>
              <SyntaxHighlighter language='solidity' style={CODE_HIGHLIGHTER_STYLE} showLineNumbers>
                {SAMPLE_CODE}
              </SyntaxHighlighter>
            </StyledADetailTransition>

            <StyledADetailTransition show={!showCode}>
              {stepStatus.stepOne === 'active' && (
                <>
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
                </>
              )}

              {stepStatus.stepTwo === 'active' && <PlugInsComponent />}

              {stepStatus.stepThree === 'active' && <div></div>}
            </StyledADetailTransition>
          </StyledStepDetail>
        </StyledStepDetailWrapper>
      </StyledForm>
    </StyledRoot>
  )
}

export default CreateContractForm
