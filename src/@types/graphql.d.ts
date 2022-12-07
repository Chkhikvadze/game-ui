declare module '*.gql' {
  //eslint-disable-next-line
  import { DocumentNode } from 'graphql'
  const Schema: DocumentNode

  export = Schema
}
