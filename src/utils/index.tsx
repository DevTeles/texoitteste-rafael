import { JsonResponse, Movie } from '@/models'

export default function ChangeFieldWinner(data: JsonResponse) {
  data.content.forEach((item: Movie) => {
    item.winner = item.winner ? 'Sim' : 'Não'
  })

  return data
}
