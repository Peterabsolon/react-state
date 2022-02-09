import { CodeBlock } from '../../components'

const code = `
import { observable } from 'mobx'

// From docs: Anything that can be derived from the application state, should be. Automatically.

const person = observable({
  firstName: 'Peter',
  lastName: 'Absolon',
  age: 27,
  
  get fullName() {
    console.log('Running get fullName()')
    return \`\${person.firstName} \${person.lastName}\`
  }
})

autorun(() => person.age < 30 && console.log(\`Person name is \${person.fullName} \`))
// console.logs "Running get fullName()"
// console.logs "Person name is Peter Absolon"

person.age = 31
// doesn't do anything...
// MobX knows the autorun branch won't execute so it doesn't bother to recalculate the observables inside
// 🚀🤯🤯🤯🎉
`

export const LazyExecution = () => <CodeBlock text={code} />
