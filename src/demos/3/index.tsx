/**
 * With sorting
 */

import { useCallback, useEffect, useState } from 'react'

import { fetchData } from '../../api'
import { DataTable } from '../../ui/DataTable'
import {
  COLUMNS_WITH_SORTING,
  DEFAULT_PAGE_SIZE,
  IProduct,
  TProductsSortBy,
} from '../../constants'

export const Demo3 = () => {
  const [data, setData] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [canLoadMore, setCanLoadMore] = useState(true)
  const [sortBy, setSortBy] = useState<TProductsSortBy>('id')
  const [sortAsc, setSortAsc] = useState(true)

  const sortDirection = sortAsc ? 'asc' : 'desc'

  const onInitialFetch = useCallback(async () => {
    setData(await fetchData({ sortBy, sortDirection }))
    setLoading(false)
  }, [sortBy, sortDirection])

  const onLoadMore = async () => {
    setLoading(true)

    const newData = await fetchData({
      skip: data.length + DEFAULT_PAGE_SIZE,
      sortBy,
    })

    setData((prevData) => [...prevData, ...newData])
    setCanLoadMore(newData.length === DEFAULT_PAGE_SIZE)
    setLoading(false)
  }

  const onSort = async (key: TProductsSortBy) => {
    setLoading(true)

    const _sortAsc = key === sortBy ? !sortAsc : true

    setSortBy(key)
    setSortAsc(_sortAsc)

    setData(
      await fetchData({
        skip: 0,
        sortBy: key,
        sortDirection: _sortAsc ? 'asc' : 'desc',
      })
    )

    setLoading(false)
  }

  useEffect(() => {
    ;(async () => {
      onInitialFetch()
    })()
  }, [onInitialFetch])

  return (
    <DataTable<IProduct, TProductsSortBy>
      data={data}
      columns={COLUMNS_WITH_SORTING}
      loading={loading}
      onLoadMore={onLoadMore}
      canLoadMore={canLoadMore}
      sortBy={sortBy}
      sortAsc={sortAsc}
      onSort={onSort}
    />
  )
}
