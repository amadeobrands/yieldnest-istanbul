'use client'
import Link from 'next/link'

import useMemoizedAddressLabel from '@/hooks/useMemoizedAddressLabel'
import { useAccountAbstraction } from '@/contexts/accountAbstractionContext'

import { Copy, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


type AddressLabelProps = {
  address: string
  isTransactionAddress?: boolean
  showBlockExplorerLink?: boolean
  showCopyIntoClipboardButton?: boolean
}

const AddressLabel = ({
  address,
  isTransactionAddress,
  showBlockExplorerLink,
  showCopyIntoClipboardButton = true
}: AddressLabelProps) => {
  const { chain } = useAccountAbstraction()

  const addressLabel = useMemoizedAddressLabel(address)

  const blockExplorerLink = `${chain?.blockExplorerUrl}/${
    isTransactionAddress ? 'tx' : 'address'
  }/${address}`

  return (
    <div className='flex flex-col justify-center'>
      <p className='font-bold'>Address:</p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{addressLabel}</TooltipTrigger>
          <TooltipContent>
            {address}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>


      {/* Button to copy into clipboard */}
      <div className='flex gap-2'>
        {showCopyIntoClipboardButton && (        
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><Copy /></TooltipTrigger>
              <TooltipContent>
                <div
                className='font-sm flex gap-2 items-center'
                onClick={() => navigator?.clipboard?.writeText?.(address)}
                >
                  {`Copy this ${
                  isTransactionAddress ? 'transaction hash' : 'address'
                } into your clipboard`}
                </div> 
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {/* Button to etherscan */}
        {showBlockExplorerLink && blockExplorerLink && (
          <Link href={blockExplorerLink} target="_blank" rel="noopener">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger><ExternalLink /></TooltipTrigger>
                <TooltipContent>
                  View details on block explorer
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        )}

      </div>
    </div>
  )
}

export default AddressLabel
