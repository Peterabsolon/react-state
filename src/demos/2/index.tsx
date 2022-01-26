/**
 * With infinite scroll
 */

import { useEffect, useState } from 'react'

import { fetchData } from '../../api'
import { COLUMNS, DEFAULT_PAGE_SIZE, IProduct } from '../../constants'
import { DataTable } from '../../components'

export const Demo2 = () => {
  const [data, setData] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [canLoadMore, setCanLoadMore] = useState(true)

  useEffect(() => {
    ;(async () => {
      setData(await fetchData())
      setLoading(false)
    })()
  }, [])

  const onLoadMore = async () => {
    setLoading(true)
    const newData = await fetchData({ skip: data.length + DEFAULT_PAGE_SIZE })
    setData((prevData) => [...prevData, ...newData])
    setCanLoadMore(newData.length === DEFAULT_PAGE_SIZE)
    setLoading(false)
  }

  return (
    <DataTable<IProduct>
      data={data}
      columns={COLUMNS}
      loading={loading}
      onLoadMore={onLoadMore}
      canLoadMore={canLoadMore}
      title="Infinite data loading"
    />
  )
}
