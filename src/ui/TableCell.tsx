import styled from 'styled-components'

import { TColumn, TItemBase } from './Table.types'

export interface ITableCellProps<TItem extends TItemBase> {
  item: TItem
  column: TColumn<TItem>
}

export function TableCell<TItem extends TItemBase>({
  item,
  column,
}: ITableCellProps<TItem>) {
  const value = item[column.dataKey]

  return <Cell>{value}</Cell>
}

const Cell = styled.td``
