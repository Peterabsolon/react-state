import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { debounce } from 'debounce'

import { fetchData, TProductsFilters } from '../../../../api'
import { DataTable, Search } from '../../../../components'
import {
  COLUMNS_WITH_SORTING,
  DEFAULT_PAGE_SIZE,
  IProduct,
  TProductsSortBy,
  TSortDirection,
} from '../../../../constants'

const DEFAULT_SORT_BY = 'id'
const DEFAULT_SORT_DIRECTION = 'asc'
const CACHE_KEY = 'demo5Data'
const DEBOUNCE_MS = 1000

export const Demo5DataTable = () => {
  let clearCacheTimeout = useRef<NodeJS.Timeout>()
  const cachedData = window.localStorage.getItem(CACHE_KEY)
  const initialData = cachedData ? JSON.parse(cachedData) : []

  // ===================================================
  // State
  // ===================================================
  const [data, setData] = useState<IProduct[]>(initialData)
  const [loading, setLoading] = useState(!cachedData)
  const [canLoadMore, setCanLoadMore] = useState(true)
  const [sortBy, setSortBy] = useState<TProductsSortBy>(DEFAULT_SORT_BY)
  const [sortDirection, setSortDirection] = useState<TSortDirection>(DEFAULT_SORT_DIRECTION)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<TProductsFilters>({})

  // ===================================================
  // Helpers
  // ===================================================
  // This would be nice but JS equality disagrees (both debounced methods would get called)
  // const fetchParams: IFetchDataParams = useMemo(
  //   () => ({ sortBy, sortDirection, skip: 0, filters, searchQuery }),
  //   [sortBy, sortDirection, filters, searchQuery]
  // )

  const processData = (newData: IProduct[], append = false) => {
    setData((oldData) => {
      const dataFinal = append ? [...oldData, ...newData] : newData
      window.localStorage.setItem(CACHE_KEY, JSON.stringify(dataFinal))
      return dataFinal
    })

    setCanLoadMore(newData.length === DEFAULT_PAGE_SIZE)
    setLoading(false)
  }

  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        console.log('searching...')
        setLoading(true)
        setData([])
        setData(await fetchData({ sortBy, sortDirection, filters, searchQuery: query }))
        setLoading(false)
      }, DEBOUNCE_MS),
    [filters, sortBy, sortDirection]
  )

  const debouncedFilter = useMemo(
    () =>
      debounce(async (filters: Partial<TProductsFilters>) => {
        console.log('filtering...')
        setLoading(true)
        setData([])
        processData(await fetchData({ sortBy, sortDirection, searchQuery, filters }))
        setLoading(false)
      }, DEBOUNCE_MS),
    [searchQuery, sortBy, sortDirection]
  )

  // ===================================================
  // Handlers
  // ===================================================
  const onLoadMore = async () => {
    setLoading(true)

    const newData = await fetchData({
      filters,
      searchQuery,
      sortBy,
      sortDirection,
      skip: data.length,
    })

    processData(newData, true)
  }

  const onSort = async (sortByNew: TProductsSortBy) => {
    // Flip direction if sorting by the same key, sort ascending otherwise
    const sortDirectionFlipped = sortDirection === 'asc' ? 'desc' : 'asc'
    const sortDirectionNew = sortByNew === sortBy ? sortDirectionFlipped : 'asc'

    setData([])
    setLoading(true)
    setSortBy(sortByNew)
    setSortDirection(sortDirectionNew)

    const newData = await fetchData({
      filters,
      searchQuery,
      skip: 0,
      sortBy: sortByNew,
      sortDirection: sortDirectionNew,
    })

    processData(newData)
  }

  const onSearch = async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(value)
    debouncedSearch(value)
  }

  const onFilter = async (key: keyof TProductsFilters, value: string) => {
    setFilters((filters) => {
      const newFilters = { ...filters, [key]: value }
      debouncedFilter(newFilters)
      return newFilters
    })
  }

  // ===================================================
  // Effects
  // ===================================================
  /**
   * Fetch initial data
   */
  useEffect(() => {
    ;(async () => {
      processData(
        // Can't pass state since it would cause hook to run on their change
        await fetchData({
          sortBy: DEFAULT_SORT_BY,
          sortDirection: DEFAULT_SORT_DIRECTION,
        })
      )
    })()
  }, [])

  /**
   * Sync fetch params to URL search query
   */
  useEffect(() => {
    const searchParams = new URLSearchParams({
      sortBy,
      sortDirection,
      searchQuery,
      skip: Math.max(data.length - DEFAULT_PAGE_SIZE, 0).toString(),
    })

    window.history.replaceState('', '', `${window.location.pathname}?${searchParams.toString()}`)
  }, [data.length, sortBy, sortDirection, searchQuery]) // can not be object because JS equality

  /**
   * Clear cache every 5 seconds, reset on any data change
   */
  useEffect(() => {
    if (clearCacheTimeout.current) clearTimeout(clearCacheTimeout.current)
    clearCacheTimeout.current = setTimeout(() => window.localStorage.removeItem(CACHE_KEY), 5000)
  }, [data.length])

  return (
    <>
      <Search value={searchQuery} onChange={onSearch} />

      <DataTable<IProduct, TProductsSortBy, TProductsFilters>
        canLoadMore={canLoadMore}
        columns={COLUMNS_WITH_SORTING}
        data={data}
        filters={filters}
        loading={loading}
        onFilter={onFilter}
        onLoadMore={onLoadMore}
        onSort={onSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
    </>
  )
}
