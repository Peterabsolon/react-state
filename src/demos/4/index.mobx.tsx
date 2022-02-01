import * as C from '@chakra-ui/react'
import { observer } from 'mobx-react'

import { DataTable, PageTitle } from '../../components'
import { COLUMNS_WITH_SORTING, IProduct, TProductsSortBy } from '../../constants'
import { useMount } from '../../utils'

import { store } from './index.store'

export const Demo4Mobx = observer(() => {
  useMount(store.onMount)

  return (
    <>
      <PageTitleMobx>Search</PageTitleMobx>

      <C.Box px={5} pb={6}>
        <InputMobx value={store.searchQuery} onChange={store.onSearch} placeholder="Search products..." />
      </C.Box>

      <DataTableMobx<IProduct, TProductsSortBy>
        canLoadMore={store.canLoadMore}
        columns={COLUMNS_WITH_SORTING}
        data={store.data}
        loading={store.loading}
        onLoadMore={store.onLoadMore}
        onSort={store.onSort}
        sortBy={store.sortBy}
        sortDirection={store.sortDirection}
      />
    </>
  )
})

const DataTableMobx = observer(DataTable)
const InputMobx = observer(C.Input)
const PageTitleMobx = observer(PageTitle)
