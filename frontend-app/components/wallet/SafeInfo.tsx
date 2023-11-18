'use client'
import { useCallback, useState } from 'react'
import Image from 'next/image'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import { Skeleton, Theme } from '@mui/material'
import { utils } from 'ethers'

import AddressLabel from '@/components/wallet/AddressLabel'
import AmountLabel from '@/components/wallet/AmountLabel'
import getSafeInfo from '@/components/wallet/getSafeInfo'
import useApi from '@/hooks/useApi'
import ynIicon from '@/public/yn-icon.svg'
import usePolling from '@/hooks/usePolling'
import { useAccountAbstraction } from '@/contexts/accountAbstractionContext'
import isContractAddress from '@/utils/isContractAddress'
import safeLogoLight from '@/public/safe-info-logo-light.svg'

type SafeInfoProps = {
  safeAddress: string
  chainId: string
}

// TODO: ADD USDC LABEL
// TODO: ADD CHAIN LABEL

function SafeInfo({ safeAddress, chainId }: SafeInfoProps) {
  const { web3Provider, chain, safeBalance } = useAccountAbstraction()

  const [isDeployed, setIsDeployed] = useState<boolean>(false)
  const [isDeployLoading, setIsDeployLoading] = useState<boolean>(true)

  // detect if the safe is deployed with polling
  const detectSafeIsDeployed = useCallback(async () => {
    const isDeployed = await isContractAddress(safeAddress, web3Provider)

    setIsDeployed(isDeployed)
    setIsDeployLoading(false)
  }, [web3Provider, safeAddress])

  usePolling(detectSafeIsDeployed)

  // safe info from Safe transaction service (used to know the threshold & owners of the Safe if its deployed)
  const fetchInfo = useCallback(
    (signal: AbortSignal) => getSafeInfo(safeAddress, chainId, { signal }),
    [safeAddress, chainId]
  )

  const { data: safeInfo, isLoading: isGetSafeInfoLoading } = useApi(fetchInfo)

  const owners = safeInfo?.owners.length || 1
  const threshold = safeInfo?.threshold || 1
  const isLoading = isDeployLoading || isGetSafeInfoLoading

  return (
    <Stack direction="row" spacing={2}>
      <div style={{ position: 'relative' }}>

         {/* Safe Logo */}
        {isLoading ? (
          <Skeleton variant="circular" width={50} height={50} />
        ) : (
          <Image
            src={safeLogoLight}
            alt="connected Safe account logo"
            className='h-12'
          />
        )}

        {/* Threshold & owners label */}
        {isDeployed && (
          <div className='absolute -top-4 -right-3 rounded-xl p-2'>
            <p className='font-bold'>
              {threshold}/{owners}
            </p>
          </div>
        )}
      </div>

      <div className='flex flex-col'>
        {/* Safe address label */}
        <AddressLabel address={safeAddress} showBlockExplorerLink />

        {isLoading && <Skeleton variant="text" width={110} height={20} />}

        {!isDeployed && !isDeployLoading && (
          <div className='rounded py-0 px-4'>
            <Tooltip title="This Safe is not deployed yet, it will be deployed when you execute the first transaction">
              <Typography fontWeight="700" fontSize="12px" color="inherit">
                Creation pending
              </Typography>
            </Tooltip>
          </div>
        )}

        {!isLoading && (
          <div className='rounded-md'>
            {/* Safe Balance */}
            
            <p className='font-bold'>
              <AmountLabel
                amount={utils.formatEther(safeBalance || '0')}
                tokenSymbol={chain?.token || ''}
              />
            </p>
          </div>
        )}
      </div>
    </Stack>
  )
}

export default SafeInfo
