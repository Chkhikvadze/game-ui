import React, { useState } from 'react'

import { LayoutContext } from 'contexts'

export const LayoutProvider = ({ children }: any) => {
  const [expand, setExpand] = useState(false)

  const onChangeLayout = () => setExpand(prevValue => !prevValue)

  const contextValue = {
    expand,
    onChangeLayout,
  }

  return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>
}

export default LayoutProvider
