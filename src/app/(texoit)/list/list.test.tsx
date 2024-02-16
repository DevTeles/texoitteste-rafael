import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Page from './page'
import { getListMovies } from '@/services/api'

// Mockando a chamada à API
jest.mock('../../../services/api')
const mockedApiGet = getListMovies as jest.MockedFunction<typeof getListMovies>

describe('Page', () => {
  beforeEach(() => {
    // Resetando os mocks antes de cada teste
    mockedApiGet.mockReset()
  })

  it('renders correctly', async () => {
    // Configurando o retorno da chamada à API
    const mockData = {
      content: [
        {
          id: 181,
          year: 2015,
          title: 'Fantastic Four',
          winner: true,
        },
        {
          id: 182,
          year: 2015,
          title: 'Fifty Shades of Grey',
          winner: true,
        },
        {
          id: 183,
          year: 2015,
          title: 'Jupiter Ascending',
          winner: false,
        },
        {
          id: 184,
          year: 2015,
          title: 'Paul Blart: Mall Cop 2',
          winner: false,
        },
        {
          id: 185,
          year: 2015,
          title: 'Pixels',
          winner: false,
        },
      ],
      pageable: {
        pageSize: 10,
        pageNumber: 0,
      },
      totalPages: 1,
      totalElements: 5,
      last: true,
      size: 10,
      number: 0,
      first: true,
      numberOfElements: 5,
      empty: false,
    }

    mockedApiGet.mockResolvedValueOnce(mockData)
    render(<Page />)

    // Verifique se o componente é renderizado corretamente
    expect(screen.getByText('List movie winners by year')).toBeInTheDocument()
    expect(screen.getByText('Id')).toBeInTheDocument()
    expect(screen.getByText('Year')).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Winner?')).toBeInTheDocument()
  })
})
