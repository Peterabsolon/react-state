/**
 * With data fetching
 */

import { useEffect, useState } from 'react'

import { fetchData } from '../../api'
import { COLUMNS, IProduct } from '../../constants'
import { Table } from '../../components'

export const Demo1 = () => {
  const [data, setData] = useState<IProduct[]>([])

  useEffect(() => {
    ;(async () => setData(await fetchData()))()
  }, [])

  return <Table<IProduct> data={data} columns={COLUMNS} title="Fetch data on mount" />
}
