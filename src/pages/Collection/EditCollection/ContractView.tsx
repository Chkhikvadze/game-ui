import Typography from '@l3-lib/ui-core/dist/Typography'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import { useState } from 'react'

interface File {
  file_name: string
  code: string
}

type ContractViewProps = {
  contract: Record<string, any>
}

const ContractView = ({ contract }: ContractViewProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const { source_code, name } = contract

  return (
    <div>
      <Typography
        value={name}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor='#fff'
      />

      <TabsContext activeTabId={activeTab}>
        <TabList>
          {source_code.map((file: File, index: number) => (
            <Tab key={file.file_name} onClick={() => setActiveTab(index)}>
              {file.file_name}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {source_code.map((file: File) => (
            <TabPanel key={file.file_name}>
              <code key={file.file_name}>
                <pre>{file.code}</pre>
              </code>
            </TabPanel>
          ))}
        </TabPanels>
      </TabsContext>
    </div>
  )
}

export default ContractView
