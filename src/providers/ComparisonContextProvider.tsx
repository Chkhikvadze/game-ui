import React from 'react'

import { ComparisonContext } from 'contexts'

type ComparisonContextProviderProps = { children: any }
type vehicleType = {
  id: string,
  make: string,
  model: string,
  img_source: string,
  power_train_type: string,
  trim_name: string,
  year: string,
  drive_transmission: string,
}

const ComparisonContextProvider = ({ children }: ComparisonContextProviderProps) => {
  const [vehicles, updateVehicles] = React.useState<Array<vehicleType>>([])

  const isCompared = (vehicleId: string) =>
    Boolean(vehicles.find(vehicle => vehicle.id === vehicleId))

  const addVehicle = (vehicle: vehicleType) => {
    updateVehicles(list => list.concat([vehicle]))
  }

  const removeVehicle = (vehicleId: string) => {
    updateVehicles(list => list.filter(vehicle => vehicle.id !== vehicleId))
  }

  const clear = () => { updateVehicles([]) }

  const contextValue = {
    vehicles,
    addVehicle,
    removeVehicle,
    isCompared,
    clear,
  }

  return (
    <ComparisonContext.Provider value={contextValue}>
      {children}
    </ComparisonContext.Provider>
  )
}

export default ComparisonContextProvider
