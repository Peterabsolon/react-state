import { useState } from 'react'

import { Nav } from './components/Nav'

import { Demo0 } from './demos/0'
import { Demo1 } from './demos/1'
import { Demo2 } from './demos/2'
import { Demo3 } from './demos/3'
import { Demo4 } from './demos/4'
import { Demo4Mobx } from './demos/4/index.mobx'
import { Demo5 } from './demos/5'

const COUNT = 6

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
      {demo === 4 && <Demo4Mobx />}
      {demo === 5 && <Demo5 />}
    </div>
  )
}

export default App
