import styled from 'styled-components'
import * as C from '@chakra-ui/react'

import { ITableProps, Table } from './Table'
import { TItemBase } from './Table.types'

export interface IDataTableProps<
  TItem extends TItemBase,
  TSortBy extends string
> extends ITableProps<TItem> {
  onLoadMore: () => void
  canLoadMore: boolean
  sortBy?: TSortBy
  sortAsc?: boolean
  onSort?: (key: TSortBy) => void
}

export function DataTable<
  TItem extends TItemBase,
  TSortBy extends string = ''
>({
  columns,
  data,
  loading,
  onLoadMore,
  onSort,
  canLoadMore,
  sortBy,
  sortAsc,
}: IDataTableProps<TItem, TSortBy>) {
  return (
    <div>
      <Table
        data={data}
        loading={loading}
        columns={columns.map((col) => ({
          ...col,
          sorterActive: col.dataKey === sortBy,
          sorterAsc: col.dataKey === sortBy ? sortAsc : false,
          onClick:
            col.sorter && onSort
              ? () => onSort(col.dataKey as unknown as TSortBy)
              : undefined,
        }))}
      />

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
