import { useRef, useState } from 'react'

import columnConfig from './columnConfig'
import DataGrid from 'components/DataGrid'

import Button from '@l3-lib/ui-core/dist/Button'

import { StyledActionsSection } from 'pages/Asset/Assets/Assets'
import { useRewards } from './useRewards'

const Rewards = () => {
  const gridRef: any = useRef({})
  const [groupPanel, setGroupPanel] = useState(false)

  const { addBlankRewardRow, data } = useRewards()

  const config = columnConfig()

  return (
    <>
      <StyledActionsSection>
        <Button kind={Button.kinds.TERTIARY} onClick={addBlankRewardRow}>
          {'Add row'}
        </Button>
      </StyledActionsSection>

      <DataGrid
        ref={gridRef as any}
        data={data || []}
        columnConfig={config}
        groupPanel={groupPanel}
        headerHeight={70}
      />
    </>
  )
}

export default Rewards
