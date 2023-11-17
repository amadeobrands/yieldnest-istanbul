'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useMemo, Fragment } from 'react'

import NavLinks from './NavLinks'
import MobileMenu from './MobileMenu'

import { cn } from '@/lib/utils'

import ynIcon from '@/public/yn-icon.svg'
import ynLogo from '@/public/yieldnest-dark.svg'


const Header = () => {

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Adjust the value '50' based on when you want the navbar to change its style
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  const classes =cn(
    'fixed top-0 w-full z-[100]',
    'px-6 lg:px-10 py-3 flex items-center justify-between',
    {
      'bg-background/90 backdrop-blur-sm border-b-2 border-muted/20': isScrolled,
      'bg-background dark:bg-background': !isScrolled,
    }
  )

  return (
    <header className={classes}>
      {/* Mobile menu container set to hide on screens wider than 1024px */}
      <section className='flex justify-between'>
        <div className='flex gap-4 lg:hidden'>
          <MobileMenu />
          <Link href='/'>
            Home
            <Image alt='logo' className='block lg:hidden h-8 w-auto' src={ynIcon} />
          </Link>
        </div>
        <div className='hidden lg:flex lg:gap-6 lg:items-center'>
          <Link href='/'>
            Home
            <Image alt='logo' className='hidden lg:block h-8 w-auto' src={ynLogo} />
          </Link>
          <NavLinks />
        </div>
      </section>
      <div className='flex gap-4 items-center justify-between'>
        <button>Wallet</button>
      </div>
    </header>
  )
} 

export default Header
