import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Doc = () => {
  const { t } = useTranslation()

  return (
    <StyledContainer>
      <h1 style={{ color: 'white', textAlign: 'center' }}>{t('doc')}</h1>
    </StyledContainer>
  )
}

export default Doc

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`
