import { useEffect, useState } from 'react'
import styled from 'styled-components'

const HeaderWrapper = ({ children }: any) => {
  const [header, setHeader] = useState('header')

  useEffect(() => {
    document.getElementById('main_container')?.addEventListener('scroll', () => {
      const scrollTop = document.getElementById('main_container')?.scrollTop || 0

      if (scrollTop > 0) {
        setHeader('scroll')
      }
      if (scrollTop === 0) {
        setHeader('header')
      }
    })
    document.getElementById('main_container')?.classList.add('reset_padding')
  }, [])

  return (
    <StyledHeaderWrapper className='header_wrapper' header={header}>
      {children}
    </StyledHeaderWrapper>
  )
}

export default HeaderWrapper

const StyledHeaderWrapper = styled.header<{ header: string }>`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${p => (p.header === 'scroll' ? 'rgba(0, 0, 0, 0.3)' : 'transparent')};
  padding: 32px 16px;
  transition: all ease 0.3s;
`