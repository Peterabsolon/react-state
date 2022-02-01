import * as C from '@chakra-ui/react'

import { PageTitle } from './PageTitle'
import { TableHeader } from './TableHeader'
import { TItemBase, TColumn } from './Table.types'

export interface ITableProps<TItem extends TItemBase> {
  data: TItem[]
  columns: TColumn<TItem>[]
  loading?: boolean
  title?: string
}

export function Table<TItem extends TItemBase>(props: ITableProps<TItem>) {
  return (
    <>
      {props.title && <PageTitle>{props.title}</PageTitle>}

      <C.Table colorScheme="gray" variant="striped" aria-busy={props.loading} _loading={{ opacity: 0.3 }}>
        <C.Thead>
          <C.Tr>
            {props.columns.map((col, index) => (
              <TableHeader key={col.dataKey + index.toString()} col={col} />
            ))}
          </C.Tr>
        </C.Thead>

        <C.Tbody>
          {props.data.map((item) => (
            <C.Tr key={item.id}>
              {props.columns.map((col) => (
                <C.Td key={col.dataKey.toString()}>{item[col.dataKey]}</C.Td>
              ))}
            </C.Tr>
          ))}
        </C.Tbody>
      </C.Table>
    </>
  )
}
