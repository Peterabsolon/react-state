export type TItemBase = {
  id: number
}

export type TColumn<TItem extends TItemBase> = {
  label: string
  dataKey: keyof TItem
  sorter?: boolean
  sorterActive?: boolean
  sorterAsc?: boolean
  onClick?: () => void
}
