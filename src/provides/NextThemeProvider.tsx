'use client'

import React from 'react'
import { ThemeProvider, useTheme } from 'next-themes'

interface ProviderProps {
  children: React.ReactNode
}

export default function NextThemeProvider({ children }: ProviderProps) {
  const { theme } = useTheme()

  return (
    <ThemeProvider
      attribute="class"
      forcedTheme={theme || undefined}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
