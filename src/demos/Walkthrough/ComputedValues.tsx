import { CodeBlock } from '../../components'

const code = `
import { observable } from 'mobx'

// From docs: Anything that can be derived from the application state, should be. Automatically.

const person = observable({
  firstName: 'Peter',
  lastName: 'Absolon',
  
  get fullName() {
    return \`\${person.firstName} \${person.lastName}\`
  }
})

autorun(() => console.log(\`Person name is \${person.fullName} \`))
`

export const ComputedValues = () => <CodeBlock text={code} />
