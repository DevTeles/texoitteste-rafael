import { useEffect, useState } from 'react'
import api from '../../../services/api'
import { Top3Winners } from '@/utils'
import { DataStudioProps, PropsStudiosWinners } from '@/models'

export default function StudiosWithWinners() {
  const [studiosWinners, setStudiosWinners] = useState<PropsStudiosWinners[]>(
    [],
  )
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true)

        const response = await api.get('backend-java/api/movies', {
          params: {
            projection: 'studios-with-win-count',
          },
        })
        const data: DataStudioProps = response.data

        if (!data) {
          console.log('Error: ', data)
          return
        }

        setStudiosWinners(Top3Winners(data))
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
      <h1 className="font-semibold">Top 3 studios with winners</h1>
      <div className="mt-4 h-auto overflow-y-auto rounded-md border border-zinc-400">
        <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
          <thead className="sticky top-0">
            <tr>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                Name
              </th>
              <th className="bg-zinc-100 px-6 py-3 text-left dark:bg-zinc-700">
                Win Count
              </th>
            </tr>
          </thead>
          <tbody className="sticky divide-y divide-gray-200 bg-white dark:bg-zinc-500">
            {isLoading && (
              <tr>
                <td colSpan={2}>
                  <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-md bg-white bg-opacity-80 p-4 shadow-md">
                    <div className="h-8 w-8 animate-spin rounded-full border-t-4 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            )}

            {studiosWinners.length > 0 &&
              studiosWinners.map((studio, index) => (
                <tr
                  key={index}
                  className="w-full leading-3 hover:bg-zinc-200 dark:hover:border dark:hover:border-green-300 dark:hover:bg-zinc-600"
                >
                  <td className="px-6 py-1 text-left">{studio.name}</td>
                  <td className="px-6 py-1 text-left">{studio.winCount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
