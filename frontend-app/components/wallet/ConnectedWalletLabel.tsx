
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

import AddressLabel from '@/components/wallet/AddressLabel'
import { useAccountAbstraction } from '@/contexts/accountAbstractionContext'

// TODO: rename this to connected owner?
function ConnectedWalletLabel() {
  const { isAuthenticated, ownerAddress, logoutWeb3Auth } = useAccountAbstraction()

  if (!isAuthenticated) {
    // TODO: ADD NO CONNECTED WALLET LABEL
    return null
  }

  return (
    <div className='flex flex-col items-center justify-between'>
      <div className='flex items-center gap-2'>
        <p>
          {ownerAddress && <AddressLabel address={ownerAddress} showBlockExplorerLink />}
        </p>
      </div>

      {/* logout button */}
      <Button>
        <LogOut onClick={logoutWeb3Auth} />
      </Button>
    </div>
  )
}

export default ConnectedWalletLabel

