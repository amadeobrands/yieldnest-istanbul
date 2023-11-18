'use client'

import { CONFIG } from '../config'

const notificationsSupported = () =>
  'Notification' in window &&
  'serviceWorker' in navigator &&
  'PushManager' in window

export default function Notifications() {
  if (!notificationsSupported()) {
    return <h3>Please install the PWA first!</h3>
  }

  const subscribe = async () => {
    await unregisterServiceWorkers()

    const swRegistration = await registerServiceWorker()
    await window?.Notification.requestPermission()

    try {
      const options = {
        applicationServerKey: CONFIG.PUBLIC_KEY,
        userVisibleOnly: true,
      }
      const subscription = await swRegistration.pushManager.subscribe(options)

      await saveSubscription(subscription)

      console.log({ subscription })
    } catch (err) {
      console.error('Error', err)
    }
  }

  return (
    <>
      <h3>Push Notifications</h3>
      {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={subscribe}>Ask permission and subscribe!</button>
    </>
  )
}

export const unregisterServiceWorkers = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations()
  await Promise.all(registrations.map((r) => r.unregister()))
}

const registerServiceWorker = async () => {
  return navigator.serviceWorker.register('/service.js')
}

const saveSubscription = async (subscription: PushSubscription) => {
  const ORIGIN = window.location.origin
  const BACKEND_URL = `${ORIGIN}/api/push`

  const response = await fetch(BACKEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  })
  return response.json()
}
