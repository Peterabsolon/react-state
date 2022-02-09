import * as C from '@chakra-ui/react'
import { observable, autorun, action } from 'mobx'
import { observer } from 'mobx-react-lite'

import { PageTitle } from '../../components'

const person = observable({
  firstName: 'Peter',
  lastName: 'Absolon',
  favoriteFoods: ['Pasta', 'Eggs Benedict'],
  age: 27,

  setData: action((firstName: string, lastName: string, age: number) => {
    person.firstName = firstName
    person.lastName = lastName
    person.age = age
  }),
})

autorun(() => console.log(`Person name is ${person.firstName} ${person.lastName} `))
// console.log "Person name is Peter Absolon"

person.setData('John', 'Doe', 22)
// console.log "Person name is John Doe"

// Expose for debug
;(window as any).person = person

export const Playground = observer(() => {
  return (
    <div>
      <PageTitle>Playground</PageTitle>

      <C.Box px={6} py={2}>
        <div>Person full name:</div>
        {person.firstName} {person.lastName}
      </C.Box>
    </div>
  )
})
