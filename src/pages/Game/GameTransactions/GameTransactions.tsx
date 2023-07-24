import DataGrid from 'components/DataGrid'
import { useContext, useRef } from 'react'
import columnConfig from '../../Player/columnConfigs/playerTransactionColumnConfig'

import Heading from '@l3-lib/ui-core/dist/Heading'

// import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
// import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import { StyledHeaderGroup } from 'styles/globalStyle.css'
import { useTransactions } from 'services/useTransactionService'
import { useParams } from 'react-router-dom'
import { StyledGroupContainer } from 'components/Layout/LayoutStyle'
import styled from 'styled-components'
import { LayoutContext } from 'contexts'
import { StyledActionsSection } from 'pages/Asset/Assets/Assets'

const GameTransactions = () => {
  const { onChangeLayout, expand } = useContext(LayoutContext)
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

  const dataLength = transactionsByGame?.items?.length || 0

  const config = columnConfig()

  return (
    <StyledGroupContainer>
      <div id='header_group'>
        <div id='inner_navigation'>
          <StyledHeaderGroup>
            <StyledTableValue id='table_value' expand={expand} />
            <StyledExpandButton expand={expand} onClick={prevValue => onChangeLayout(!prevValue)}>
              {expand ? 'Close' : 'Expand'}
            </StyledExpandButton>
            {expand && <StyledGroupContainer mt='10' mb='10'></StyledGroupContainer>}
          </StyledHeaderGroup>
          <StyledDivider />
        </div>
        <StyledActionsSection>
          <StyledTransactionCountWrapper dataLength={dataLength}>
            <Heading
              type={Heading.types.h1}
              value={dataLength === 0 ? '_ Transactions' : `${dataLength} Transactions`}
              size='medium'
              customColor={'rgba(255,255,255,1)'}
            />
          </StyledTransactionCountWrapper>
        </StyledActionsSection>
      </div>

      <DataGrid
        ref={gridRef as any}
        data={transactionsByGame?.items || []}
        columnConfig={config}
        headerHeight={130}
      />
    </StyledGroupContainer>
  )
}

export default GameTransactions

const StyledDivider = styled.div`
  // margin-top: 20px;
`

const StyledExpandButton = styled.button<{ expand?: boolean }>`
  all: unset;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.6);
  padding: 10px 0px;

  ${({ expand }) =>
    expand &&
    `
  position: fixed;
  top: 0;
  right: 0;
  transform: translate(-50%, 50%);
  z-index: 10203040;
`}
`

const StyledTableValue = styled.h1<{ expand?: boolean }>`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: rgba(255, 255, 255, 1);
  ${({ expand }) =>
    expand &&
    `
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  z-index: 10203040;
`}
`

const StyledTransactionCountWrapper = styled.div<{ dataLength: number; expand?: boolean }>`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 50px;
  width: 100%;

  ${props =>
    props.dataLength === 0 &&
    `
    margin-left: 0px;
  `}

  /* Offset when data length is greater than 0 */
  ${props =>
    props.dataLength > 0 &&
    `
    margin-left: 240px;
  `}
`
