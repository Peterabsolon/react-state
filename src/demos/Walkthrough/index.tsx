import * as C from '@chakra-ui/react'

import { NavTabs, PageTitle } from '../../components'

import { Actions } from './Actions'
import { Autorun } from './Autorun'
import { ComputedValues } from './ComputedValues'
import { LazyExecution } from './LazyExecution'
import { Observable } from './Observable'
import { Overview } from './Overview'
import { SideEffects } from './SideEffects'
import { MakeAutoObservable } from './MakeAutoObservable'

export const Walkthrough = () => (
  <>
    <PageTitle>Walkthrough</PageTitle>

    <C.Box px={6} pt={2}>
      <NavTabs
        storageKey="demo5"
        tabs={[
          { label: 'Overview', component: <Overview /> },
          { label: 'Observable', component: <Observable /> },
          { label: 'Autorun', component: <Autorun /> },
          { label: 'Side effects', component: <SideEffects /> },
          { label: 'Computed values', component: <ComputedValues /> },
          { label: 'Lazy execution', component: <LazyExecution /> },
          { label: 'Actions', component: <Actions /> },
          { label: 'makeAutoObservable', component: <MakeAutoObservable /> },
          { label: 'Flow', component: () => <img alt="flow" src="flow2.png" /> },
          {
            label: '50 LoC implementation',
            component: () => (
              <>
                <C.Link
                  px={4}
                  mt={4}
                  display="block"
                  target="_blank"
                  href="https://codesandbox.io/embed/mystifying-jones-vc18p?file=/index.js&codemirror=1"
                  style={{ textDecoration: 'underline' }}
                >
                  Code sandbox link
                </C.Link>
              </>
            ),
          },
          {
            label: 'Render performance demo',
            component: () => <>Show demo...</>,
          },

          //    { label: 'Custom', component: <Demo5Custom /> },
          //    { label: 'Mobx', component: <Demo5Mobx /> },
        ]}
      />
    </C.Box>
  </>
)
