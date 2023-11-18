'use client'
import { useState } from 'react'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useContractRead, useConnect, useNetwork, useAccount } from 'wagmi'
import SPARK_UI_ABI from '@/utils/abi/SparkUIAbi.json'

import parse from 'html-react-parser';


const Spark = () => {

  const SparkUiAddress = '0xc193a5a5A24588fB550211CecbfC2fa64296792f'
  
  const { data, isError,  } = useContractRead({
    address: SparkUiAddress,
    abi: SPARK_UI_ABI,
    functionName: 'index',
    chainId: 100,
  })

  const parseHtmlContent = (htmlString: any) => {
    return parse(htmlString);
  };

  const depositDai = () => {
    console.log('depositing dai')
  }

  const index = '<h1> Welcome to Spark!</h1><br>My dai balance: 0<br>My sdai balance: 0<br><button onClick={() => depositDai}>Deposit Dai</button>'

  return (
    <div className=' mt-24 '>
      <h1 className='mb-8 font-bold font-2xl text-center'> SPARK UI</h1>

      {data ? 
        <div className='mx-auto flex flex-col justify-between w-1/2 text-center mt-8' suppressHydrationWarning>
          {parseHtmlContent(data)}
        </div>
        :
        <div>
          Loading...
        </div>
        }
    </div>
  )
}

export default Spark
