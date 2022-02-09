import { useEffect, useState } from 'react'
import * as C from '@chakra-ui/react'
import styled from 'styled-components'

export const Overview = () => {
  const [linesVisible, setLinesVisible] = useState(1)

  const items = [
    <Item>- Minimalistic, simple, scalable, boilerplate free state management</Item>,
    <Item>- Completely separated from the UI layer</Item>,
    <Item>- Unopinionated, gives architectural freedom (double edged sword though)</Item>,
    <Item>- Transparently applies functional reactive programming paradigm</Item>,
    <Item>- It's like React for data: code the "what" part, not "how"</Item>,
    <Item>- Flawlessly optimizes React render performance with 0 effort 🚀🚀🚀</Item>,
    <Item>- Pleasure to work with 💜</Item>,
  ]

  const visible = items.slice(0, linesVisible)

  useEffect(() => {
    window.addEventListener('keypress', (evt) => {
      console.log('evt.keyCode', evt.keyCode)

      if (evt.keyCode === 32) {
        setLinesVisible((v) => v + 1)
      }
    })
  }, [])

  return (
    <C.Box px={3} pt={3}>
      <C.List>{visible.map((row) => row)}</C.List>
    </C.Box>
  )
}

const Item = styled(C.ListItem)`
  font-size: 18px;
`
