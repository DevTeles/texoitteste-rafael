import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import ListWinnersByYear from './winnersbyyear'
import api from '@/services/api'

// Mockando a chamada à API
jest.mock('../../../services/api')
const mockedApiGet = api.get as jest.MockedFunction<typeof api.get>

describe('ListWinnersByYear', () => {
  beforeEach(() => {
    // Resetando os mocks antes de cada teste
    mockedApiGet.mockReset()
  })
  it('renders correctly', async () => {
    // Configurando o retorno da chamada à API
    const mockData = [
      {
        id: 181,
        year: 2015,
        title: 'Fantastic Four',
        studios: ['20th Century Fox'],
        producers: [
          'Gregory Goodman',
          'Hutch Parker',
          'Matthew Vaughn',
          'Robert Kulzer',
          'Simon Kinberg',
        ],
        winner: true,
      },
      {
        id: 182,
        year: 2015,
        title: 'Fifty Shades of Grey',
        studios: ['Focus Features', 'Universal Pictures'],
        producers: ['Dana Brunetti', 'E. L. James', 'Michael De Luca'],
        winner: true,
      },
    ]

    mockedApiGet.mockResolvedValueOnce({ data: mockData })

    render(<ListWinnersByYear />)

    // Verifique se o componente é renderizado corretamente
    expect(screen.getByText('List movie winners by year')).toBeInTheDocument()

    // Simule uma mudança no input
    const input = screen.getByPlaceholderText('Search by year')
    fireEvent.change(input, { target: { value: '2015' } })

    // Aguarde a renderização dos resultados
    await waitFor(() => {
      expect(screen.getByText('Fantastic Four')).toBeInTheDocument()
      expect(screen.getByText('Fifty Shades of Grey')).toBeInTheDocument()
    })
  })
})
