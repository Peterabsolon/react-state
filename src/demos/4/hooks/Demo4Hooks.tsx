/**
 * With search query
 */

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import * as C from '@chakra-ui/react'
import { debounce } from 'debounce'

import { fetchData } from '../../../api'
import { DataTable, PageTitle, Search } from '../../../components'
import { COLUMNS_WITH_SORTING, DEFAULT_PAGE_SIZE, IProduct, TProductsSortBy, TSortDirection } from '../../../constants'

const DEFAULT_SORT_BY = 'id'
const DEFAULT_SORT_DIRECTION = 'asc'

export const Demo4Hooks = () => {
  // ===================================================
  // State
  // ===================================================
  const [data, setData] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [canLoadMore, setCanLoadMore] = useState(true)
  const [sortBy, setSortBy] = useState<TProductsSortBy>(DEFAULT_SORT_BY)
  const [sortDirection, setSortDirection] = useState<TSortDirection>(DEFAULT_SORT_DIRECTION)
  const [searchQuery, setSearchQuery] = useState('')

  // ===================================================
  // Helpers
  // ===================================================
  const processData = (newData: IProduct[], append = false) => {
    setData((oldData) => (append ? [...oldData, ...newData] : newData))
    setCanLoadMore(newData.length === DEFAULT_PAGE_SIZE)
    setLoading(false)
  }

  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        setLoading(true)
        setData([])
        setData(await fetchData({ sortBy, sortDirection, searchQuery: query }))
        setLoading(false)
      }, 500),
    [sortBy, sortDirection]
  )

  // ===================================================
  // Handlers
  // ===================================================
  const onLoadMore = async () => {
    setLoading(true)

    const newData = await fetchData({
      sortBy,
      sortDirection,
      skip: data.length + DEFAULT_PAGE_SIZE,
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
      skip: 0,
      sortBy: sortByNew,
      sortDirection: sortDirectionNew,
      searchQuery,
    })

    processData(newData)
  }

  const onSearch = useCallback(
    async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(value)
      debouncedSearch(value)
    },
    [debouncedSearch]
  )

  // ===================================================
  // Effects
  // ===================================================
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

  return (
    <>
      <PageTitle>Search</PageTitle>

      <Search value={searchQuery} onChange={onSearch} />

      <DataTable<IProduct, TProductsSortBy>
        canLoadMore={canLoadMore}
        columns={COLUMNS_WITH_SORTING}
        data={data}
        loading={loading}
        onLoadMore={onLoadMore}
        onSort={onSort}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
    </>
  )
}
