import styled from 'styled-components'

type LinkTypes = {
  href: string
  target?: string
  color?: string
  textAlign?: string
  rel?: string
}

const Link = styled.a<LinkTypes>`
  text-decoration: none;
  display: inline;
  color: ${p => (p.color ? p.color : 'inherit')};
  text-align: ${p => (p.textAlign ? p.textAlign : 'unset')};
  :hover {
    color: ${p => (p.color ? p.color : 'inherit')};
    text-decoration: none;
  }
`

export default Link
