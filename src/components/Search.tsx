import {
  ChangeEvent,
  // For Demo4
  // useEffect
} from 'react'
import * as C from '@chakra-ui/react'

export interface ISearchProps {
  value?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Search = ({ value, onChange }: ISearchProps) => {
  // For Demo4
  // useEffect(() => {
  //   console.log('search effect ran')
  //   onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)
  // }, [onChange])

  return (
    <C.Box px={5} pb={6}>
      <C.Input value={value} onChange={onChange} placeholder="Search products..." />
    </C.Box>
  )
}
