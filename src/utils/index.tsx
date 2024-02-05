import { JsonResponse, Movie } from '@/models'

export function ChangeFieldWinner(data: JsonResponse) {
  data.content.forEach((item: Movie) => {
    item.winner = item.winner ? 'Sim' : 'Não'
  })

  return data
}

export function Top3Winners(data: any) {
  return data.studios
    .sort(
      (a: { winCount: number }, b: { winCount: number }) =>
        b.winCount - a.winCount,
    )
    .slice(0, 3)
}
