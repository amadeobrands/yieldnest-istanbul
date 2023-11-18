import { TAddress } from '@/types/index'
import type { Connector } from 'wagmi'
import type { Chain } from './chains'

export type TWeb3Context = {
	address: TAddress | undefined,
	ens: string | undefined,
  ensAvatar: string | null,
	chainID: number,
	isDisconnected: boolean,
	isActive: boolean
	isConnecting: boolean,
	hasProvider: boolean,
	provider?: Connector,
	onConnect: () => Promise<void>,
	onSwitchChain: (newChainID: number) => void,
	openLoginModal: () => void,
	onDeactivate: () => void,
}
