import { useMemo, useState } from 'react'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import styled, { css } from 'styled-components'

import { Contract } from 'services/useContractService'
import SelectChainStepDetails from './SelectChainStepDetails'
import PlugInsComponent from 'pages/Contract/ContractComponents/PlugInsComponent'
import DeployDetails from './DeployDetails'
import { ContractFormHook } from '../useContractForm'

export interface StepStatus {
  chain: string
  collection: string
  details: string
  deploy: string
}

type StepDetailsProps = {
  stepStatus: StepStatus
  contract?: Contract
  showCode: boolean
  formHook: ContractFormHook
}

export const CODE_HIGHLIGHTER_STYLE = {
  ...tomorrowNightBlue,
  hljs: {
    background: 'transparent',
    color: '#81D4FA',
    // color: '#FFFFFFCC',
  },
  ['hljs-comment']: { color: '#66BB6A' },
  ['hljs-keyword']: { color: '#BA68C8' },
  ['hljs-built_in']: { color: '#FFFFFFCC' },
  ['hljs-params']: { color: '#81D4FA' },
}

const StepDetails = ({ showCode, contract, stepStatus, formHook }: StepDetailsProps) => {
  const [activeTab, setActiveTab] = useState(0)

  const panels = useMemo(() => {
    return contract?.source_code?.map(file => (
      <TabPanel key={file.file_name}>
        <SyntaxHighlighter language='solidity' style={CODE_HIGHLIGHTER_STYLE}>
          {file.code}
        </SyntaxHighlighter>
      </TabPanel>
    ))
  }, [contract?.source_code])

  return (
    <StyledStepDetailWrapper>
      <StyledStepDetail>
        <StyledADetailTransition show={showCode}>
          {contract && (
            <>
              <TabsContext activeTabId={activeTab}>
                <TabList size='small'>
                  {contract?.source_code.map((file, index: number) => (
                    <Tab key={file.file_name} onClick={() => setActiveTab(index)}>
                      {file.file_name}
                    </Tab>
                  ))}
                </TabList>

                <TabPanels>{panels}</TabPanels>
              </TabsContext>
            </>
          )}
        </StyledADetailTransition>

        <StyledADetailTransition show={!showCode}>
          {stepStatus.chain === 'active' && <SelectChainStepDetails />}
          {stepStatus.details === 'active' && <PlugInsComponent formHook={formHook} />}
          {stepStatus.deploy === 'active' && <DeployDetails />}
        </StyledADetailTransition>
      </StyledStepDetail>
    </StyledStepDetailWrapper>
  )
}

export default StepDetails

export const StyledADetailTransition = styled.div<{ show: boolean }>`
  display: none;
  ${p =>
    p.show &&
    css`
      display: flex;
      flex-direction: column;
      gap: 20px;
    `};

  & .tab-panels--wrapper {
    margin-top: 30px;
  }
`

export const StyledCodeWrapper = styled.div`
  max-width: 100%;
  overflow: scroll;
`

export const StyledStepDetailWrapper = styled.div`
  padding: 28px 60px;
  padding-bottom: 0px;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  max-height: 100vh;
`

export const StyledStepDetail = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100%;
  max-width: 40vw;

  border-radius: 6px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
