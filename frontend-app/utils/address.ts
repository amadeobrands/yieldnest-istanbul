import { getAddress, isAddress, zeroAddress } from 'viem'

import type { TAddress, TAddressLike, TAddressReal } from '@/types/index'


function isTAddress(address?: string | null): address is TAddress {
	const regex = /^0x([0-9a-f][0-9a-f])*$/i;
	return !!address && regex.test(address);
}

function checksumAddress(address?: string | null | undefined): TAddressReal {
	try {
		if (address && address !== 'GENESIS' && isAddress(address)) {
			const checksummedAddress = getAddress(address);
			if (isTAddress(checksummedAddress)) {
				return checksummedAddress as TAddressReal;
			}
		}
	} catch (error) {
		// TODO - Send error to Sentry
		console.error(error);
	}
	return zeroAddress as TAddressReal;
}

export function truncateHex(address: string | undefined, size: number): string {
	if (address !== undefined) {
		if (size === 0) {
			return address;
		}
		return `${address.slice(0, size)}...${address.slice(-size)}`;
	}
	if (size === 0) {
		return zeroAddress;
	}
	return '0x000...0000';
}

export function toAddress(address?: TAddressLike | null): TAddress {
	if (!address) {
		return zeroAddress;
	}
	return getAddress(checksumAddress(address)?.valueOf())
}
