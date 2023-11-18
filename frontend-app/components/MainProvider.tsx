
import { ReactNode } from 'react'

import AppWrapper from '@/components/AppWrapper'
import { RootContext } from '@/contexts/RootContext'


const MainProvider = ({ children }: {children: ReactNode }) => {

  return (
    <RootContext>
      <AppWrapper>
        <main className='grow'>
          {children}
        </main>
      </AppWrapper>
    </RootContext>
  )
}
export default MainProvider
