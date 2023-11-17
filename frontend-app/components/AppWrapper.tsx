'use client'
import {ReactNode} from 'react'
import Header from '@/components/Header'


import type { ReactElement } from 'react'


function	AppWrapper({ children }: {children: ReactNode }): ReactElement {

	return (
		<div>
			<Header />
      {children}
		</div>
	);
}

export default AppWrapper
