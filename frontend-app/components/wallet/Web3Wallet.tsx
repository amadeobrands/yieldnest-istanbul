'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useMemo, Fragment } from 'react'

import assert from 'assert'
import { useConnect, usePublicClient } from 'wagmi'
import { useIsMounted } from '@react-hookz/web'
import { useWeb3 } from '@/contexts/useWeb3'
import { truncateHex } from '@/utils/address'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { cn } from '@/lib/utils'

import type { Chain } from 'wagmi'
import type { ReactElement } from 'react'
type TNetwork = {value: number, label: string}

// UI imports
import { ChevronDown, Wallet } from 'lucide-react'
import { Listbox, Transition } from '@headlessui/react'


const toSafeChainID = (chainID: number, fallback: number): number => {
	if (chainID === 1337 || chainID === 31337) {
		return fallback;
	}
	return chainID;
};

function NetworkButton({label, isDisabled, onClick}: {
	label: string,
	isDisabled?: boolean,
	onClick?: () => void,
}): ReactElement {
	return (
		<button
			disabled={isDisabled}
			onClick={onClick}
			suppressHydrationWarning
			className={'mr-4 hidden !cursor-default flex-row items-center border-0 p-0 text-sm hover:!text-neutral-500 md:flex'}>
			<div suppressHydrationWarning className={'relative flex flex-row items-center'}>
				{label}
			</div>
		</button>
	)
}

function CurrentNetworkButton({label, isOpen}: {
	label: string,
	value: number,
	isOpen: boolean
}): ReactElement {
	return (
		<Listbox.Button
			suppressHydrationWarning
			className={'flex flex-row items-center border-0 p-0 text-xs md:flex md:text-sm'}>
			<div
				suppressHydrationWarning
				className={'relative flex flex-row items-center truncate whitespace-nowrap text-xs md:text-sm'}>
				{label}
			</div>
			<div className={'ml-1 md:ml-2'}>
        <ChevronDown
					className={`h-3 w-3 transition-transform md:h-5 md:w-4 ${isOpen ? '-rotate-180' : 'rotate-0'}`} />
			</div>
		</Listbox.Button>
	)
}

export function NetworkSelector({networks}: {networks: number[]}): ReactElement {
	const {onSwitchChain} = useWeb3();
	const publicClient = usePublicClient();
	const {connectors} = useConnect();
	const safeChainID = toSafeChainID(publicClient?.chain.id, Number(process.env.BASE_CHAIN_ID));
	const isMounted = useIsMounted();

	const supportedNetworks = useMemo((): TNetwork[] => {
		const injectedConnector = connectors.find((e): boolean => (e.id).toLocaleLowerCase() === 'injected');
		assert(injectedConnector, 'No injected connector found');
		const chainsForInjected = injectedConnector.chains;

		return (
			chainsForInjected
				.filter(({id}): boolean => id !== 1337 && ((networks.length > 0 && networks.includes(id)) || true))
				.map((network: Chain): TNetwork => (
					{value: network.id, label: network.name}
				))
		);
	}, [connectors, networks]);

	const	currentNetwork = useMemo((): TNetwork | undefined => (
		supportedNetworks.find((network): boolean => network.value === safeChainID)
	), [safeChainID, supportedNetworks]);

	if (supportedNetworks.length === 1) {
		if (publicClient?.chain.id === 1337) {
			return <NetworkButton label={'Localhost'} isDisabled />;
		}
		if (currentNetwork?.value === supportedNetworks[0]?.value) {
			return <NetworkButton label={supportedNetworks[0]?.label} isDisabled />;
		}
		return (
			<NetworkButton
				label={'Invalid Network'}
				onClick={(): void => onSwitchChain(supportedNetworks[0].value)} />
		);
	}

	if (!isMounted() || !currentNetwork) {
		<div className={'relative z-50 mr-4'}>
			<div className={'h-10 w-full animate-pulse bg-neutral-100'} />
		</div>;
	}

	return (
		<div className={'relative mr-4'}>
			<Listbox
				value={safeChainID}
				onChange={(value: unknown): void => onSwitchChain((value as {value: number}).value)}>
				{({open}): ReactElement => (
					<>
						<CurrentNetworkButton
							label={currentNetwork?.label || 'Ethereum'}
							value={currentNetwork?.value || 1}
							isOpen={open} />
						<Transition
							appear
							show={open}
							as={Fragment}>
							<div>
								<Transition.Child
									as={Fragment}
									enter={'ease-out duration-300'}
									enterFrom={'opacity-0'}
									enterTo={'opacity-100'}
									leave={'ease-in duration-200'}
									leaveFrom={'opacity-100'}
									leaveTo={'opacity-0'}>
									<div className={'fixed inset-0 bg-background/60'} />
								</Transition.Child>
								<Transition.Child
									as={Fragment}
									enter={'transition duration-100 ease-out'}
									enterFrom={'transform scale-95 opacity-0'}
									enterTo={'transform scale-100 opacity-100'}
									leave={'transition duration-75 ease-out'}
									leaveFrom={'transform scale-100 opacity-100'}
									leaveTo={'transform scale-95 opacity-0'}>
									<Listbox.Options className={'absolute -inset-x-24 z-50 flex items-center justify-center pt-2 opacity-0 transition-opacity'}>
										<div className={'w-fit rounded-md bg-card p-3 px-5 text-sm text-foreground'}>
                      <p className={'py-1 text-xs text-muted'}>Select a network</p>
											{supportedNetworks.map((network): ReactElement => (
												<Listbox.Option key={network.value} value={network}>
													{({active}): ReactElement => (
                          <div
                            data-active={active}
                            className={'cursor-pointer py-1 text-sm'}>
                            {network?.label}
                          </div>
														
													)}
												</Listbox.Option>
											))}
										</div>
									</Listbox.Options>
								</Transition.Child>
							</div>
						</Transition>
					</>
				)}
			</Listbox>
		</div>
	);
}

function	WalletSelector(): ReactElement {
	const { open } = useWeb3Modal();
	// const { openChainModal } = useChainModal();
	const {isActive, address, ens, ensAvatar, openLoginModal} = useWeb3();
	const [walletIdentity, set_walletIdentity] = useState<string | undefined>(undefined);
  

	useEffect((): void => {
		if (!isActive && address) {
			set_walletIdentity('Invalid Network');
		} else if (ens) {
			set_walletIdentity(ens);
		} else if (address) {
			set_walletIdentity(truncateHex(address, 4));
		} else {
			set_walletIdentity(undefined);
		}
	}, [ens, address, isActive]);

	return (
		<div
			onClick={(): void => {
				if (isActive) {
					open();
				} else if (!isActive && address) {
					// openChainModal?.();
				} else {
					openLoginModal();
				}
			}}>
			<p suppressHydrationWarning className={'!text-xs md:!text-sm'}>
				{walletIdentity ? 
          <span>
						<span className={'relative flex h-8 px-4 cursor-pointer items-center justify-center border border-border rounded-lg bg-background transition-all hover:bg-card'}>
              {ensAvatar ? ensAvatar : ''}{walletIdentity}
						</span>
					</span>
        : (
					<span>
						<span className={'relative flex h-8 px-4 cursor-pointer items-center justify-center border border-border rounded-lg bg-background transition-all hover:bg-card'}>
            <Wallet className={'h-4 w-4 mr-2'} /> {'Connect'}
						</span>
					</span>
				)}
			</p>
		</div>
	);
}

const Web3Wallet = () => {

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
    <div className='flex gap-4 items-center justify-between'>
      <NetworkSelector networks={[]} />
      <WalletSelector />
    </div>
  )
} 

export default Web3Wallet
