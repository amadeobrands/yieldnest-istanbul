'use client'

import	React, { createContext, useCallback, useContext, useEffect, useState, ReactElement} from 'react'

import { useWeb3Modal, createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { useIsMounted, useUpdateEffect}  from '@react-hookz/web'


import { useAccount, useConnect, useDisconnect, useEnsName, useEnsAvatar, useNetwork, usePublicClient, useSwitchNetwork, useWalletClient, WagmiConfig } from 'wagmi'
import { mainnet, goerli, polygonZkEvmTestnet, mantleTestnet, lineaTestnet, arbitrumGoerli } from 'viem/chains'
import { toAddress } from '@/utils/address'

import type { TWeb3Context } from '@/types/contexts'

const defaultState = {
	address: undefined,
	ens: undefined,
  ensAvatar: null,
	chainID: 1,
	isDisconnected: false,
	isActive: false,
	isConnecting: false,
	isWalletSafe: false,
	isWalletLedger: false,
	hasProvider: false,
	provider: undefined,
	currentPartner: undefined,
	walletType: 'NONE',
	onConnect: async (): Promise<void> => undefined,
	onSwitchChain: (): void => undefined,
	openLoginModal: (): void => undefined,
	onDeactivate: (): void => undefined
};

const Web3Context = createContext<TWeb3Context>(defaultState);
export const Web3ContextAppWrapper = ({children}: {children: ReactElement}): ReactElement => {
	const {address, isConnecting, isConnected, isDisconnected, connector} = useAccount();
	const {disconnect} = useDisconnect();
	const {switchNetwork} = useSwitchNetwork();

  // ! CALLING ENS NAME AND ENS AVATAR HERE -----------------------
	const {data: ensName} = useEnsName({address: address, chainId: 1});
	const {data: ensAvatar} = useEnsAvatar({name: ensName,});
  // ! ------------------------------------------------------------

	const {data: walletClient} = useWalletClient();
	const {chain} = useNetwork();
	const [currentChainID, set_currentChainID] = useState(chain?.id);
	const publicClient = usePublicClient();
	const isMounted = useIsMounted();
	const { open } = useWeb3Modal()

  useEffect(() => {
    if (isConnected) {
      console.log('ens ---->', ensAvatar)
    }
  }, [isConnected, ensName])
	// const supportedChainsID = useMemo((): number[] => {
	// 	const injectedConnector = connectors.find((e): boolean => (e.id).toLocaleLowerCase() === 'injected');
	// 	assert(injectedConnector, 'No injected connector found')
	// }, [connectors])

	useUpdateEffect((): void => {
		set_currentChainID(chain?.id);
	}, [chain]);


	const onConnect = useCallback(async (): Promise<void> => {
		if (open) {
			open()
		}
	}, [open]);

	const onDeactivate = useCallback((): void => {
		disconnect();
	}, [disconnect]);

	const	onSwitchChain = useCallback((newChainID: number): void => {
		set_currentChainID(newChainID);
		if (isConnected) {
			if (!switchNetwork) {
				console.error(new Error('Switch network function is not defined'));
			}
			switchNetwork?.(newChainID);
		}
	}, [switchNetwork, isConnected]);

	const openLoginModal = useCallback(async (): Promise<void> => {

		if (open) {
			open()
		} 
	}, [open])

	const contextValue = {
		address: address ? toAddress(address) : undefined,
		isConnecting,
		isDisconnected,
		ens: ensName || '',
    ensAvatar: ensAvatar || '',
		isActive: isConnected && isMounted(),
		hasProvider: !!(walletClient || publicClient),
		provider: connector,
		chainID: isConnected ? Number(chain?.id || 1) : Number(currentChainID || 1),
		onConnect,
		onSwitchChain,
		openLoginModal,
		onDeactivate: onDeactivate,
	};

	return (
		<Web3Context.Provider value={contextValue}>
			{children}
		</Web3Context.Provider>
	);
};

// 1. Get projectId
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string

// 2. Create wagmiConfig
const metadata = {
  name: 'Hacakthon YN',
  description: 'Hacakthon YN',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, goerli, mantleTestnet, lineaTestnet, arbitrumGoerli, polygonZkEvmTestnet]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains, enableAnalytics: true, })


export const Web3ContextApp = ({children}: {
	children: ReactElement,
}): ReactElement => {

	return (
		<WagmiConfig config={wagmiConfig}>
				<Web3ContextAppWrapper>
					{children}
				</Web3ContextAppWrapper>
		</WagmiConfig>
	);
};


export const useWeb3 = () => useContext(Web3Context)
