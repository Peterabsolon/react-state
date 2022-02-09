import { CopyBlock, dracula } from 'react-code-blocks'

export const CodeBlock = ({ text }: { text: string }) => (
  <CopyBlock codeBlock language="js" theme={dracula} text={text.trim()} />
)
