import * as C from '@chakra-ui/react'
import styled, { css } from 'styled-components'

import { TColumn, TItemBase } from './Table.types'

export interface ITableHeaderProps<TItem extends TItemBase> {
  col: TColumn<TItem>
  filter?: string
}

export function TableHeader<TItem extends TItemBase>({ col, filter }: ITableHeaderProps<TItem>) {
  return (
    <C.Th onClick={col.onSort} _hover={{ cursor: 'pointer' }} style={{ userSelect: 'none' }}>
      <Content>
        <Label>
          {col.label}
          {col.sorter && <Sorter active={col.sorterActive}>{col.sorterAsc ? '👆' : '👇'}</Sorter>}
        </Label>

        {col.onFilter && (
          <C.Input
            ml={3}
            value={filter}
            placeholder={`Filter by ${col.label}`}
            onChange={(evt) => col.onFilter && col.onFilter(evt.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </Content>
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

const Content = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled.div`
  flex-shrink: 0;
`
