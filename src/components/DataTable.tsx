import styled from 'styled-components'
import * as C from '@chakra-ui/react'

import { ITableProps, Table } from './Table'
import { TItemBase } from './Table.types'
import { TSortDirection } from '../constants'
import { useMemo } from 'react'
import { observer } from 'mobx-react-lite'

export interface IDataTableProps<TItem extends TItemBase, TSortBy extends string, TFilters extends Record<string, any>>
  extends ITableProps<TItem> {
  canLoadMore?: boolean
  onLoadMore: () => void
  onSort?: (key: TSortBy) => void
  onFilter?: (key: keyof TFilters, value: string) => void
  sortBy?: TSortBy
  sortDirection?: TSortDirection
  filters?: Partial<TFilters>
  getActions?: (item: TItem) => { label: string; onClick: () => void }[]
  useObserver?: boolean
}

export function DataTable<
  TItem extends TItemBase,
  TSortBy extends string = '',
  TFilters extends Record<string, any> = {}
>({
  canLoadMore,
  columns,
  data,
  filters,
  loading,
  onFilter,
  onLoadMore,
  onSort,
  sortBy,
  sortDirection,
  title,
  getActions,
  useObserver,
}: IDataTableProps<TItem, TSortBy, TFilters>) {
  console.log('DataTable render')

  const columnsFinal = useMemo(
    () =>
      columns.map((col) => ({
        ...col,
        sorterActive: col.dataKey === sortBy,
        sorterAsc: col.dataKey === sortBy ? sortDirection === 'asc' : false,
        onSort: col.sorter && onSort ? () => onSort(col.dataKey as unknown as TSortBy) : undefined,
        onFilter: onFilter ? (value: string) => onFilter(col.dataKey as keyof TFilters, value) : undefined,
      })),
    [onSort, onFilter, columns, sortBy, sortDirection]
  )

  const tableProps = {
    data,
    title,
    loading,
    columns: columnsFinal,
    getActions,
  }

  return (
    <div>
      {useObserver ? <MobxTable {...tableProps} /> : <Table {...tableProps} />}

      <Footer>
        {loading ? (
          <C.Spinner size="xl" mb={3} />
        ) : canLoadMore ? (
          <C.Button onClick={onLoadMore}>Load more</C.Button>
        ) : (
          <C.Text>No more results</C.Text>
        )}
      </Footer>
    </div>
  )
}

const Footer = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const MobxTable = observer(Table)
