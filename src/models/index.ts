import { Session } from 'next-auth'
import { ChangeEvent } from 'react'

export type SessionParams = Session & {
  accessToken?: string
}

export type ChangeEventParams = ChangeEvent & {
  target: {
    value: string
  }
}
