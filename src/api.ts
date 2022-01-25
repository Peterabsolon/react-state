import {
  FAKE_DATA,
  IProduct,
  TProductsSortBy,
  TSortDirection,
} from './constants'

interface TGetDataQuery {
  skip?: number
  take?: number
  sortBy?: TProductsSortBy
  sortDirection?: TSortDirection
}

export const fetchData = (query?: TGetDataQuery): Promise<IProduct[]> =>
  new Promise((resolve) =>
    setTimeout(() => {
      const {
        skip = 0,
        take = 20,
        sortBy = 'id',
        sortDirection = 'asc',
      } = query || {}

      const sortProducts = (a: IProduct, b: IProduct) => {
        const isDesc = sortDirection === 'desc'

        const _first = isDesc ? b : a
        const _last = isDesc ? a : b

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

      const data = FAKE_DATA.sort(sortProducts).slice(skip, skip + take)

      resolve(data)
    }, 500)
  )
