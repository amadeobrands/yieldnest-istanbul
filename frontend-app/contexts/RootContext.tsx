'use client'
import React from 'react'

import type { ReactElement } from 'react'
import { AccountAbstractionProvider } from './accountAbstractionContext'

function RootContext({ children }: {
	children: ReactElement

}): ReactElement {
	return (    
    <AccountAbstractionProvider>
      {children}
    </AccountAbstractionProvider>
	);
}

export { RootContext }
