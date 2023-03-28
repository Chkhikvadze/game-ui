import styled from 'styled-components'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark, docco, xcode, vs } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useParams } from 'react-router-dom'
import moment from 'moment'

const Details = ({ log }: any) => {
  // const params = useParams()

  const data = log

  const param = data.gql_variables

  return (
    <StyledContainer>
      <StyledTitle>
        {data.method} {data.endpoint}
      </StyledTitle>

      <StyledDetails>
        <StyledDetailsItem>
          <StyledLabel>Status</StyledLabel>
          <StyledStatusContainer is_error={parseInt(data.status) !== 200}>
            {data.status} {parseInt(data.status) !== 200 ? 'ERR' : 'OK'}
          </StyledStatusContainer>
        </StyledDetailsItem>
        <StyledDetailsItem>
          <StyledLabel>ID</StyledLabel>
          <StyledLabel>{data.id}</StyledLabel>
        </StyledDetailsItem>
        <StyledDetailsItem>
          <StyledLabel>Time</StyledLabel>
          <StyledLabel>{moment(data.request_date).format('h:mm:ss A')}</StyledLabel>
        </StyledDetailsItem>
        <StyledDetailsItem>
          <StyledLabel>IP address</StyledLabel>
          <StyledLabel>{data.ip}</StyledLabel>
        </StyledDetailsItem>
        <StyledDetailsItem>
          <StyledLabel>API Version</StyledLabel>
          <StyledLabel>2022-08-01</StyledLabel>
        </StyledDetailsItem>
        <StyledDetailsItem>
          <StyledLabel>Source</StyledLabel>
          <StyledLabel>{data.source_type} – likosxp+42@gmail.com</StyledLabel>
        </StyledDetailsItem>
        <StyledDetailsItem>
          <StyledLabel>Idempotency</StyledLabel>
          <StyledLabel>Key – {data.id}</StyledLabel>
        </StyledDetailsItem>
      </StyledDetails>

      <StyledLine />

      <StyledSubTitle>Request query parametrs</StyledSubTitle>

      <StyledCodeContainer>
        <SyntaxHighlighter
          language='javascript'
          style={atomOneDark}
          showLineNumbers={true}
          customStyle={{
            backgroundColor: 'transparent',
            opacity: '1',
            marginTop: '-2rem',
            lineHeight: '1',
            fontSize: '1.2em',
          }}
          codeTagProps={{
            style: {
              color: 'white',
            },
          }}
        >
          {JSON.stringify(param, null, 4)}
        </SyntaxHighlighter>
      </StyledCodeContainer>
    </StyledContainer>
  )
}

export default Details

const StyledContainer = styled.div`
  background: rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 32px 16px;
`

const StyledTitle = styled.div`
  font-size: 30px;
`

const StyledDetails = styled.div``

const StyledDetailsItem = styled.div`
  display: grid;
  grid-template-columns: 30% auto;
  width: 520px;
  margin-top: 10px;
`

const StyledLabel = styled.div``

const StyledLine = styled.div`
  width: 100%;
  height: 8px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-top: 2px solid rgba(255, 255, 255, 0.15);
  margin-top: 34px;
`

const StyledSubTitle = styled.div`
  margin-top: 32px;
`

const StyledCodeContainer = styled.div`
  margin-top: 40px;
`
const StyledStatusContainer = styled.div<{ is_error: boolean }>`
  width: 75px;
  background: ${({ is_error }) =>
    is_error
      ? 'linear-gradient(180deg, #D14485 0%, #E23248 100%)'
      : 'linear-gradient(180deg, #CEFB53 0%, #7AF94B 100%)'};
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(100px);
  border-radius: 4px;
  font-style: normal;
  font-weight: 500;
  padding: 2px 4px;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`
