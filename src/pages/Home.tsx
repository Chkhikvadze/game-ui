import styled from 'styled-components'

import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()

  return (
    <StyledContainer>
      <h1 style={{ color: 'white', textAlign: 'center' }}>{t('home')}</h1>
    </StyledContainer>
  )
}

export default Home

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`
