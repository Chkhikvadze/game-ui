import { useMemo, useState } from 'react'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

// @ts-expect-error Fix declaration
import SyntaxHighlighter from 'react-syntax-highlighter'
import {
  tomorrowNightBlue,
  // @ts-expect-error Fix declaration
} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import useDeployContract from './useDeployContract'
import { Contract } from 'services/useContractService'

type ContractViewProps = {
  contract: Contract
}

const ContractView = ({ contract }: ContractViewProps) => {
  const [activeTab, setActiveTab] = useState(0)

  const { handleDeployContract } = useDeployContract({ contract })

  const { source_code, name } = contract

  const panels = useMemo(() => {
    return source_code.map(file => (
      <TabPanel key={file.file_name}>
        <SyntaxHighlighter language='solidity' style={tomorrowNightBlue}>
          {file.code}
        </SyntaxHighlighter>
      </TabPanel>
    ))
  }, [source_code])

  return (
    <div>
      <Button size={Button.sizes.Small} onClick={handleDeployContract}>
        <Typography value='Deploy' type={Typography.types.LABEL} size={Typography.sizes.md} />
      </Button>

      <Typography
        value={name}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor='#fff'
      />

      <TabsContext activeTabId={activeTab}>
        <TabList size='small'>
          {source_code.map((file, index: number) => (
            <Tab key={file.file_name} onClick={() => setActiveTab(index)}>
              {file.file_name}
            </Tab>
          ))}
        </TabList>

        <TabPanels>{panels}</TabPanels>
      </TabsContext>
    </div>
  )
}

export default ContractView
