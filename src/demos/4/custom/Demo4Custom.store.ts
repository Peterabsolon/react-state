import { ChangeEvent } from 'react'
import { debounce } from 'debounce'

import { fetchData } from '../../../api'
import { DEFAULT_PAGE_SIZE, IProduct, TProductsSortBy, TSortDirection } from '../../../constants'

export const store = {
  // ===================================================
  // State
  // ===================================================
  data: [] as IProduct[],
  loading: true,
  canLoadMore: false,
  sortBy: 'id' as TProductsSortBy,
  sortDirection: 'asc' as TSortDirection,
  searchQuery: '',

  render: () => {},

  // ===================================================
  // "Selectors"
  // ===================================================
  get fetchParams() {
    return {
      skip: store.data.length,
      sortBy: store.sortBy,
      sortDirection: store.sortDirection,
      searchQuery: store.searchQuery,
    }
  },

  // ===================================================
  // Methods
  // ===================================================
  setData: async (newData: IProduct[], concat = false) => {
    store.data = concat ? [...store.data, ...newData] : newData
    store.canLoadMore = newData.length === DEFAULT_PAGE_SIZE
    store.loading = false
    store.render()
  },

  debouncedSearch: debounce(async (query: string): Promise<void> => {
    store.loading = true
    store.render()

    store.data = []
    store.setData(await fetchData({ ...store.fetchParams, searchQuery: query }))
  }, 500),

  // ===================================================
  // Handlers
  // ===================================================
  onLoadMore: async () => {
    store.loading = true
    store.render()

    store.setData(await fetchData(store.fetchParams), true)
  },

  onSort: async (sortByNew: TProductsSortBy) => {
    // Flip direction if sorting by the same key, sort ascending otherwise
    const sortDirectionFlipped = store.sortDirection === 'asc' ? 'desc' : 'asc'
    const sortDirectionNew = sortByNew === store.sortBy ? sortDirectionFlipped : 'asc'

    store.data = []
    store.loading = true
    store.render()

    store.sortBy = sortByNew
    store.sortDirection = sortDirectionNew
    store.render()

    store.setData(await fetchData(store.fetchParams))
  },

  onSearch: async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    store.searchQuery = value
    store.render()

    store.debouncedSearch(value)
  },

  onMount: async (render: () => void) => {
    store.render = render
    store.setData(await fetchData(store.fetchParams))
  },
}
