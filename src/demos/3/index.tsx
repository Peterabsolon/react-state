/**
 * With sorting
 */

import { useEffect, useState } from 'react'

import { fetchData } from '../../api'
import { DataTable } from '../../components'
import { COLUMNS_WITH_SORTING, DEFAULT_PAGE_SIZE, IProduct, TProductsSortBy, TSortDirection } from '../../constants'

const DEFAULT_SORT_BY = 'id'
const DEFAULT_SORT_DIRECTION = 'asc'

export const Demo3 = () => {
  // ===================================================
  // State
  // ===================================================
  const [data, setData] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [canLoadMore, setCanLoadMore] = useState(true)
  const [sortBy, setSortBy] = useState<TProductsSortBy>(DEFAULT_SORT_BY)
  const [sortDirection, setSortDirection] = useState<TSortDirection>(DEFAULT_SORT_DIRECTION)

  // ===================================================
  // Handlers
  // ===================================================
  const onLoadMore = async () => {
    setLoading(true)

    const newData = await fetchData({
      skip: data.length,
      sortBy,
      sortDirection,
    })

    setData((oldData) => [...oldData, ...newData])
    setCanLoadMore(newData.length === DEFAULT_PAGE_SIZE)
    setLoading(false)
  }

  const onSort = async (sortByNew: TProductsSortBy) => {
    const sortDirectionFlipped = sortDirection === 'asc' ? 'desc' : 'asc'
    const sortDirectionNew = sortByNew === sortBy ? sortDirectionFlipped : 'asc'

    setLoading(true)
    setSortBy(sortByNew)
    setSortDirection(sortDirectionNew)

    const newData = await fetchData({
      skip: 0, // React batches updates, `data.length` may not be updated yet here
      sortBy: sortByNew,
      sortDirection: sortDirectionNew,
    })

    setData(newData)
    setCanLoadMore(newData.length === DEFAULT_PAGE_SIZE)
    setLoading(false)
  }

  // ===================================================
  // Effects
  // ===================================================
  useEffect(() => {
    ;(async () => {
      // Can't pass local state - fetch would run twice
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
    <DataTable<IProduct, TProductsSortBy>
      canLoadMore={canLoadMore}
      columns={COLUMNS_WITH_SORTING}
      data={data}
      loading={loading}
      onLoadMore={onLoadMore}
      onSort={onSort}
      sortBy={sortBy}
      sortDirection={sortDirection}
      title="Sorting"
    />
  )
}
