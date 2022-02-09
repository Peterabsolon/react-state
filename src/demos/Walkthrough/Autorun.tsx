import { CodeBlock } from '../../components'

const code = `
import { observable, observer, autorun } from 'mobx'

const person = observable({
  firstName: 'Peter',
  lastName: 'Absolon',
  favoriteFoods: ['Pasta', 'Eggs Benedict'],
  age: 27
})

autorun(() => console.log(\`Person name is \${person.firstName} \${person.lastName} \`))
// console.log "Person name is Peter Absolon"

person.firstName = 'Adam'
// console.log "Person name is Adam Absolon"
`

export const Autorun = () => <CodeBlock text={code} />
