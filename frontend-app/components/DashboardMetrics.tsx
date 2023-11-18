'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAccount, useNetwork } from 'wagmi'


export default function DashboardMetrics() {

  const { address, isConnecting, isDisconnected } = useAccount()
  const { chain } = useNetwork()

  const [ transactions, setTransactions ] = useState<any>(null)

  useEffect(() => {
    const getBalance = async () => {
      const query = new URLSearchParams({
        // hash: 'stringstringstringstringstringstringstringstringstringstringstring',
        // nonce: '0',
        // status: 'included',
        limit: '10',
        offset: '0'
      }).toString();

      const baseUrl = 'https://rldurumkajho3pvgavfrmaysay.multibaas.com';
      try {
        const { data } = await axios.get(`https://docs.curvegrid.com/multibaas/api/v0/operation/list-wallet-transactions/${baseUrl}/api/v0/chains/${chain}/txm/${address}?${query}`,
        { 
        headers: { 
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_MULTIBASS_API_KEY as string}`
        }})
        console.log('transactions ->', data)
        setTransactions(data)
      } catch (err) {
        console.log('DASHBOARD AXIOS ERROR ->', err)
      }
    }
    if (address) getBalance()
  }, [address, chain])


  return (
    <div>
      <h2>Transactions</h2>
      <div>
        {transactions ?
        transactions.map((tx: any, index: number) => {
          <div key={index}>
            <p>{tx.hash}</p>
          </div>
        })
      :
      <p>No transactions</p> 
      }
      </div>
    </div>
  )
}

export { DashboardMetrics }
