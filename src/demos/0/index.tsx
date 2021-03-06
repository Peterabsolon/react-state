import { useState } from 'react'

import { Table } from '../../components'
import { COLUMNS, FAKE_DATA, IProduct } from '../../constants'

export const Demo0 = () => {
  const [data] = useState(FAKE_DATA)

  return <Table<IProduct> data={data} columns={COLUMNS} title="Basic table" />
}
