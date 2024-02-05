'use client'

import { useEffect, useState } from 'react'
import api from '../../../services/api'
import { Button } from '@/components/Button'
import { ChangeEventParams, JsonResponse } from '@/models'
import { ChangeFieldWinner } from '@/utils'

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
    const changePage = currentPage === 0 ? 0 : currentPage - 1
    setCurrentPage(changePage)
  }

  function handleNext() {
    const changePage =
      currentPage === winnersYear.totalPages - 1
        ? winnersYear.totalPages - 1
        : currentPage + 1
    setCurrentPage(changePage)
  }

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true)

        const response = await api.get('backend-java/api/movies', {
          params: {
            page: currentPage,
            size: 10,
            year,
            winner: optionWinner,
          },
        })
        const data = ChangeFieldWinner(response.data)

        if (!data) {
          console.log('Error: ', data)
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
                        e.target.value === 'Todos' ? undefined : e.target.value,
                      )
                      setCurrentPage(0)
                    }}
                  >
                    <option>Todos</option>
                    <option value={1}>Sim</option>
                    <option value={0}>Não</option>
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
          <div>
            <Button variant="outline" onClick={() => setCurrentPage(0)}>
              Primeira
            </Button>
            <Button variant="outline" onClick={handlePrevious}>
              {'<'}
            </Button>
            {winnersYear.totalPages >= 5 ? (
              <>
                <Button variant="outline" onClick={() => setCurrentPage(0)}>
                  1
                </Button>
                <Button variant="outline" onClick={() => setCurrentPage(1)}>
                  2
                </Button>
                <Button variant="outline" onClick={() => setCurrentPage(2)}>
                  3
                </Button>
                <Button variant="outline" onClick={() => setCurrentPage(3)}>
                  4
                </Button>
                <Button variant="outline" onClick={() => setCurrentPage(4)}>
                  5
                </Button>
              </>
            ) : (
              <Button variant="outline">{currentPage + 1}</Button>
            )}
            <Button variant="outline" onClick={handleNext}>
              {'>'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(winnersYear.totalPages - 1)}
            >
              Última
            </Button>
            <span className="m-2 text-sm font-semibold dark:text-zinc-100">{`Página ${
              currentPage + 1
            } / ${winnersYear.totalPages}`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
