import DataGrid from 'components/DataGrid'
import { useRef } from 'react'
import columnConfig from '../columnConfigs/playerTransactionColumnConfig'

import Heading from '@l3-lib/ui-core/dist/Heading'

import MenuButton from '@l3-lib/ui-core/dist/MenuButton'

import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import { StyleHeaderGroup } from 'styles/globalStyle.css'

import usePlayerTransactions from './usePlayerTransactions'

const PlayerTransactions = () => {
  // const { transactionsByPlayer } = useEditPlayer()
  const gridRef: any = useRef({})
  // const [groupPanel, setGroupPanel] = useState(false)

  const { transactionsByPlayer } = usePlayerTransactions()

  const config = columnConfig()

  return (
    <>
      <StyleHeaderGroup>
        <Heading
          type={Heading.types.h1}
          value={`${transactionsByPlayer?.items?.length || ''} Transactions`}
          customColor={'#FFF'}
        />

        <div>
          <MenuButton component={MenuDots}></MenuButton>
        </div>
      </StyleHeaderGroup>

      <DataGrid
        ref={gridRef as any}
        data={transactionsByPlayer?.items || []}
        columnConfig={config}
        headerHeight={130}
      />
    </>
  )
}

export default PlayerTransactions
