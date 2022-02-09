import { CodeBlock } from '../../components'

const code = `
import { observable, observer, autorun, action } from 'mobx'

const updateSomehow = () => window.fetch()

class Person {
  firstName = 'Peter'
  lastName = 'Absolon'
  favoriteFoods = ['Pasta', 'Eggs Benedict']
  age = 27

  constructor() {
    makeAutoObservable(this)
  }

  get fullName() {
    return \`\${this.firstName} \${this.lastName}\`
  }
  
  setData = (firstName, lastName, age) => {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }

  updateProfile = async () => {
    const res = await updateSomehow()
    this.firstName = res.firstName
    this.lastName = res.lastName
    this.age = res.age
  }
})

const person = new Person()

autorun(() => console.log(\`Person name is \${person.firstName} \${person.lastName} \`))
// console.log "Person name is Peter Absolon"

person.setData('John', 'Doe', 22)
// console.log "Person name is John Doe"
`

export const MakeAutoObservable = () => <CodeBlock text={code} />
