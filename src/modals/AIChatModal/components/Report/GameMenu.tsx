import { useGamesService } from 'services/useGameService'
import styled from 'styled-components'
import GamesIcon from '@l3-lib/ui-core/dist/icons/Games'
import Loader from '@l3-lib/ui-core/dist/Loader'
import { enterIcon } from 'assets/icons'
import MarkIconSvg from '../../assets/mark_icon.svg'
import { IChatMessage } from 'modals/AIChatModal/types'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'

type GameMenuProps = {
  message: IChatMessage
}

const GameMenu = ({ message }: GameMenuProps) => {
  const { report } = message
  const { updateMessage } = useChatState()

  const { data, loading } = useGamesService({
    page: 1,
    limit: 100,
    search_text: '',
  })

  if (loading) {
    return (
      <StyledLoader>
        <Loader />
      </StyledLoader>
    )
  }

  const selectedGameId = report?.gameId

  return (
    <Menu>
      {data?.items?.map((item: any) => {
        const { id, name } = item
        const isSelected = id === selectedGameId

        const handleSelect = (id: string) => {
          updateMessage(message.id, {
            report: {
              gameId: isSelected ? undefined : id,
            },
          })
        }

        return (
          <MenuItem
            aria-selected={isSelected}
            key={id}
            onClick={() => handleSelect(id)}
            showItems={selectedGameId === id || !selectedGameId}
          >
            <ItemName>
              <GamesIcon />
              {name}
            </ItemName>

            {isSelected ? (
              <img src={MarkIconSvg} alt='selected' />
            ) : (
              <StyleEnterGroup>
                <span>Enter</span>
                <img src={enterIcon} alt='click enter' />
              </StyleEnterGroup>
            )}
          </MenuItem>
        )
      })}
    </Menu>
  )
}

export default GameMenu

const Menu = styled.ul`
  all: unset;
  list-style: none;
`

const StyleEnterGroup = styled.div`
  visibility: hidden;
  display: flex;
  align-items: center;
  gap: 16px;
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
  }
`

const MenuItem = styled.li<{ showItems?: boolean }>`
  cursor: pointer;
  position: relative;

  :hover {
    background: rgba(255, 255, 255, 0.1);

    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 6px;

    ${StyleEnterGroup} {
      visibility: visible;
    }
  }
  &[aria-selected='true'] {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    ${StyleEnterGroup} {
      visibility: visible;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 6px;
      padding: 1px; /* control the border thickness */
      background: linear-gradient(180deg, #73fafd 0%, #50b1d7 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      border: none;
    }
  }

  margin-top: 2px;
  // border: 1px solid rgba(255, 255, 255, 0.4);
  // border-radius: 6px;
  position: relative;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  padding: 10px 16px;
  color: #ffffff;
  display: ${p => (p.showItems ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
`

const ItemName = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;

  svg {
    width: 27px;
    height: 20px;
  }
`

const StyledLoader = styled.div`
  width: 32px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8px;
`
