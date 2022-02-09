import { useState } from 'react'
import * as C from '@chakra-ui/react'

import { Demo4Hooks } from './hooks/Demo4Hooks'
import { Demo4Custom } from './custom/Demo4Custom'
import { Demo4Mobx } from './mobx/Demo4Mobx'

type TVersion = 'hooks' | 'custom' | 'mobx'

export const Demo4 = () => {
  const [version, setVersion] = useState<TVersion>((localStorage.getItem('Demo4Version') || 'hooks') as TVersion)

  const handleSetVersion = (version: TVersion) => {
    localStorage.setItem('Demo4Version', version)
    setVersion(version)
  }

  const defaultIndex = version === 'hooks' ? 0 : version === 'custom' ? 1 : 2

  return (
    <>
      <C.Tabs defaultIndex={defaultIndex}>
        <C.TabList>
          <C.Tab onClick={() => handleSetVersion('hooks')}>Hooks</C.Tab>
          <C.Tab onClick={() => handleSetVersion('custom')}>Custom</C.Tab>
          <C.Tab onClick={() => handleSetVersion('mobx')}>Mobx</C.Tab>
        </C.TabList>

        {version === 'hooks' && <Demo4Hooks />}
        {version === 'custom' && <Demo4Custom />}
        {version === 'mobx' && <Demo4Mobx />}
      </C.Tabs>
    </>
  )
}
