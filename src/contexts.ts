import React from 'react'

type UserContextValue = {
  user: any,
  loading: boolean,
  isAuthenticated: boolean,
  account: any
}

type ModalContextValue = {
  modals: object,
  openModal: (params: { name: string, data?: any }) => void,
  closeModal: (name: string) => void,
}


export const AuthContext = React.createContext<UserContextValue>({
  user: null,
  loading: false,
  isAuthenticated: false,
  account: null,
})

export const ModalContext = React.createContext<ModalContextValue>({
  modals: {},
  openModal: (params) => {},
  closeModal: (name) => {},
})


