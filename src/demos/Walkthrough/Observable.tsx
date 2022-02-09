import { CodeBlock } from '../../components'

const code = `
import { observable } from 'mobx'

const person = observable({
  firstName: 'Peter',
  lastName: 'Absolon',
  favoriteFoods: ['Pasta', 'Eggs Benedict'],
  age: 27
})
`

export const Observable = () => <CodeBlock text={code} />
