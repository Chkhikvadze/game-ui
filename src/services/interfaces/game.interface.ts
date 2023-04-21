import { ApolloError } from '@apollo/client'
import { IGame } from 'interfaces'
import { IApolloQuery } from './apollo.interface'

export interface IGameQuery extends IApolloQuery {
  data: IGame
  refetch: any
  error?: ApolloError
  loading: boolean
}

export interface IGamesQuery extends IApolloQuery {
  data: Array<IGame>
  refetch: any
  error?: ApolloError
  loading: boolean
}

export interface IGameQueryLazy extends IGameQuery {
  getGame: any
}

export interface IGamesQueryLazy extends IGamesQuery {
  getGames: any
}
