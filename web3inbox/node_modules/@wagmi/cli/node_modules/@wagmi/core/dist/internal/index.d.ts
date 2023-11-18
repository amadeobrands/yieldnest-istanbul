import { CallParameters, SendTransactionParameters } from 'viem';

declare function getCallParameters(args: Omit<CallParameters, 'account'>): Omit<CallParameters, 'account'>;
declare function getSendTransactionParameters(args: Omit<SendTransactionParameters, 'account' | 'chain'>): Omit<SendTransactionParameters, 'account' | 'chain'>;

/**
 * Converts properties of {@link T} to never
 *
 * @param T - Object to convert
 * @returns Object with properties converted to `never`
 *
 * @example
 * type Result = Never<{ foo: string, bar: number }>
 * //   ^? { foo: never, bar: never }
 */
type Never<T> = {
    [K in keyof T]: never;
};

export { Never, getCallParameters, getSendTransactionParameters };
