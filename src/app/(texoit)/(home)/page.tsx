'use client'

import MultipleWinners from './multiplewinners'
import ProducersWin from './producersWin'
import StudiosWithWinners from './studioswithwinners'
import ListWinnersByYear from './winnersbyyear'

export default function Home() {
  return (
    <div className="flex w-full min-w-full max-w-[100vw] flex-col gap-7">
      <div className="flex gap-7">
        <MultipleWinners />
        <StudiosWithWinners />
      </div>
      <div className="flex w-full gap-7">
        <ProducersWin />
        <ListWinnersByYear />
      </div>
    </div>
  )
}
