'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useMemo, Fragment } from 'react'
import { useAccountAbstraction } from '@/contexts/accountAbstractionContext'
import ChainSelector from '@/components/wallet/ChainSelector'
import AmountLabel from '@/components/wallet/AmountLabel'
import useMemoizedAddressLabel from '@/hooks/useMemoizedAddressLabel'

import { utils } from 'ethers'

import SafeInfo from '@/components/wallet/SafeInfo'
import SafeAccount from '@/components/wallet/SafeAccount'
import ConnectedWalletLabel from '@/components/wallet/ConnectedWalletLabel'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import NavLinks from './NavLinks'
import MobileMenu from './MobileMenu'

import ynIcon from '@/public/yn-icon.svg'
import ynLogo from '@/public/yieldnest-dark.svg'


const Header = () => {

  const { isAuthenticated, loginWeb3Auth, logoutWeb3Auth, safeSelected, chainId, safeBalance, chain } = useAccountAbstraction()
  const addressLabel = useMemoizedAddressLabel(safeSelected ? safeSelected : '')

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
            <Image alt='logo' className='block lg:hidden h-8 w-auto' src={ynIcon} />
          </Link>
        </div>
        <div className='hidden lg:flex lg:gap-6 lg:items-center'>
          <Link href='/'>
            <Image alt='logo' className='hidden lg:block h-8 w-auto' src={ynLogo} />
          </Link>
          <NavLinks />
        </div>
      </section>
      <div className='flex gap-4 items-center justify-between'>
        {/* chain label */}
        <ChainSelector />
      {isAuthenticated ? (
        <div className="flex gap-2 items-center">
          {safeBalance && (
          <div className="flex flex-col">
            {/* Safe address */}
            <p>{addressLabel}</p>
            {/* Safe Balance */}
            <p className='font-bold'>
              <AmountLabel
                amount={utils.formatEther(safeBalance || '0')}
                tokenSymbol={chain?.token || ''}
              />
            </p>
          </div>
        )}
          {/* owner ID */}
          <div className='flex'>
            <Button onClick={logoutWeb3Auth}>
              LogOut
            </Button>
            {/* Owner details */}
            {/* <ConnectedWalletLabel /> */}
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-2'>
          <Button onClick={loginWeb3Auth}>
            Connect
          </Button>
        </div>
      )}
      </div>
    </header>
  )
} 

export default Header
