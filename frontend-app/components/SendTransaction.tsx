import { useState } from 'react'
import { ethers } from 'ethers'
import { EthersAdapter } from '@safe-global/protocol-kit'
import { useAccountAbstraction } from '@/contexts/accountAbstractionContext'
import Safe from '@safe-global/protocol-kit'
import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types'
import { SafeFactory } from '@safe-global/protocol-kit'

const SendTransaction = async (web3Provider: any, safeSelected: any, transferAmount: number) => {

  // const { web3Provider, safeSelected } = useAccountAbstraction()
  const safeAddress = safeSelected ? safeSelected : ''

    if (web3Provider) {
      const provider = web3Provider
      // const signer = provider.getSigner()
      const pk = await web3Provider.send('eth_private_key');
      const signer = new ethers.Wallet(
        pk,
        new ethers.providers.JsonRpcProvider('https://rpc.gnosischain.com')
      );

  
      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer || provider
      })
  
      const safeSDK = await Safe.create({
        ethAdapter,
        safeAddress
      })
  
      console.log(safeAddress, await safeSDK.isSafeDeployed())

      // Create a Safe transaction with the provided parameters
      const safeTransactionData: SafeTransactionDataPartial = {
        to: '0xe7f4DDE279D9278C92D7008f240D23Ecd45280d8',
        data: '0x',
        value: '100',
        operation: 0
      }
  
      try {
        const safeTransaction =  await safeSDK.createTransaction({ safeTransactionData })
        const txResult = await safeSDK.executeTransaction(safeTransaction)
        console.log(txResult)       
        const txRes = await txResult.transactionResponse?.wait()
        console.log('Transaction Response', txRes)
      } catch (e) {
        console.error(e)
      }


      
  }

}

export default SendTransaction
