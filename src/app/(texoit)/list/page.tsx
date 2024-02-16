'use client'

import { useEffect, useState } from 'react'
import { getListMovies } from '../../../services/api'
import { Button } from '@/components/Button'
import { ChangeEventParams, JsonResponse } from '@/models'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

export default function Page() {
  const [year, setYear] = useState(undefined)
  const [currentPage, setCurrentPage] = useState(0)
  const [optionWinner, setOptionWinner] = useState(undefined)

  const [winnersYear, setWinnersYear] = useState<JsonResponse>(
    {} as JsonResponse,
  )
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(e: ChangeEventParams) {
    setYear(e.target.value === '' ? undefined : e.target.value)
    setCurrentPage(0)
  }

  function handlePrevious() {
    const changePage = Math.max(currentPage - 1, 0)
    setCurrentPage(changePage)
  }

  function handleNext() {
    const changePage = winnersYear.last
      ? winnersYear.totalPages - 1
      : currentPage + 1
    setCurrentPage(changePage)
  }

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true)

        const data = await getListMovies(currentPage, year, optionWinner)

        if (!data) {
          console.log('Dados: ', data)
          return
        }

        setWinnersYear(data)
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        console.log('ERROR:', e)
      }
    }

    load()
  }, [currentPage, optionWinner, year])

  return (
    <div>
      <h1 className="mb-4 font-semibold">List movie winners by year</h1>

      <div className="mb-4 mt-4 h-auto overflow-y-auto rounded-md border border-zinc-400">
        <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
          <thead className="sticky top-0">
            <tr>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                Id
              </th>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                <div className="grid">
                  Year
                  <input
                    type="number"
                    placeholder="Filter by year"
                    className="m-2 font-light"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </th>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                Title
              </th>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                <div className="grid">
                  Winner?
                  <select
                    id="winnersoptions"
                    className="font-light"
                    onChange={(e: ChangeEventParams) => {
                      setOptionWinner(
                        e.target.value === 'Yes/No'
                          ? undefined
                          : e.target.value,
                      )
                      setCurrentPage(0)
                    }}
                  >
                    <option>Yes/No</option>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="sticky divide-y divide-gray-200 bg-white dark:bg-zinc-500">
            {isLoading && (
              <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-md bg-white bg-opacity-80 p-4 shadow-md">
                <div className="h-8 w-8 animate-spin rounded-full border-t-4 border-blue-500"></div>
              </div>
            )}
            {winnersYear?.content?.length > 0 &&
              winnersYear?.content?.map((content, index) => (
                <tr
                  key={index}
                  className="w-full leading-7 hover:bg-zinc-200 dark:hover:border dark:hover:border-green-300 dark:hover:bg-zinc-600"
                >
                  <td className="px-6 py-1 text-left">{content.id}</td>
                  <td className="px-6 py-1 text-left">{content.year}</td>
                  <td className="px-6 py-1 text-left">{content.title}</td>
                  <td className="px-6 py-1 text-center">
                    {content.winner.toString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="m-2 grid items-center justify-center lg:flex">
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(0)}
            >
              <ChevronsLeft size={18} />
            </Button>
            <Button
              variant="ghost"
              disabled={currentPage === 0}
              onClick={handlePrevious}
            >
              <ChevronLeft size={18} />
            </Button>

            {Array.from({ length: winnersYear.totalPages }, (_, index) => (
              <Button
                key={index}
                variant="outline"
                disabled={index === currentPage}
                onClick={() => setCurrentPage(index)}
              >
                {index + 1}
              </Button>
            ))}

            <Button
              variant="ghost"
              disabled={currentPage === winnersYear.totalPages - 1}
              onClick={handleNext}
            >
              <ChevronRight size={18} />
            </Button>
            <Button
              variant="ghost"
              disabled={currentPage === winnersYear.totalPages - 1}
              onClick={() => setCurrentPage(winnersYear.totalPages - 1)}
            >
              <ChevronsRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
