'use client'

import type { ReactNode } from 'react'
import { PlanProvider } from '../plan-context'
import { RegisterSW } from './register-sw'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PlanProvider>
      <RegisterSW />
      {children}
    </PlanProvider>
  )
}
