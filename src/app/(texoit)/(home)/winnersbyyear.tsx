import { ChangeEvent, useEffect, useState } from 'react'
import api from '../../../services/api'
import * as Input from '../../../components/Input'
import { Search } from 'lucide-react'
import { ChangeEventParams } from '@/models'

interface PropsYear {
  id: string
  year: number
  title: string
}

export default function ListWinnersByYear() {
  const [year, setYear] = useState(0)

  const [winnersYear, setWinnersYear] = useState<PropsYear[]>([])
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(e: ChangeEventParams) {
    setYear(e.target.value)
  }

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true)

        const response = await api.get('backend-java/api/movies', {
          params: {
            winner: true,
            year,
          },
        })
        const data = response.data

        console.log('DATA YEAR: ', data)

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
  }, [year])

  return (
    <div>
      <h1 className="mb-4 font-semibold">List movie winners by year</h1>
      <Input.Root>
        <Input.Prefix>
          <Search className="h-5 w-5 text-zinc-500" />
        </Input.Prefix>
        <Input.Control
          type="number"
          placeholder="Search by year"
          onChange={(e) => handleChange(e)}
        />
      </Input.Root>
      <div className="mb-4 mt-4 h-auto overflow-y-auto rounded-md border border-zinc-400">
        <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
          <thead className="sticky top-0">
            <tr>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                Id
              </th>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                Year
              </th>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                Title
              </th>
            </tr>
          </thead>
          <tbody className="sticky divide-y divide-gray-200 bg-white dark:bg-zinc-500">
            {isLoading && (
              <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-md bg-white bg-opacity-80 p-4 shadow-md">
                <div className="h-8 w-8 animate-spin rounded-full border-t-4 border-blue-500"></div>
              </div>
            )}
            {winnersYear.length > 0 &&
              winnersYear.map((winner, index) => (
                <tr
                  key={index}
                  className="w-full leading-3 hover:bg-zinc-200 dark:hover:border dark:hover:border-green-300 dark:hover:bg-zinc-600"
                >
                  <td className="px-6 py-1 text-left">{winner.id}</td>
                  <td className="px-6 py-1 text-left">{winner.year}</td>
                  <td className="px-6 py-1 text-left">{winner.title}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
