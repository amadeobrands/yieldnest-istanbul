'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { utils } from 'ethers'
import { useAccountAbstraction } from '@/contexts/accountAbstractionContext'
import SendTransaction from '@/components/SendTransaction'

const TransactionFrom = () => {
  const [transferAmount, setTransferAmount] = useState<number>(0.001)

  const {
    chainId,
    chain,

    safeSelected,
    safeBalance,
    web3Provider,
    isRelayerLoading,
    relayTransaction,
    gelatoTaskId,
    isAuthenticated,
    loginWeb3Auth
  } = useAccountAbstraction()

  const hasNativeFunds =
    !!safeBalance && Number(utils.formatEther(safeBalance || '0')) > transferAmount


  const handleChangeAmount = () => {
    
  }

  return (
    <div className=' w-full mt-8 border-2 rounded-lg p-8'>
      <div className='flex flex-col w-full '>
        <h2 className='mb-4 font-xl font-bold'>Deposit</h2>
        <form className='flex flex-col w-full mb-8'>
          <div className='flex w-full justify-between border-2 rounded-lg gap-2 p-2'>
            <p className='w-full'>Amount:</p>
            <input 
            className='flex flex-end w-full text-right overflow-x-scroll border-none px-0 outline-none text-xl scrollbar-none' 
            type="number" 
            placeholder="0.00"
            value={transferAmount}
            onChange={handleChangeAmount}
            />
          </div>
        </form>
          <Button
            disabled={!hasNativeFunds}
            onClick={() => SendTransaction(web3Provider, safeSelected, transferAmount)}
          >
            Send Transaction
          </Button>
      </div>
    </div>
  )
}

export default TransactionFrom
