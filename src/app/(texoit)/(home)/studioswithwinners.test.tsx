import { render, screen, waitFor } from '@testing-library/react'
import api from '@/services/api'
import StudiosWithWinners from './studioswithwinners'

// Mockando a chamada à API
jest.mock('../../../services/api')
const mockedApiGet = api.get as jest.MockedFunction<typeof api.get>

describe('StudiosWithWinners component', () => {
  beforeEach(() => {
    // Resetando os mocks antes de cada teste
    mockedApiGet.mockReset()
  })
  it('renders correctly', async () => {
    // Configurando o retorno da chamada à API
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

    mockedApiGet.mockResolvedValueOnce({ data: mockData })

    render(<StudiosWithWinners />)

    expect(screen.getByText('Top 3 studios with winners')).toBeDefined()
    expect(screen.getByText('Name')).toBeDefined()
    expect(screen.getByText('Win Count')).toBeDefined()

    await waitFor(() => {
      expect(screen.getByText('Columbia Pictures')).toBeDefined()
      expect(screen.getByText('Paramount Pictures')).toBeDefined()
      expect(screen.getByText('Warner Bros.')).toBeDefined()
    })
  })
})
