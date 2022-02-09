import { FC } from 'react'
import styled from 'styled-components'

export const PageTitle: FC = ({ children }) => {
  return <Title>{children}</Title>
}

const Title = styled.h2`
  padding: 12px 24px;
  font-size: 18px;
  font-weight: 600;
`
