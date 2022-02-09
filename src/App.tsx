import { useState } from 'react'
import styled from 'styled-components'
import * as C from '@chakra-ui/react'

import * as demos from './demos'

function App() {
  const [demo, setDemo] = useState(localStorage.getItem('demoKey') || 'Demo1')

  const onSetDemo = (key: string) => {
    setDemo(key)
    localStorage.setItem('demoKey', key)
  }

  // @ts-ignore
  const Demo = demos[demo]

  return (
    <div className="App">
      <Wrapper>
        <Navigation>
          {Object.keys(demos).map((key) => (
            <C.Button key={key} onClick={() => onSetDemo(key)}>
              {key}
            </C.Button>
          ))}
        </Navigation>

        <Content>
          <Demo />
        </Content>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  display: flex;
`

const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;

  button {
    margin-bottom: 12px;
  }
`

const Content = styled.div`
  flex-grow: 1;
`

export default App
