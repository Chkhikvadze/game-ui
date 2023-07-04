import { useParams } from 'react-router-dom'

const homeSuggestions = [
  'home',
  'hello',
  'How are you today?',
  '2 + 2 ?',
  'Can you tell some dad jokes?',
]
const gameSuggestions = [
  'game',
  'How are you?',
  'What are you?',
  '2 + 2 ?',
  'Can you tell some dad jokes?',
]
const collectionSuggestions = [
  'collection',
  'collection?',
  'collection?',
  '2 + 2 ?',
  'Can you tell some dad jokes?',
]

export const useSuggestions = () => {
  const params = useParams()
  let chatSuggestions = homeSuggestions

  const { gameId, collectionId } = params

  if (gameId && !collectionId) {
    chatSuggestions = gameSuggestions
  } else if (collectionId) {
    chatSuggestions = collectionSuggestions
  }

  return { chatSuggestions }
}
