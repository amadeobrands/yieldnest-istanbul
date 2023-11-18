'use client'
import { useState, useMemo, useEffect } from 'react'

// Web3 Hooks
import { usePrepareContractWrite, useContractWrite, useContractRead, useAccount } from 'wagmi'
import { useDebounce } from 'use-debounce'
import { parseEther, formatEther } from 'viem'
import { erc20ABI } from '@wagmi/core'
import { INITDCA_ABI } from '@/utils/abi/initDCA.abi'

import { Button } from '@/components/ui/button'

type EthereumAddress = `0x${string}`


const Web3Form = () => {

   // Account state - fetches users wallet address
   const { address: accountAddress } = useAccount()

  const [ amount, setAmount ] = useState<string >('')
  const [ debouncedAmount ] = useDebounce(amount, 500)
  const [ sendAmountBigNum ,setSendAmountBigNum ] = useState<( number | null)>()

  useMemo(() => {
    const isValid = /^[0-9.]+$/.test(debouncedAmount)
      if (!isValid) {
        return 0
      } else {
        setSendAmountBigNum(Number(parseEther(debouncedAmount))) 
      }
  }, [debouncedAmount])

  useEffect(() => {
    console.log('sendAmountBigNum --->', sendAmountBigNum)
  },[sendAmountBigNum])

  const DCA_CONTRACT_ADDRESS = '0xf1aAD0CA086bdb973Db6af2b7d67b9A3e881Ed9A'

  const wxDaiAddress = '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d'
  const wETHAddress = '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1'
  
  const { data: balancewxDai  } = useContractRead({
    address: wxDaiAddress,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [accountAddress ? accountAddress : '' as EthereumAddress],
    enabled: accountAddress ? true : false,
    chainId: 100,
  })

  const { data: balancewETH  } = useContractRead({
    address: wETHAddress,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [accountAddress ? accountAddress : '' as EthereumAddress],
    enabled: accountAddress ? true : false,
    chainId: 100,
  })

  // Approve function for DCA contract
  const { config } = usePrepareContractWrite({
    address: wxDaiAddress,
    abi: erc20ABI,
    functionName: 'approve',
    args: [DCA_CONTRACT_ADDRESS, BigInt(sendAmountBigNum ? sendAmountBigNum : 0) ],

  })
  const { data: approveTxData, isSuccess, write: approveTx } = useContractWrite(config)

  const onApproveSpending = () => {
    approveTx?.()
  }

  // Start DCA function for DCA contract
  const { config: initConfig } = usePrepareContractWrite({
    address: DCA_CONTRACT_ADDRESS,
    abi: INITDCA_ABI,
    functionName: 'initDCA'
  })
  const { isSuccess: successDCA, write: initDCA } = useContractWrite(initConfig)

  const handleStartDCA = () => {
    console.log('Starting DCA')
    initDCA?.()
  }
  

  return (
    <div className=' w-full mt-8 border-2 rounded-lg p-8'>
      <div className='flex flex-col w-full '>
        <h2 className='mb-4 font-xl font-bold'>Enter Strategy</h2>
        <div className='flex flex-col px-2'>
          <div className='flex justify-between w-full my-2 text-sm'>
            <p>wxDai</p>
            <p>{balancewxDai ? formatEther(balancewxDai) : 0}</p>
          </div>
          <div className='flex justify-between w-full my-2 text-sm'>
            <p>wETH</p>
            <p>{balancewETH ? formatEther(balancewETH) : 0}</p>
          </div>
        </div>
        <form className='flex flex-col w-full mb-8'>
          <div className='flex w-full justify-between border-2 rounded-lg gap-2 p-2'>
            <p className='w-full'>Amount:</p>
            <input 
            className='flex flex-end w-full text-right overflow-x-scroll border-none px-0 outline-none text-xl scrollbar-none' 
            type="number" 
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </form>
          <Button
            onClick={onApproveSpending}
          >
            Approve Strategy
          </Button>
          <Button
            className='mt-4'
            disabled={!isSuccess}
            onClick={handleStartDCA}
          >
            Start Strategy
          </Button>
          {successDCA &&
            <div className='my-4'>
              <p>You Strategy has been approved and will start now.</p>
            </div>
          }
      </div>
    </div>
  )
}

export default Web3Form
