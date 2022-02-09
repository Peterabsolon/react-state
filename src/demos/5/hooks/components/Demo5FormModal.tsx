import { useState } from 'react'
import * as C from '@chakra-ui/react'

export interface IDemo5FormModalProps {
  isOpen: boolean
  onClose: () => void
}

export const Demo5FormModal = ({ isOpen, onClose }: IDemo5FormModalProps) => {
  const [newProduct, setNewProduct] = useState('')

  return (
    <C.Modal isOpen={isOpen} onClose={onClose}>
      <C.ModalOverlay />
      <C.ModalContent>
        <C.ModalHeader>Add new Product</C.ModalHeader>
        <C.ModalCloseButton />
        <C.ModalBody>
          <C.Input value={newProduct} onChange={(evt) => setNewProduct(evt.target.value)} />
        </C.ModalBody>

        <C.ModalFooter>
          <C.Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </C.Button>
          <C.Button type="submit">Submit</C.Button>
        </C.ModalFooter>
      </C.ModalContent>
    </C.Modal>
  )
}
