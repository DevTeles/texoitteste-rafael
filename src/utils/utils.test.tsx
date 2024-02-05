import { ChangeFieldWinner, Top3Winners } from './index'
import jsonData from './data.json'

describe('Verificação de Vencedores', () => {
  it('Verifica se o campo "winner" está retornando corretamente', () => {
    const data: any = jsonData
    const resultado = ChangeFieldWinner(data)

    // Verifica se o resultado é esperado para cada winner do content
    expect(resultado.content[0].winner).toEqual('Sim')
    expect(resultado.content[1].winner).toEqual('Não')
  })

  it('function Top3Winners', () => {
    const mockData = {
      studios: [
        {
          name: 'Columbia Pictures',
          winCount: 7,
        },
        {
          name: 'Paramount Pictures',
          winCount: 6,
        },
        {
          name: 'Warner Bros.',
          winCount: 5,
        },
        {
          name: '20th Century Fox',
          winCount: 4,
        },
        {
          name: 'MGM',
          winCount: 3,
        },
      ],
    }

    const data = Top3Winners(mockData)
    expect(data).toHaveLength(3)
  })
})
