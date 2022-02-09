export type TItemBase = {
  id: number
}

export type TColumn<TItem extends TItemBase> = {
  dataKey: keyof TItem
  label: string
  onSort?: () => void
  onFilter?: (value: string) => void
  sorter?: boolean
  sorterActive?: boolean
  sorterAsc?: boolean
  filter?: boolean
}
