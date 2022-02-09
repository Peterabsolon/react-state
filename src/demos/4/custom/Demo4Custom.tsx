/**
 * Even more useCallback hell...
 */

import { useCallback, useState } from 'react'
import { DataTable, PageTitle, Search } from '../../../components'
import { COLUMNS_WITH_SORTING, IProduct, TProductsSortBy } from '../../../constants'
import { useMount } from '../../../utils'

import { store } from './Demo4Custom.store'

// Force rerender
function useRender() {
  // eslint-disable-next-line
  const [_value, setValue] = useState(0)
  return useCallback(() => setValue((value) => value + 1), [])
}

export const Demo4Custom = () => {
  const render = useRender()
  const handleMount = useCallback(() => store.onMount(render), [render])
  useMount(handleMount)

  return (
    <>
      <PageTitle>Search</PageTitle>

      <Search value={store.searchQuery} onChange={store.onSearch} />

      <DataTable<IProduct, TProductsSortBy>
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
}
