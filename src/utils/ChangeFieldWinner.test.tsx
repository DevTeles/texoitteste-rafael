import ChangeFieldWinner from '.'
import jsonData from './data.json'

describe('Verificação de Vencedores', () => {
  test('Verifica se o campo "winner" está retornando corretamente', () => {
    const data: any = jsonData
    const resultado = ChangeFieldWinner(data)

    // Verifica se o resultado é esperado para cada winner do content
    expect(resultado.content[0].winner).toEqual('Sim')
    expect(resultado.content[1].winner).toEqual('Não')
  })
})
