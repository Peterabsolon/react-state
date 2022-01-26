/**
 * With search query
 */

import { useEffect, useState } from 'react'
import * as C from '@chakra-ui/react'
import { debounce } from 'lodash'

import { fetchData } from '../../api'
import { DataTable, PageTitle } from '../../components'
import { COLUMNS_WITH_SORTING, DEFAULT_PAGE_SIZE, IProduct, TProductsSortBy, TSortDirection } from '../../constants'

const DEFAULT_SORT_BY = 'id'
const DEFAULT_SORT_DIRECTION = 'asc'

export const Demo4 = () => {
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
  const debouncedFetchData = debounce(fetchData, 1000)

  // ===================================================
  // Handlers
  // ===================================================
  const onLoadMore = async () => {
    setLoading(true)

    const newData = await debouncedFetchData({
      sortBy,
      sortDirection,
      skip: data.length + DEFAULT_PAGE_SIZE,
    })

    if (!newData) return

    setData((prevData) => [...prevData, ...newData])
    setCanLoadMore(newData.length === DEFAULT_PAGE_SIZE)
    setLoading(false)
  }

  const onSort = async (sortByNew: TProductsSortBy) => {
    // Flip direction if sorting by the same key, sort ascending otherwise
    const sortDirectionFlipped = sortDirection === 'asc' ? 'desc' : 'asc'
    const sortDirectionNew = sortByNew === sortBy ? sortDirectionFlipped : 'asc'

    setLoading(true)
    setSortBy(sortByNew)
    setSortDirection(sortDirectionNew)

    const newData = await debouncedFetchData({
      skip: 0,
      sortBy: sortByNew,
      sortDirection: sortDirectionNew,
      searchQuery,
    })
    if (!newData) return

    setData(newData)
    setCanLoadMore(newData.length === DEFAULT_PAGE_SIZE)
    setLoading(false)
  }

  // ===================================================
  // Effects
  // ===================================================
  useEffect(() => {
    ;(async () => {
      setData(
        await fetchData({
          sortBy: DEFAULT_SORT_BY,
          sortDirection: DEFAULT_SORT_DIRECTION,
        })
      )
      setLoading(false)
    })()
  }, [])

  return (
    <>
      <C.Box px={5} py={6}>
        <C.Text mb={4}>Search</C.Text>

        <C.Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
        />
      </C.Box>

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
