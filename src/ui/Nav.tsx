import * as C from '@chakra-ui/react'
import { times } from 'lodash'

interface INavProps {
  defaultIndex: number
  count: number
  onClick: (demo: number) => void
}

export const Nav = ({ defaultIndex, count, onClick }: INavProps) => (
  <C.Tabs defaultIndex={defaultIndex}>
    <C.TabList>
      {times(count).map((_, index) => (
        <C.Tab key={index} onClick={() => onClick(index)}>
          Demo {index}
        </C.Tab>
      ))}
    </C.TabList>
  </C.Tabs>
)
