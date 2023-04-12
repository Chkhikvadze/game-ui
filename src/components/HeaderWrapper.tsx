import { useEffect, useState } from 'react'
import styled from 'styled-components'

const HeaderWrapper = ({ children }: any) => {
  const [is_scroll, set_is_scroll] = useState(false)

  useEffect(() => {
    document.getElementById('main_container')?.addEventListener('scroll', (e: any) => {
      const scrollPosition = e.target.scrollTop
      if (scrollPosition > 0) {
        set_is_scroll(true)
      } else {
        set_is_scroll(false)
      }
    })
  }, [])

  return (
    <StyledHeaderWrapper className='header_wrapper' is_scroll={is_scroll}>
      {children}
    </StyledHeaderWrapper>
  )
}

export default HeaderWrapper

const StyledHeaderWrapper = styled.div<{ is_scroll: boolean }>`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: transparent;
  // transition: all ease 0.3s;

  ${({ is_scroll }) =>
    is_scroll &&
    `
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0) 88.84%);
  mix-blend-mode: normal;
  backdrop-filter: blur(20px);
  `}
`
