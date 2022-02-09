/**
 * - With Create modal - needs modifying from outside
 * - With default query params?
 * - With syncing URL - pagination + filters asQueryParams
 * - With count - needs fetching/searching to display correct message
 * - With caching, needs initialized to not show loader again (impossible with useState alone?)
 */

import { NavTabs } from '../../components'

import { Demo5Hooks } from './hooks/Demo5Hooks'
//  import { Demo5Custom } from './custom/Demo5Custom'
//  import { Demo5Mobx } from './mobx/Demo5Mobx'

export const Demo5 = () => {
  return (
    <>
      <NavTabs
        storageKey="demo5"
        tabs={[
          { label: 'Hooks', component: <Demo5Hooks /> },
          //    { label: 'Custom', component: <Demo5Custom /> },
          //    { label: 'Mobx', component: <Demo5Mobx /> },
        ]}
      />
    </>
  )
}
