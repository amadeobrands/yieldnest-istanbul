
export type TAddressReal = '/^0x[0-9a-f]{40}$/i';
export type	TAddressWagmi = `0x${string}`;
export type TAddress = TAddressWagmi;
export type TAddressLike = TAddressReal| TAddressWagmi | string;
