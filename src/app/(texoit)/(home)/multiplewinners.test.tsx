import { render, screen, waitFor } from '@testing-library/react'
import MultipleWinners from './multiplewinners'
import api from '@/services/api'

// Mockando a chamada à API
jest.mock('../../../services/api')
const mockedApiGet = api.get as jest.MockedFunction<typeof api.get>

describe('MultipleWinners component', () => {
  beforeEach(() => {
    // Resetando os mocks antes de cada teste
    mockedApiGet.mockReset()
  })

  it('renders correctly', async () => {
    // Configurando o retorno da chamada à API
    const mockData = {
      years: [
        { year: 1986, winnerCount: 2 },
        { year: 1990, winnerCount: 2 },
        { year: 2015, winnerCount: 2 },
      ],
    }
    mockedApiGet.mockResolvedValueOnce({ data: mockData })

    render(<MultipleWinners />)

    expect(screen.getByText('List years with multiple winners')).toBeDefined()
    expect(screen.getByText('Year')).toBeDefined()
    expect(screen.getByText('Win Count')).toBeDefined()

    await waitFor(() => {
      expect(screen.getByText('1986')).toBeDefined()
      expect(screen.getByText('1990')).toBeDefined()
      expect(screen.getByText('2015')).toBeDefined()
    })
  })
})
