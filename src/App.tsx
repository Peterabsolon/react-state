import { useState } from 'react'

import { Nav } from './ui/Nav'

import { Demo0 } from './demos/0'
import { Demo1 } from './demos/1'
import { Demo2 } from './demos/2'
import { Demo3 } from './demos/3'

const COUNT = 4

function App() {
  const [demo, setDemo] = useState(Number(localStorage.getItem('demo')) || 0)

  const onSetDemo = (index: number) => {
    setDemo(index)
    localStorage.setItem('demo', index.toString())
  }

  return (
    <div className="App">
      <Nav count={COUNT} onClick={onSetDemo} defaultIndex={demo} />

      {demo === 0 && <Demo0 />}
      {demo === 1 && <Demo1 />}
      {demo === 2 && <Demo2 />}
      {demo === 3 && <Demo3 />}
    </div>
  )
}

export default App
