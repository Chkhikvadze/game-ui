import styled from 'styled-components'
import DeploySummaryCard from './DeploySummaryCard'

const DeploySummary = () => {
  return (
    <StyledWrapper>
      <DeploySummaryCard properties={[{ title: 'Chain', value: 'Polygon PoS' }]} />

      <DeploySummaryCard
        headerTitle='Details'
        properties={[
          { title: 'Max assets per player', value: '100' },
          { title: 'Max assets per transaction', value: '20' },
        ]}
      />

      <DeploySummaryCard properties={[{ title: 'Collection', value: 'Collection 22' }]} />

      <DeploySummaryCard headerTitle='Royalties' headerValue='5%' properties={[]} />
    </StyledWrapper>
  )
}

export default DeploySummary

const StyledWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`
