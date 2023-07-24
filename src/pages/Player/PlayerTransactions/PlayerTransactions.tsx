import DataGrid from 'components/DataGrid'
import { useRef } from 'react'
import columnConfig from '../columnConfigs/playerTransactionColumnConfig'

import Heading from '@l3-lib/ui-core/dist/Heading'

import MenuButton from '@l3-lib/ui-core/dist/MenuButton'

import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import { StyledHeaderGroup } from 'styles/globalStyle.css'

import usePlayerTransactions from './usePlayerTransactions'
import { StyledGroupContainer } from 'components/Layout/LayoutStyle'

const PlayerTransactions = () => {
  // const { transactionsByPlayer } = useEditPlayer()
  const gridRef: any = useRef({})
  // const [groupPanel, setGroupPanel] = useState(false)

  const { transactionsByPlayer } = usePlayerTransactions()

  console.log('transactionsByPlayer', transactionsByPlayer)

  const config = columnConfig()

  return (
    <StyledGroupContainer mt='10'>
      <div id='header_group'>
        <div id='inner_navigation'>
          <StyledHeaderGroup>
            <Heading
              type={Heading.types.h1}
              value={`${transactionsByPlayer?.items?.length || ''} Transactions`}
              customColor={'#FFF'}
            />

            <div>
              <MenuButton component={MenuDots}></MenuButton>
            </div>
          </StyledHeaderGroup>
        </div>
      </div>
      <DataGrid
        ref={gridRef as any}
        data={transactionsByPlayer?.items || []}
        columnConfig={config}
        headerHeight={130}
      />
    </StyledGroupContainer>
  )
}

export default PlayerTransactions
