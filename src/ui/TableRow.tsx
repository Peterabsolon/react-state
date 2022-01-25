import styled from 'styled-components'

import { TColumn, TItemBase } from './Table.types'
import { TableCell } from './TableCell'

export interface ITableRowProps<TItem extends TItemBase> {
  item: TItem
  columns: TColumn<TItem>[]
}

export function TableRow<TItem extends TItemBase>({
  item,
  columns,
}: ITableRowProps<TItem>) {
  return (
    <Row>
      {columns.map((column) => (
        <TableCell column={column} item={item} />
      ))}
    </Row>
  )
}

export const Row = styled.tr``
