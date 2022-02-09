import { observer } from 'mobx-react'
import * as C from '@chakra-ui/react'

import { DataTable, PageTitle, Search } from '../../../components'
import { COLUMNS_WITH_SORTING, TProductsSortBy } from '../../../constants'
import { useMount } from '../../../utils'

import { store, ProductModel } from './Demo5Mobx.store'
import { Demo5MobxFormModal } from './Demo5MobxFormModal'

export const Demo5Mobx = observer(() => {
  useMount(store.onMount)

  return (
    <>
      <PageTitleMobx>Search</PageTitleMobx>

      <SearchMobx value={store.searchQuery} onChange={store.onSearch} />

      <C.Box px={5} pb={6}>
        <C.Button onClick={() => store.onFormOpen()}>Add new</C.Button>
      </C.Box>

      <DataTableMobx<ProductModel, TProductsSortBy>
        useObserver
        getActions={(item) => [{ label: 'Edit', onClick: () => store.onFormOpen(item) }]}
        columns={COLUMNS_WITH_SORTING}
        {...store.tableProps}
      />

      <Demo5MobxFormModal />
    </>
  )
})

const DataTableMobx = observer(DataTable)
const SearchMobx = observer(Search)
const PageTitleMobx = observer(PageTitle)
