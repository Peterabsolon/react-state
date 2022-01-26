import * as C from '@chakra-ui/react'
import styled, { css } from 'styled-components'

import { TColumn, TItemBase } from './Table.types'

export interface ITableHeaderProps<TItem extends TItemBase> {
  col: TColumn<TItem>
}

export function TableHeader<TItem extends TItemBase>({ col }: ITableHeaderProps<TItem>) {
  return (
    <C.Th onClick={col.onClick} _hover={{ cursor: 'pointer' }} style={{ userSelect: 'none' }}>
      {col.label}
      {col.sorter && <Sorter active={col.sorterActive}>{col.sorterAsc ? '👆' : '👇'}</Sorter>}
    </C.Th>
  )
}

const Sorter = styled.div<{ active?: boolean }>`
  display: inline-block;
  opacity: 0.4;
  margin-left: 5px;

  ${({ active }) => css`
    ${active &&
    css`
      opacity: 1;
    `}
  `}
`
