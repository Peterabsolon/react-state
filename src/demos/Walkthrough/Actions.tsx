import { CodeBlock } from '../../components'

const code = `
import { observable, observer, autorun, action } from 'mobx'

const updateSomehow = () => window.fetch()

const person = observable({
  firstName: 'Peter',
  lastName: 'Absolon',
  favoriteFoods: ['Pasta', 'Eggs Benedict'],
  age: 27,
  
  setData: action((firstName, lastName, age) => {
    person.firstName = firstName
    person.lastName = lastName
    person.age = age
  }),

  updateProfile: action(async () => {
    const res = await updateSomehow()
    person.firstName = res.firstName
    person.lastName = res.lastName
    person.age = res.age
  })
})

autorun(() => console.log(\`Person name is \${person.firstName} \${person.lastName} \`))
// console.log "Person name is Peter Absolon"

person.setData('John', 'Doe', 22)
// console.log "Person name is John Doe"
`

export const Actions = () => <CodeBlock text={code} />
