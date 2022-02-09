import { useState } from 'react'
import * as C from '@chakra-ui/react'

import { Demo4Hooks } from './hooks/Demo4Hooks'
import { Demo4Custom } from './custom/Demo4Custom'
import { Demo4Mobx } from './mobx/Demo4Mobx'

export const Demo4 = () => {
  const [version, setVersion] = useState<'hooks' | 'mobx' | 'custom'>('hooks')

  return (
    <>
      <C.Tabs defaultIndex={0}>
        <C.TabList>
          <C.Tab onClick={() => setVersion('hooks')}>Hooks</C.Tab>
          <C.Tab onClick={() => setVersion('custom')}>Custom</C.Tab>
          <C.Tab onClick={() => setVersion('mobx')}>Mobx</C.Tab>
        </C.TabList>

        {version === 'hooks' && <Demo4Hooks />}
        {version === 'custom' && <Demo4Custom />}
        {version === 'mobx' && <Demo4Mobx />}
      </C.Tabs>
    </>
  )
}
