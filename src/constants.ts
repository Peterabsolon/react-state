import faker from 'faker'
import { times } from 'lodash'

import { TColumn } from './ui/Table.types'

export const DEFAULT_PAGE_SIZE = 20
export const PRODUCTS_SORT_BY = ['id', 'title', 'material'] as const
export const SORT_DIRECTION = ['asc', 'desc'] as const

export type TProductsSortBy = typeof PRODUCTS_SORT_BY[number]
export type TSortDirection = typeof SORT_DIRECTION[number]

export interface IProduct {
  id: number
  title: string
  material: string
}

export const COLUMNS: TColumn<IProduct>[] = [
  { dataKey: 'id', label: 'ID' },
  { dataKey: 'title', label: 'Title' },
  { dataKey: 'material', label: 'Material' },
]

export const COLUMNS_WITH_SORTING = COLUMNS.map((col) => ({
  ...col,
  sorter: PRODUCTS_SORT_BY.includes(col.dataKey as TProductsSortBy),
}))

export const FAKE_DATA: IProduct[] = times(100).map((index) => ({
  id: index + 1,
  title: faker.commerce.product(),
  material: faker.commerce.productMaterial(),
}))
