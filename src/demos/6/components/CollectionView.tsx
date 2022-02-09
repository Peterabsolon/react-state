import { observer } from 'mobx-react'
import * as C from '@chakra-ui/react'

import { DataTable, PageTitle, Search } from '../../../components'
import { COLUMNS_WITH_SORTING, TProductsSortBy } from '../../../constants'
import { useMount } from '../../../utils'
import { ProductModel } from '../../5/mobx/Demo5Mobx.store'

import { Collection } from '../modules/Collection'

interface ICollectionViewProps {
  collection: Collection<any, any, any, any, any>
}

export const CollectionView = observer(({ collection }: ICollectionViewProps) => {
  useMount(collection.onMount)

  return (
    <>
      <PageTitleMobx>Collection</PageTitleMobx>

      <SearchMobx value={collection.searchQuery} onChange={collection.onSearch} />

      <C.Box px={5} pb={6}>
        <C.Button onClick={() => collection.onFormOpen()}>Add new</C.Button>
      </C.Box>

      <DataTableMobx<ProductModel, TProductsSortBy>
        useObserver
        getActions={(item) => [{ label: 'Edit', onClick: () => collection.onFormOpen(item) }]}
        columns={COLUMNS_WITH_SORTING}
        {...collection.tableProps}
      />
    </>
  )
})

const DataTableMobx = observer(DataTable)
const SearchMobx = observer(Search)
const PageTitleMobx = observer(PageTitle)
