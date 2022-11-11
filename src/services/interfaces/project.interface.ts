import { ApolloError } from '@apollo/client'
import { IProject } from 'interfaces'
import { IApolloQuery } from './apollo.interface'

export  interface IProjectQuery extends IApolloQuery {
    data: IProject,
    refetch: any,
    error?: ApolloError
    loading: boolean
}

export interface IProjectsQuery extends IApolloQuery{
    data: Array<IProject>,
    refetch: any,
    error?: ApolloError
    loading: boolean
 }

export interface IProjectQueryLazy extends IProjectQuery{
    getProject: any
}

export interface IProjectsQueryLazy extends IProjectsQuery{
    getProjects: any
}