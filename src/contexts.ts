import React from 'react'

type Vehicle = {
  id: string
  make: string
  model: string
  img_source: string
  power_train_type: string
  trim_name: string
  year: string
  drive_transmission: string
}

type ComparisonContextValue = {
  vehicles: Array<Vehicle>
  clear: () => void
  addVehicle: (vehicle: Vehicle) => void
  removeVehicle: (vehicleId: string) => void
  isCompared: (vehicleId: string) => boolean
}

type UserContextValue = {
  user: any
  loading: boolean
  isAuthenticated: boolean
  account: any
}

type ModalContextValue = {
  modals: object
  openModal: (params: {name: string; data?: any}) => void
  closeModal: (name: string) => void
}

type PageStateContextValue = {
  pageStateValue: any
  updatePageStateValue: (value: any) => void
}

export const PageStateContext = React.createContext<PageStateContextValue>({
  pageStateValue:{},
  updatePageStateValue:() => {
  },
})

export const ComparisonContext = React.createContext<ComparisonContextValue>({
  vehicles:[],
  addVehicle:() => {
  },
  clear:() => {
  },
  removeVehicle:() => {
  },
  isCompared:() => false,
})

export const AuthContext = React.createContext<UserContextValue>({
  user:null,
  loading:false,
  isAuthenticated:false,
  account:null,
})

export const ModalContext = React.createContext<ModalContextValue>({
  modals:{},
  openModal:(params) => {
  },
  closeModal:(name) => {
  },
})

type ScenarioContextType = {
  vehicle: any
  calculations: any
}

export const ScenarioContext = React.createContext<ScenarioContextType>({
  vehicle:null,
  calculations:null,
})
