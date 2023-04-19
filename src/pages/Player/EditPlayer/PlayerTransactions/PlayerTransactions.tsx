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

const PlayerTransactions = () => {
  // const { transactionsByPlayer } = useEditPlayer()
  const gridRef: any = useRef({})
  // const [groupPanel, setGroupPanel] = useState(false)

  const config = columnConfig()

  return (
    <>
      <StyledHeader>
        <Heading
          type={Heading.types.h1}
          value={`${DUMMY_DATA.length} Transactions`}
          customColor={'#FFF'}
        />

        <div>
          <MenuButton component={MenuDots}></MenuButton>
        </div>
      </StyledHeader>

      <DataGrid ref={gridRef as any} data={DUMMY_DATA} columnConfig={config} />
    </>
  )
}

export default PlayerTransactions

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 32px;
`
