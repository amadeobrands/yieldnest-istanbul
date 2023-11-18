'use client'
import React from 'react'

import type { ReactElement } from 'react'
import { AccountAbstractionProvider } from './accountAbstractionContext'
import { Web3ContextApp } from './useWeb3'


function RootContext({ children }: {
	children: ReactElement

}): ReactElement {
	return (    
    <Web3ContextApp>
      <AccountAbstractionProvider>
        {children}
      </AccountAbstractionProvider>
    </Web3ContextApp>
	);
}

export { RootContext }
