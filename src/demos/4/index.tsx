import { NavTabs } from '../../components'

import { Demo4Hooks } from './hooks/Demo4Hooks'
import { Demo4Custom } from './custom/Demo4Custom'
import { Demo4Mobx } from './mobx/Demo4Mobx'

export const Demo4 = () => {
  return (
    <>
      <NavTabs
        storageKey="demo4"
        tabs={[
          { label: 'Hooks', component: <Demo4Hooks /> },
          { label: 'Custom', component: <Demo4Custom /> },
          { label: 'Mobx', component: <Demo4Mobx /> },
        ]}
      />
    </>
  )
}
