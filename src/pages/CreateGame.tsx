import styled from 'styled-components'

import { useTranslation } from 'react-i18next'

const CreateGame = () => {
  const { t } = useTranslation()

  return (
    <StyledContainer>
      <h1 style={{ color: 'white', textAlign: 'center' }}>{t('create-game')}</h1>
    </StyledContainer>
  )
}

export default CreateGame

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`
