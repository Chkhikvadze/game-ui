import { useLocation } from 'react-router-dom'

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
const playerSuggestions = [
  'player',
  'collection?',
  'collection?',
  '2 + 2 ?',
  'Can you tell some dad jokes?',
]

export const useSuggestions = () => {
  let chatSuggestions = homeSuggestions

  const location = useLocation()
  const { pathname } = location

  if (pathname.includes('player')) {
    chatSuggestions = playerSuggestions
  } else if (pathname.includes('collection')) {
    chatSuggestions = collectionSuggestions
  } else if (pathname.includes('game')) {
    chatSuggestions = gameSuggestions
  }

  return { chatSuggestions }
}
