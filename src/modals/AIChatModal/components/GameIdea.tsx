import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { IChatMessage } from 'modals/AIChatModal/types'
import styled from 'styled-components'
import { enterIcon } from 'assets/icons'
import MarkIconSvg from '../assets/mark_icon.svg'

type GameIdeaProps = {
  message: IChatMessage
}

const GameIdea = ({ message }: GameIdeaProps) => {
  const { gameIdeas } = message
  const { setGameIdea, currentChat } = useChatState()

  return (
    <>
      <Menu>
        {gameIdeas?.map((idea: any) => {
          const isSelected = idea.name === currentChat?.gameIdea?.name

          return (
            <MenuItem
              key={idea.id}
              onClick={() => {
                setGameIdea(idea)
              }}
              aria-selected={isSelected}
            >
              <StyledImageWrapper>
                {idea.image ? <img src={idea.image} alt={idea.name} /> : 'No image'}
              </StyledImageWrapper>
              <StyledInfoGroup>
                {/* <div>ID: {idea.id}</div> */}
                <h2>Title: {idea.name}</h2>
                <p>Description: {idea.description}</p>
              </StyledInfoGroup>
              {isSelected ? (
                <StyleEnterGroup>
                  <img src={MarkIconSvg} alt='selected' />
                </StyleEnterGroup>
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
      {/* <br />
      <h3>Chosen Game Idea:</h3>
      {currentChat?.gameIdea && <h3> {currentChat?.gameIdea?.name}</h3>}
      <h3
        onClick={() => {
          setGameIdea(null)
        }}
      >
        Remove Selected
      </h3> */}
    </>
  )
}

export default GameIdea

const Menu = styled.ul`
  all: unset;
  list-style: none;
`

const StyleEnterGroup = styled.div`
  visibility: hidden;
  display: flex;
  align-items: start;
  gap: 16px;
  justify-content: center;
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
  }
`

const MenuItem = styled.li`
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

    // border: 1px solid rgba(255, 255, 255, 0.4);
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
  padding: 12px 8px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  margin-bottom: 16px;
  display: grid;
  grid-template-columns: auto 1fr 90px;
  gap: 14px;
  min-height: 144px;
`

const StyledImageWrapper = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  object-fit: contain;
  width: 96px;
  height: 96px;
  position: relative;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

const StyledInfoGroup = styled.div`
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #ffffff;
  }
  p {
    font-style: normal;
    font-weight: 450;
    font-size: 12px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.6);
  }
`
