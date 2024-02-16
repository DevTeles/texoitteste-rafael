import { useEffect, useState } from 'react'
import { getMaxMinIntervalProducers } from '../../../services/api'
import { MinMaxIntervalProducersProps } from '@/models'

export default function ProducersWin() {
  const [producersWin, setProducersWin] =
    useState<MinMaxIntervalProducersProps>({
      min: [],
      max: [],
    } as MinMaxIntervalProducersProps)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true)

        const data: any = await getMaxMinIntervalProducers()

        if (!data) {
          console.log('Dados: ', data)
          return
        }

        setProducersWin(data)
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        console.log('ERROR:', e)
      }
    }

    load()
  }, [])

  return (
    <div>
      <h1 className="mb-4 font-semibold">
        Producers with longest and shortest interval between wins
      </h1>
      <span>Maximum</span>
      <div className="mb-4 mt-4 h-auto overflow-y-auto rounded-md border border-zinc-400">
        <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
          <thead className="sticky top-0">
            <tr>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                Producer
              </th>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                Interval
              </th>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                Previous Year
              </th>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                Following Year
              </th>
            </tr>
          </thead>
          <tbody className="sticky divide-y divide-gray-200 bg-white dark:bg-zinc-500">
            {isLoading && (
              <tr>
                <td colSpan={4}>
                  <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-md bg-white bg-opacity-80 p-4 shadow-md">
                    <div className="h-8 w-8 animate-spin rounded-full border-t-4 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            )}

            {producersWin.max.length > 0 &&
              producersWin.max.map((producer, index) => (
                <tr
                  key={index}
                  className="w-full leading-3 hover:bg-zinc-200 dark:hover:border dark:hover:border-green-300 dark:hover:bg-zinc-600"
                >
                  <td className="px-6 py-1 text-left">{producer.producer}</td>
                  <td className="px-6 py-1 text-left">{producer.interval}</td>
                  <td className="px-6 py-1 text-left">
                    {producer.previousWin}
                  </td>
                  <td className="px-6 py-1 text-left">
                    {producer.followingWin}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <span>Minimum</span>
      <div className="mt-4 h-auto overflow-y-auto rounded-md border border-zinc-400">
        <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
          <thead className="sticky top-0">
            <tr>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                Producer
              </th>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                Interval
              </th>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                Previous Year
              </th>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                Following Year
              </th>
            </tr>
          </thead>
          <tbody className="sticky divide-y divide-gray-200 bg-white dark:bg-zinc-500">
            {isLoading && (
              <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-md bg-white bg-opacity-80 p-4 shadow-md">
                <div className="h-8 w-8 animate-spin rounded-full border-t-4 border-blue-500"></div>
              </div>
            )}
            {producersWin.min.length > 0 &&
              producersWin.min.map((producer, index) => (
                <tr
                  key={index}
                  className="w-full leading-3 hover:bg-zinc-200 dark:hover:border dark:hover:border-green-300 dark:hover:bg-zinc-600"
                >
                  <td className="px-6 py-1 text-left">{producer.producer}</td>
                  <td className="px-6 py-1 text-left">{producer.interval}</td>
                  <td className="px-6 py-1 text-left">
                    {producer.previousWin}
                  </td>
                  <td className="px-6 py-1 text-left">
                    {producer.followingWin}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
