import React, { ReactNode } from 'react'
import { ContextProvider } from './context'

function Providers({children}: {children: ReactNode}) {
  return (
    <>
      <ContextProvider>
        {children}
      </ContextProvider>
    </>
  )
}

export default Providers