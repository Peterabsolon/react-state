import { observer } from 'mobx-react'

import { DataTable, PageTitle, Search } from '../../../components'
import { COLUMNS_WITH_SORTING, IProduct, TProductsSortBy } from '../../../constants'
import { useMount } from '../../../utils'

import { store } from './Demo4Mobx.store'

export const Demo4Mobx = observer(() => {
  useMount(store.onMount)

  return (
    <>
      <PageTitleMobx>Search</PageTitleMobx>

      <SearchMobx value={store.searchQuery} onChange={store.onSearch} />

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
const SearchMobx = observer(Search)
const PageTitleMobx = observer(PageTitle)
