import DataGrid from 'components/DataGrid'
import { useRef } from 'react'
import columnConfig from '../../Player/columnConfigs/playerTransactionColumnConfig'

import Heading from '@l3-lib/ui-core/dist/Heading'

// import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
// import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import { StyleHeaderGroup } from 'styles/globalStyle.css'
import { useTransactions } from 'services/useTransactionService'
import { useParams } from 'react-router-dom'

const GameTransactions = () => {
  const params = useParams()
  const gameId: string = params.gameId as string
  // const { transactionsByPlayer } = useEditPlayer()
  const gridRef: any = useRef({})
  // const [groupPanel, setGroupPanel] = useState(false)

  const { data: transactionsByGame } = useTransactions({
    game_id: gameId,
    page: 1,
    limit: 100,
  })

  const config = columnConfig()

  return (
    <>
      <StyleHeaderGroup>
        <Heading
          type={Heading.types.h1}
          value={`${transactionsByGame?.items?.length || ''} Transactions`}
          customColor={'#FFF'}
        />

        {/* <div>
          <MenuButton component={MenuDots}></MenuButton>
        </div> */}
      </StyleHeaderGroup>

      <DataGrid
        ref={gridRef as any}
        data={transactionsByGame?.items || []}
        columnConfig={config}
        headerHeight={130}
      />
    </>
  )
}

export default GameTransactions
