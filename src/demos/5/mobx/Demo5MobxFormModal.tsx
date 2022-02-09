/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import * as C from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'

import { store } from './Demo5Mobx.store'
import { IProduct } from '../../../constants'

export const Demo5MobxFormModal = observer(() => {
  const [formValues, setFormValues] = useState<Omit<IProduct, 'id'>>({
    title: '',
    material: '',
  })

  // This would be less dumb with form library
  useEffect(() => {
    if (store.formOpen && store.itemToEdit) {
      setFormValues(store.itemToEdit)
    }
  }, [store.formOpen])

  return (
    <C.Modal isOpen={store.formOpen} onClose={store.onFormClose}>
      <C.ModalOverlay />
      <C.ModalContent>
        <C.ModalHeader>{store.itemToEdit ? 'Edit' : 'Create'} Product</C.ModalHeader>
        <C.ModalCloseButton />
        <C.ModalBody>
          <C.Input
            value={formValues.title}
            placeholder="Title"
            mb={1}
            onChange={(evt) => setFormValues((values) => ({ ...values, title: evt.target.value }))}
          />

          <C.Input
            value={formValues.material}
            placeholder="Material"
            onChange={(evt) => setFormValues((values) => ({ ...values, material: evt.target.value }))}
          />
        </C.ModalBody>

        <C.ModalFooter>
          <C.Button colorScheme="blue" mr={3} onClick={store.onFormClose}>
            Close
          </C.Button>
          <C.Button isLoading={store.submitting} onClick={() => store.onFormSubmit(formValues)}>
            Submit
          </C.Button>
        </C.ModalFooter>
      </C.ModalContent>
    </C.Modal>
  )
})
