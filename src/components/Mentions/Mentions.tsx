import { ChangeEvent } from 'react'
import { Mention, MentionsInput } from 'react-mentions'

import defaultMentionStyle from './defaultMentionStyle'
import defaultStyle from './defaultStyle'

import styled from 'styled-components'
import {
  ICollection,
  IGame,
  useAssignedUserListService,
  useCollectionsService,
  useGamesService,
} from 'services'

import Typography from '@l3-lib/ui-core/dist/Typography'

import Games from '@l3-lib/ui-core/dist/icons/Games'
import Collection from '@l3-lib/ui-core/dist/icons/Collection'

import RandomAvatarIcon from './components/RandomAvatarIcon'

type OnChangeHandlerType = (event: { target: { value: string } }) => void

type MentionsProps = {
  inputRef: React.RefObject<HTMLTextAreaElement> | null
  value: string
  onChange: OnChangeHandlerType
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const Mentions = ({ inputRef, onChange, onKeyDown, value }: MentionsProps) => {
  const data: any = []

  const { data: games } = useGamesService({
    page: 1,
    limit: 100,
    search_text: '',
  })
  const { data: collections } = useCollectionsService({
    page: 1,
    limit: 100,
    search_text: '',
  })

  const { data: users } = useAssignedUserListService()

  const usersData: any = users?.map((user: any) => {
    return {
      display: user.assigned_user_first_name,
      id: `user__${user.assigned_user_id}`,
      type: 'Team Member',
      icon: <RandomAvatarIcon />,
    }
  })

  const gamesData: any = games?.items?.map((game: IGame) => {
    return {
      display: game.name,
      id: `game__${game.id}`,
      type: 'Game',
      icon: <Games />,
    }
  })

  const collectionsData: any = collections?.items?.map((collection: ICollection) => {
    return {
      display: collection.name,
      id: `collection__${collection.id}`,
      type: 'Collection',
      icon: <Collection />,
    }
  })

  if (usersData) {
    data.push(...usersData)
  }

  if (gamesData) {
    data.push(...gamesData)
  }

  if (collectionsData) {
    data.push(...collectionsData)
  }

  const displayTransform = (id: string) => {
    const display = data.find((item: any) => item.id.includes(id))?.display
    // Add the "@" symbol to the display when the suggestion is picked
    return `@${display}`
  }

  return (
    <>
      <StepWrapper>
        <div className='direction-input-wrapper'>
          <StyledMentionsInput
            style={defaultStyle}
            className='direction-input'
            // forceSuggestionsAboveCursor
            inputRef={inputRef}
            onKeyDown={onKeyDown}
            value={value}
            onChange={onChange}
            customSuggestionsContainer={children => <StyledContainer>{children}</StyledContainer>}
          >
            <Mention
              renderSuggestion={suggestion => {
                const { type, icon }: any = suggestion
                return (
                  <StyledSuggestionsWrapper>
                    <StyledNameWrapper>
                      {icon}
                      <div>{suggestion.display}</div>
                    </StyledNameWrapper>

                    <Typography
                      value={type}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.xss}
                      customColor={'rgba(255, 255, 255, 0.4)'}
                    />
                  </StyledSuggestionsWrapper>
                )
              }}
              style={defaultMentionStyle}
              displayTransform={displayTransform}
              data={data}
              trigger={'@'}
              markup='@[__display__](__id__)__mention__'
            />
          </StyledMentionsInput>
        </div>
      </StepWrapper>
    </>
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
    width: 100%;
  }
`

const StyledContainer = styled.div`
  background: rgba(0, 0, 0, 0.1);
  /* background: red; */

  width: 100%;

  position: fixed;
  bottom: 55px;
  left: 50%;
  transform: translateX(-50%);

  /* border-radius: 8px; */
  padding: 10px 0;
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);
`
const StyledSuggestionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`
const StyledNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
