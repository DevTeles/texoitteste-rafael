import { Sidebar } from '@/components/Sidebar'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen dark:bg-zinc-900 lg:grid lg:grid-cols-app">
      <Sidebar />
      <main className="ml-2 max-w-[100vw] px-4 pb-12 pt-24 lg:col-start-2 lg:px-8 lg:pt-8">
        {children}
      </main>
    </div>
  )
}
