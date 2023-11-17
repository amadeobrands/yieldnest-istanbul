'use client'
import { useState } from 'react'

import { Menu, X } from 'lucide-react'
import NavLinks from './NavLinks'

const MobileMenu = () => {

  const [isOpen, setIsOpen] = useState(false)
  const closeMobileMenu = () => setIsOpen(false)

  return (
    <div>
      {/* On click menu drops down with a list of menu options */}
      <div className='mr-3'>
        <Menu size='2em' className='cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
      </div>
      {isOpen &&  
        <div 
          className={'absolute top-0 z-10 left-0 w-full min-h-screen bg-background dark:bg-background'}
        >
          <div className='flex justify-end p-4 border-b-2 border-card'>
            <X size='2em' className='cursor-pointer hover:text-secondary' onClick={closeMobileMenu} />
          </div>
          <div className='px-6' onClick={closeMobileMenu}>
            <NavLinks />
          </div>
        </div>
      }
    </div>
  )
}

export default MobileMenu
