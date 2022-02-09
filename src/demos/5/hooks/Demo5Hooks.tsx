import * as C from '@chakra-ui/react'
import { useState } from 'react'

import { PageTitle } from '../../../components'
import { Demo5DataTable, Demo5FormModal } from './components'

export const Demo5Hooks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <PageTitle>"Kitchen sink" DataTable</PageTitle>

      <C.Box px={5} pb={6}>
        <C.Button onClick={openModal}>Add new</C.Button>
      </C.Box>
      <Demo5FormModal isOpen={isModalOpen} onClose={closeModal} />

      <Demo5DataTable />
    </>
  )
}
