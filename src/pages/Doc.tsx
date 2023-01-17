import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Doc = () => {
  const { t } = useTranslation()

  return (
    <StyledContainer>
      <H1>{t('doc')}</H1>
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
const H1 = styled.h1`
  color: white;
  text-align: center;
`
