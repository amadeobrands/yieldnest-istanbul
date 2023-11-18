import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import MainProvider from '@/components/MainProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hackathon YN',
  description: 'ETHglobal YieldNest Hackathon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainProvider>
          {children}
        </MainProvider>
      </body>
    </html>
  )
}

