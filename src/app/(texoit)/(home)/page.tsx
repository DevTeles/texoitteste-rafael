'use client'

import MultipleWinners from './multiplewinners'
import ProducersWin from './producersWin'
import StudiosWithWinners from './studioswithwinners'
import ListWinnersByYear from './winnersbyyear'

export default function Home() {
  return (
    <div className="grid gap-7 lg:flex lg:flex-col">
      <div className="grid gap-7 lg:flex">
        <MultipleWinners />
        <StudiosWithWinners />
      </div>
      <div className="grid w-full gap-7 lg:flex">
        <ProducersWin />
        <ListWinnersByYear />
      </div>
    </div>
  )
}
