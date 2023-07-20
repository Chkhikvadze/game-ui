import { useState } from 'react'
import { Mention, MentionsInput } from 'react-mentions'

import defaultMentionStyle from './defaultMentionStyle'
import defaultStyle from './defaultStyle'

import styled from 'styled-components'
import { useGamesService } from 'services'

type MentionsProps = {
  ref: any
  onChange: any
  value: any
  onKeyDown: any
}

const Mentions = ({ ref, onChange, onKeyDown, value }: MentionsProps) => {
  const { data: games, refetch: refetchGames } = useGamesService({
    page: 1,
    limit: 100,
    search_text: '',
  })
  let data = [{ id: '', display: '', type: '' }]

  const gamesData: any = games?.items?.map((game: any) => {
    return {
      id: game.id,
      display: game.name,
      type: 'game',
    }
  })
  if (gamesData) {
    data = [...gamesData]
  }

  return (
    <StepWrapper>
      <div className='direction-input-wrapper'>
        <StyledMentionsInput
          style={defaultStyle}
          className='direction-input'
          forceSuggestionsAboveCursor
          inputRef={ref}
          onKeyDown={onKeyDown}
          value={value}
          onChange={onChange}
          customSuggestionsContainer={children => <StyledContainer>{children}</StyledContainer>}
        >
          <Mention
            // renderSuggestion={(suggestion, search, highlightedDisplay) => (
            //   <div className='mention-suggestion'>{highlightedDisplay}</div>
            // )}
            style={defaultMentionStyle}
            data={data}
            trigger={'@'}
            markup={'@[__display__](__id__)(__type__)'}
          />
        </StyledMentionsInput>
      </div>
    </StepWrapper>
  )
}

export default Mentions

const StyledMentionsInput = styled(MentionsInput)`
  width: 100%;
`
const StepWrapper = styled.div`
  .direction-input-wrapper {
    border: none;

    textarea {
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
  }

  .mention-suggestion {
    background: red;
  }

  /* .direction-input {
    .direction-input__highlighter {
      .timer {
        background-color: rgba(252, 184, 55, 0.2);
      }
      .temp {
        background-color: rgba(70, 195, 79, 0.2);
      }
    }
  } */
`

const StyledContainer = styled.div`
  background: transparent;
`
