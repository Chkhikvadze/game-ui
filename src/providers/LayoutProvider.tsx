import React, { useState } from 'react'

import { LayoutContext } from 'contexts'

export const LayoutProvider: React.FC = ({ children }: any) => {
  const [expand, setExpand] = useState(false)
  console.log('🚀 ~ expand:', expand)

  const onChangeLayout = () => setExpand(prevValue => !prevValue)

  const contextValue = {
    expand,
    onChangeLayout,
  }

  return <LayoutContext.Provider value={contextValue}>{children}</LayoutContext.Provider>
}

export default LayoutProvider
