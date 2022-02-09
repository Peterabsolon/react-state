import { Box } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { CollectionView } from './components/CollectionView'
import { store } from './index.store'

export const Demo6 = observer(() => (
  <Box display="flex">
    <Box width="50%">
      <CollectionView collection={store.products} />
    </Box>

    <Box width="50%">
      <CollectionView collection={store.someOtherEntity} />
    </Box>
  </Box>
))
