import { lowerCase } from 'lodash'
import { FAKE_DATA, IProduct, TProductsSortBy, TSortDirection } from './constants'

export interface IFetchDataParams {
  skip?: number
  take?: number
  sortBy?: TProductsSortBy
  sortDirection?: TSortDirection
  searchQuery?: string
}

const FAKE_DELAY_MS = 500

export const fetchData = (query?: IFetchDataParams): Promise<IProduct[]> => {
  // console.log('fetchData...')

  return new Promise((resolve) =>
    setTimeout(() => {
      const { skip = 0, take = 20, sortBy = 'id', sortDirection = 'asc' } = query || {}

      const sortProducts = (a: IProduct, b: IProduct) => {
        const isAscending = sortDirection === 'asc'

        const _first = isAscending ? a : b
        const _last = isAscending ? b : a

        const first = _first[sortBy]
        const last = _last[sortBy]

        if (typeof first === 'number' && typeof last === 'number') {
          return first - last
        }

        if (typeof first === 'string' && typeof last === 'string') {
          return first.localeCompare(last)
        }

        return 0
      }

      const searchProducts = (product: IProduct) => {
        if (!query?.searchQuery) {
          return true
        }

        return lowerCase(product.title).includes(lowerCase(query.searchQuery))
      }

      const data = FAKE_DATA.filter(searchProducts)
        .sort(sortProducts)
        .slice(skip, skip + take)

      resolve(data)
    }, FAKE_DELAY_MS)
  )
}
