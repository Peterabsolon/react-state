import { CodeBlock } from '../../components'

const code = `
import { observable, autorun } from 'mobx'
import { observer } from 'mobx-react' // bindings for React

// React render is also just a side-ffect
const ReactComponent = observer(() => (
  <>
    {person.firstName} {person.lastName}
  </>
))

// More fine grained version of autorun, lets us execute side-effects conditionally
when(
  () => person.firstName.startsWith('P'),
  () => console.log(\`Person name is \${person.firstName} \${person.lastName}\`)
)

// MobX version of useEffect with data dependencies function in front
reaction(
  () => person.firstName,
  () => console.log(\`Person name is \${person.firstName} \${person.lastName}\`)
)
`

export const SideEffects = () => <CodeBlock text={code} />
