import { ChangeEvent } from 'react'

export type ChangeEventParams = ChangeEvent & {
  target: {
    value: any
  }
}

export interface Movie {
  id: number
  year: number
  title: string
  studios: string[]
  producers: string[]
  winner: string
}

interface Pageable {
  sort: {
    unsorted: boolean
    sorted: boolean
    empty: boolean
  }
  offset: number
  pageSize: number
  pageNumber: number
  paged: boolean
  unpaged: boolean
}

export interface JsonResponse {
  content: Movie[]
  pageable: Pageable
  totalPages: number
  totalElements: number
  last: boolean
  size: number
  number: number
  sort: {
    unsorted: boolean
    sorted: boolean
    empty: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}
