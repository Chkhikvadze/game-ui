import useEditPlayer from '../useEditPlayer'
import { DUMMY_DATA } from './DUMMY_DATA'
import DataGrid from 'components/DataGrid'
import { useRef, useState } from 'react'
import columnConfig from './columnConfig'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Button from '@l3-lib/ui-core/dist/Button'
import MenuButton from '@l3-lib/ui-core/dist/MenuButton'

import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'
import styled from 'styled-components'

import { StyleHeaderGroup } from 'styles/globalStyle.css'

const PlayerTransactions = () => {
  // const { transactionsByPlayer } = useEditPlayer()
  const gridRef: any = useRef({})
  // const [groupPanel, setGroupPanel] = useState(false)

  const { transactionsByPlayer } = useEditPlayer()

  const config = columnConfig()

  return (
    <>
      <StyleHeaderGroup>
        <Heading
          type={Heading.types.h1}
          value={`${transactionsByPlayer?.items?.length} Transactions`}
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
        calcHeight={130}
      />
    </>
  )
}

export default PlayerTransactions
