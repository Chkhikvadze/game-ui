import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Button from '@l3-lib/ui-core/dist/Button'
import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'

import Close from '@l3-lib/ui-core/dist/icons/Close'
import PlayOutline from '@l3-lib/ui-core/dist/icons/PlayOutline'
import API from '@l3-lib/ui-core/dist/icons/API'
import Code from '@l3-lib/ui-core/dist/icons/Code'

import { useState } from 'react'

import ContractCard from '../Contracts/ContractCard'

import { CHAIN_CARDS } from './CreateContractFormUtils'
import {
  StyledButtonWrapper,
  StyledCodeButton,
  StyledContainer,
  StyledEditableHeading,
  StyledForm,
  StyledFormSection,
  StyledFormWrapper,
  StyledIconButtonWrapper,
  StyledIconWrapper,
  StyledLine,
  StyledMultiStepIndicator,
  StyledMultiStepIndicatorWrapper,
  StyledRoot,
  StyledScrollDiv,
  StyledStepperContainer,
  StyledTransitionDiv,
  StyledWizardWrapper,
} from './CreateContractFormStyles'
import useContractForm from './useContractForm'
import { useSearchParams } from 'react-router-dom'
import { Contract } from 'services/useContractService'
import StepDetails from './components/StepDetails'
import DetailFields from './components/DetailFields'
import ChooseCollection from './components/ChooseCollection'
import useDeployContract from './useDeployContract'
import DeployButton from './components/DeployButton'

type CreateContractFormProps = {
  closeModal: () => void
  contract?: Contract
  contractId: string | null
}

export interface StepStatus {
  chain: string
  collection: string
  details: string
  deploy: string
}

const CreateContractForm = ({ closeModal, contract }: CreateContractFormProps) => {
  const [startEdit, setStartEdit] = useState(true)

  const [, setSearchParams] = useSearchParams()

  const { formHook, handleCreateOrUpdateContract } = useContractForm({
    contract,
  })

  const { handleDeployContract } = useDeployContract({ contract })

  const onChange = (name: any, value: unknown) => {
    formHook.setValue(name, value)
    handleCreateOrUpdateContract()
  }

  const { name, chain_id: selectedChainId } = formHook.watch()

  // const name = formHook.watch('name')
  // const selectedChainId = formHook.watch('chain_id')

  const [stepStatus, setStepStatus] = useState<StepStatus>({
    chain: 'active',
    collection: 'pending',
    details: 'pending',
    deploy: 'pending',
  })

  const [showCode, setShowCode] = useState(false)

  return (
    <StyledRoot>
      <StyledForm>
        <StyledIconButtonWrapper>
          {contract && (
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
          )}

          <IconButton
            onClick={() => {
              closeModal()
              setSearchParams({})
            }}
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
                value={name}
                placeholder={`Enter your contract name`}
                onCancelEditing={closeModal}
                type={EditableHeading.types.h1}
                onFinishEditing={(value: string) => {
                  onChange('name', value)
                  setStartEdit(false)
                }}
              />

              <StyledStepperContainer>
                <StyledWizardWrapper>
                  <StyledMultiStepIndicatorWrapper>
                    <StyledMultiStepIndicator
                      type={stepStatus.chain === 'fulfilled' ? 'positive' : 'primary'}
                      onClick={() =>
                        setStepStatus({
                          chain: 'active',
                          collection: 'pending',
                          details: 'pending',
                          deploy: 'pending',
                        })
                      }
                      steps={[
                        {
                          status: stepStatus.chain,
                          subtitleText: 'Polygon PoS',
                          titleText: 'Select Chain (Layer 2)',
                          stepNumber: '1',
                        },
                      ]}
                    />
                    <StyledLine />
                  </StyledMultiStepIndicatorWrapper>
                  <StyledTransitionDiv show={stepStatus.chain === 'active'}>
                    <StyledScrollDiv>
                      {CHAIN_CARDS.map(({ title, subtitle, image, chainId }, index) => (
                        <ContractCard
                          key={index}
                          selected={chainId === selectedChainId}
                          onClick={() => onChange('chain_id', chainId)}
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
                      type={stepStatus.collection === 'fulfilled' ? 'positive' : 'primary'}
                      onClick={() =>
                        setStepStatus({
                          chain: 'pending',
                          collection: 'active',
                          details: 'pending',
                          deploy: 'pending',
                        })
                      }
                      steps={[
                        {
                          status: stepStatus.collection,
                          titleText: 'Choose collection',
                          subtitleText: '',
                          stepNumber: '2',
                        },
                      ]}
                    />
                    <StyledLine />
                  </StyledMultiStepIndicatorWrapper>
                  <StyledTransitionDiv show={stepStatus.collection === 'active'}>
                    <ChooseCollection formHook={formHook} onChange={onChange} />
                  </StyledTransitionDiv>
                </StyledWizardWrapper>

                <StyledWizardWrapper>
                  <StyledMultiStepIndicatorWrapper>
                    <StyledMultiStepIndicator
                      type={stepStatus.details === 'fulfilled' ? 'positive' : 'primary'}
                      onClick={() =>
                        setStepStatus({
                          chain: 'pending',
                          collection: 'pending',
                          details: 'active',
                          deploy: 'pending',
                        })
                      }
                      steps={[
                        {
                          status: stepStatus.details,
                          titleText: 'Add details',
                          subtitleText:
                            'Select predefined plug-ins from right panel, or custom yours',
                          stepNumber: '3',
                        },
                      ]}
                    />
                    <StyledLine />
                  </StyledMultiStepIndicatorWrapper>
                  <StyledTransitionDiv show={stepStatus.details === 'active'}>
                    <DetailFields formHook={formHook} onChange={onChange} />
                  </StyledTransitionDiv>
                </StyledWizardWrapper>

                <StyledWizardWrapper>
                  <StyledMultiStepIndicatorWrapper>
                    <StyledMultiStepIndicator
                      type={stepStatus.deploy === 'fulfilled' ? 'positive' : 'primary'}
                      onClick={() =>
                        setStepStatus({
                          chain: 'pending',
                          collection: 'pending',
                          details: 'pending',
                          deploy: 'active',
                        })
                      }
                      steps={[
                        {
                          status: stepStatus.deploy,
                          titleText: 'Deploy',
                          subtitleText: '',
                          stepNumber: '4',
                        },
                      ]}
                    />
                  </StyledMultiStepIndicatorWrapper>
                  {/* <StyledTransitionDiv show={stepStatus.deploy === 'active'}>
                    <Button size={Button.sizes.Small} onClick={handleDeployContract}>
                      <Typography
                        value='Deploy'
                        type={Typography.types.LABEL}
                        size={Typography.sizes.md}
                      />
                    </Button>
                  </StyledTransitionDiv> */}
                </StyledWizardWrapper>
              </StyledStepperContainer>
            </StyledFormSection>
          </StyledFormWrapper>

          <StyledButtonWrapper>
            {stepStatus.deploy === 'active' ? (
              <DeployButton
                contract={contract}
                onFinish={() => {
                  setStepStatus(prev => ({ ...prev, deploy: 'fullfilled' }))
                  closeModal()
                }}
              />
            ) : (
              <Button
                leftIcon={PlayOutline}
                size={Button.sizes.LARGE}
                onClick={() => {
                  if (stepStatus.chain === 'active') {
                    setStepStatus({ ...stepStatus, chain: 'fulfilled', collection: 'active' })
                  } else if (stepStatus.collection === 'active') {
                    setStepStatus({ ...stepStatus, collection: 'fulfilled', details: 'active' })
                  } else if (stepStatus.details === 'active') {
                    setStepStatus({ ...stepStatus, details: 'fulfilled', deploy: 'active' })
                  } else if (stepStatus.deploy === 'active') {
                    setStepStatus({ ...stepStatus, deploy: 'fulfilled' })
                  }
                }}
              >
                {stepStatus.deploy === 'active' ? 'Deploy' : 'Next'}
              </Button>
            )}
          </StyledButtonWrapper>
        </StyledContainer>

        <StepDetails showCode={showCode} contract={contract} stepStatus={stepStatus} />
      </StyledForm>
    </StyledRoot>
  )
}

export default CreateContractForm
