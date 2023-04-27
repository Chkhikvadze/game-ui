import { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'

import { useSearchParams } from 'react-router-dom'

import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Button from '@l3-lib/ui-core/dist/Button'
import Toast from '@l3-lib/ui-core/dist/Toast'

import Close from '@l3-lib/ui-core/dist/icons/Close'
import PlayOutline from '@l3-lib/ui-core/dist/icons/PlayOutline'
import API from '@l3-lib/ui-core/dist/icons/API'
import Code from '@l3-lib/ui-core/dist/icons/Code'
import { FormProvider } from 'react-hook-form'
import useContractForm from './useContractForm'
import { Contract } from 'services/useContractService'
import StepDetails from './components/StepDetails'
import DetailFields from './components/DetailFields'
import ChooseCollection from './components/ChooseCollection'
import DeploySummary from './components/DeploySummary'
import DeployButton from './components/DeployButton'
import {
  StyledButtonWrapper,
  StyledCodeButton,
  StyledContainer,
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
import ChainCards from './components/ChainCards'
import ContractEditableHeading from './components/ContractEditableHeading'

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
  const client = useApolloClient()

  const [, setSearchParams] = useSearchParams()

  const { formHook, setToast, toast } = useContractForm({
    contract,
  })

  const [stepStatus, setStepStatus] = useState<StepStatus>({
    chain: 'active',
    collection: 'pending',
    details: 'pending',
    deploy: 'pending',
  })

  const [showCode, setShowCode] = useState(false)

  const close = () => {
    client.refetchQueries({
      include: ['contracts'],
    })

    setSearchParams({})
    closeModal()
  }

  return (
    <FormProvider {...formHook}>
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
              onClick={close}
              icon={Close}
              kind={IconButton.kinds.TERTIARY}
              size={IconButton.sizes.LARGE}
            />
          </StyledIconButtonWrapper>

          <StyledContainer>
            <StyledFormWrapper>
              <StyledFormSection>
                <ContractEditableHeading form={formHook} />

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
                        <ChainCards form={formHook} />
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
                      <ChooseCollection formHook={formHook} />
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
                      <DetailFields formHook={formHook} />
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
                    <StyledTransitionDiv show={stepStatus.deploy === 'active'}>
                      <DeploySummary formHook={formHook} />
                    </StyledTransitionDiv>
                  </StyledWizardWrapper>
                </StyledStepperContainer>
              </StyledFormSection>
            </StyledFormWrapper>

            <StyledButtonWrapper>
              {stepStatus.deploy === 'active' ? (
                <DeployButton
                  contract={contract}
                  onFinish={() => {
                    setStepStatus(prev => ({ ...prev, deploy: 'fulfilled' }))
                    close()
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
                      if (
                        !contract?.constructor_args[5] ||
                        contract?.constructor_args[1]?.reduce(
                          (partialSum: any, a: any) => partialSum + a,
                          0,
                        ) === 100
                      ) {
                        setStepStatus({ ...stepStatus, details: 'fulfilled', deploy: 'active' })
                      } else {
                        setToast({
                          type: 'negative',
                          message: `Royalty split total must be 100%`,
                          open: true,
                        })
                      }
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

          <StepDetails
            showCode={showCode}
            contract={contract}
            stepStatus={stepStatus}
            formHook={formHook}
          />
        </StyledForm>
      </StyledRoot>
      <Toast
        label={toast?.message}
        type={toast?.type}
        autoHideDuration={2500}
        open={toast?.open}
        onClose={() => setToast({ open: false })}
      />
    </FormProvider>
  )
}

export default CreateContractForm
