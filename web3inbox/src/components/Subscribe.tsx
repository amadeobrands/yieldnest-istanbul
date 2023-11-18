'use client'

import {
  useInitWeb3InboxClient,
  useManageSubscription,
  useMessages,
  useSubscription,
  useW3iAccount,
} from '@web3inbox/widget-react'
import { useCallback, useEffect } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import webpush from 'web-push'
import { CONFIG } from '../config'
import { getSubscriptionsFromDb } from '../utils/in-memory-db'

// webpush.setVapidDetails(
//   "https://app.obscurity.org",
//   CONFIG.PUBLIC_KEY,
//   CONFIG.PRIVATE_KEY,
// );

export const Subscribe = () => {
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()

  // Initialize the Web3Inbox SDK
  const isReady = useInitWeb3InboxClient({
    // The project ID and domain you setup in the Domain Setup section
    projectId: '60ebdf6cf9d2e46d029f32ce3de219f6',
    domain: 'app.obscurity.org',

    // Allow localhost development with "unlimited" mode.
    // This authorizes this dapp to control notification subscriptions for all domains (including `app.example.com`), not just `window.location.host`
    isLimited: false,
  })

  const { account, setAccount, isRegistered, isRegistering, register } =
    useW3iAccount()
  useEffect(() => {
    if (!address) return
    // Convert the address into a CAIP-10 blockchain-agnostic account ID and update the Web3Inbox SDK with it
    setAccount(`eip155:1:${address}`)
  }, [address, setAccount])

  // In order to authorize the dapp to control subscriptions, the user needs to sign a SIWE message which happens automatically when `register()` is called.
  // Depending on the configuration of `domain` and `isLimited`, a different message is generated.
  const performRegistration = useCallback(async () => {
    if (!address) return
    try {
      await register((message) => signMessageAsync({ message }))
    } catch (registerIdentityError) {
      alert(registerIdentityError)
    }
  }, [signMessageAsync, register, address])

  useEffect(() => {
    // Register even if an identity key exists, to account for stale keys
    performRegistration()
  }, [performRegistration])

  const { isSubscribed, isSubscribing, subscribe } = useManageSubscription()

  const performSubscribe = useCallback(async () => {
    // Register again just in case
    await performRegistration()
    await subscribe()
  }, [subscribe, isRegistered])

  const { subscription } = useSubscription()
  const { messages } = useMessages()
  //   let mes = { title: "title", message: "message" };

  //   useEffect(() => {
  //     if (messages.length !== 0) {
  //       //   getSubscriptionsFromDb().then((subscriptions) => {
  //       //     subscriptions.forEach((s) => {
  //       //       const payload = JSON.stringify({
  //       //         title: messages[messages.length - 1].message.title,
  //       //         body: messages[messages.length - 1].message.body,
  //       //       });
  //       //       webpush.sendNotification(s, payload);
  //       //     });
  //       //   });
  //     }
  //   }, [messages]);

  return (
    <>
      {!isReady ? (
        <div>Loading client...</div>
      ) : (
        <>
          {!address ? (
            <div>Connect your wallet</div>
          ) : (
            <>
              <div>Address: {address}</div>
              <div>Account ID: {account}</div>
              {!isRegistered ? (
                <div>
                  To manage notifications, sign and register an identity
                  key:&nbsp;
                  {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button
                    onClick={performRegistration}
                    disabled={isRegistering}
                  >
                    {isRegistering ? 'Signing...' : 'Sign'}
                  </button>
                </div>
              ) : (
                <>
                  {!isSubscribed ? (
                    <>
                      {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
                      <button
                        onClick={performSubscribe}
                        disabled={isSubscribing}
                      >
                        {isSubscribing
                          ? 'Subscribing...'
                          : 'Subscribe to notifications'}
                      </button>
                    </>
                  ) : (
                    <>
                      <div>You are subscribed</div>
                      <div>Subscription: {JSON.stringify(subscription)}</div>
                      {/* <div>Messages: {JSON.stringify(messages)}</div> */}
                      {messages.map(function (d, idx) {
                        return (
                          // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                          <li key={idx}>
                            Title: {d.message.title} Message: {d.message.body}
                          </li>
                        )
                      })}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}
