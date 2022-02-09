import { lowerCase } from 'lodash'
import { FAKE_DATA, IProduct, TProductsSearchBy, TProductsSortBy, TSortDirection } from './constants'

export type TProductPayload = Omit<IProduct, 'id'>

export interface TProductsFilters {
  id?: string
  title?: string
  material?: string
}

export interface IFetchDataParams<
  TSortBy extends string = TProductsSortBy,
  TFilters extends Record<string, any> = TProductsFilters
> {
  skip?: number
  take?: number
  sortBy?: TSortBy
  sortDirection?: TSortDirection
  searchQuery?: string
  filters?: TFilters
}

const FAKE_DELAY_MS = 500

export const sleep = (ms: number = FAKE_DELAY_MS) => new Promise((resolve) => setTimeout(resolve, ms))

export const createProduct = async (product: TProductPayload) => {
  await sleep()
  return { ...product, id: Math.random() }
}

export const editProduct = async (id: number, product: TProductPayload) => {
  await sleep()

  return {
    ...product,
    id,
  }
}

export const fetchData = (query?: IFetchDataParams): Promise<IProduct[]> => {
  console.log('fetchData...', { query })

  return new Promise((resolve) =>
    setTimeout(() => {
      const { skip = 0, take = 20, sortBy = 'id', sortDirection = 'asc', filters } = query || {}

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

        const searchFields = ['title', 'material'] as TProductsSearchBy[]
        return searchFields.some((field) => lowerCase(product[field]).includes(lowerCase(query.searchQuery)))
      }

      const filterProducts = (product: IProduct) => {
        if (!filters) {
          return true
        }

        return Object.entries(filters).every(([key, filter]) => {
          if (filter) {
            const prop = lowerCase(product[key as keyof TProductsFilters].toString())
            const _filter = lowerCase(filter)
            return prop.includes(_filter)
          }

          return true
        })
      }

      const data = FAKE_DATA.filter(searchProducts)
        .filter(filterProducts)
        .sort(sortProducts)
        .slice(skip, skip + take)

      resolve(data)
    }, FAKE_DELAY_MS)
  )
}
