
import SafeAccount from '@/components/wallet/SafeAccount'
import TransactionForm from '@/components/TransactionForm'

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className='font-xl font-bold mb-8'>Create a crypto wallet with Account Abstraction</h1>
        <SafeAccount />
        <TransactionForm />
      </div>
    </main>
  )
}
