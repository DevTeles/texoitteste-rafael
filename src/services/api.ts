import {
  DataStudioProps,
  MinMaxIntervalProducersProps,
  PropsWinners,
} from '@/models'
import { ChangeFieldWinner } from '@/utils'
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
})

export async function getMultipleWinners() {
  try {
    const response = await api.get('backend-java/api/movies', {
      params: {
        projection: 'years-with-multiple-winners',
      },
    })
    return response.data as PropsWinners
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getTop3Studios() {
  try {
    const response = await api.get('backend-java/api/movies', {
      params: {
        projection: 'studios-with-win-count',
      },
    })
    return response.data as DataStudioProps
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getMaxMinIntervalProducers() {
  try {
    const response = await api.get('backend-java/api/movies', {
      params: {
        projection: 'max-min-win-interval-for-producers',
      },
    })
    return response.data as MinMaxIntervalProducersProps
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getWinnersByYear(year: number) {
  try {
    const response = await api.get('backend-java/api/movies', {
      params: {
        winner: true,
        year,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getListMovies(
  currentPage: number,
  year: number | undefined,
  optionWinner: boolean | undefined,
) {
  try {
    const response = await api.get('backend-java/api/movies', {
      params: {
        page: currentPage,
        size: 20,
        year,
        winner: optionWinner,
      },
    })
    return ChangeFieldWinner(response.data)
  } catch (error) {
    console.log(error)
    throw error
  }
}
