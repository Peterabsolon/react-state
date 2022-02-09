import { ChangeEvent } from 'react'
import * as C from '@chakra-ui/react'

export interface ISearchProps {
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Search = ({ value, onChange }: ISearchProps) => {
  return (
    <C.Box px={5} pb={6}>
      <C.Input value={value} onChange={onChange} placeholder="Search products..." />
    </C.Box>
  )
}
