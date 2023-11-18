import dynamic from 'next/dynamic'
import { Account, Connect, NetworkSwitcher, Subscribe } from '../components'
import { useIsMounted } from '../hooks'

const Notifications = dynamic(() => import('../components/Notifications'), {
  ssr: false, // Make sure to render component client side to access window and Notification APIs
})

const Page = () => {
  const isMounted = useIsMounted()

  if (!isMounted) return null
  return (
    <>
      <Connect />
      {/* <Account /> */}
      {/* <NetworkSwitcher /> */}
      <Subscribe />
      <Notifications />
    </>
  )
}

export default Page
