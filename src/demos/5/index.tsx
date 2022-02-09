/**
 * - [x] With Create modal - needs modifying from outside
 * - [x] With syncing URL - pagination + filters asQueryParams
 * - [x] With caching, needs initialized to not show loader again (impossible with useState alone?)
 * - [x] with filters
 * - [x] SHOW OLD DEMO with cross dependencies - price per product per rate
 */

import { NavTabs } from '../../components'

import { Demo5Hooks } from './hooks/Demo5Hooks'
import { Demo5Mobx } from './mobx/Demo5Mobx'

export const Demo5 = () => {
  return (
    <>
      <NavTabs
        storageKey="demo5"
        tabs={[
          { label: 'Hooks', component: <Demo5Hooks /> },
          { label: 'Mobx', component: <Demo5Mobx /> },
        ]}
      />
    </>
  )
}
