import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import NextThemeProvider from '@/provides/NextThemeProvider'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Texo it',
  description: 'Teste do Rafael',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" className="antialiased" suppressHydrationWarning>
      <body className={poppins.className} suppressHydrationWarning>
        <NextThemeProvider>{children}</NextThemeProvider>
      </body>
    </html>
  )
}
