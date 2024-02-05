import { render, screen, waitFor } from '@testing-library/react'
import api from '@/services/api'
import ProducersWin from './producersWin'

// Mockando a chamada à API
jest.mock('../../../services/api')
const mockedApiGet = api.get as jest.MockedFunction<typeof api.get>

describe('ProducersWin component', () => {
  beforeEach(() => {
    // Resetando os mocks antes de cada teste
    mockedApiGet.mockReset()
  })

  it('renders correctly', async () => {
    // Configurando o retorno da chamada à API
    const mockData = {
      min: [
        {
          producer: 'Joel Silver',
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
      max: [
        {
          producer: 'Matthew Vaughn',
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
    }

    mockedApiGet.mockResolvedValueOnce({ data: mockData })

    render(<ProducersWin />)

    expect(
      screen.getByText(
        'Producers with longest and shortest interval between wins',
      ),
    ).toBeDefined()
    expect(screen.getByText('Maximum')).toBeDefined()
    expect(screen.getByText('Minimum')).toBeDefined()

    await waitFor(() => {
      expect(screen.getByText('Joel Silver')).toBeDefined()
      expect(screen.getByText('Matthew Vaughn')).toBeDefined()
    })
  })
})
