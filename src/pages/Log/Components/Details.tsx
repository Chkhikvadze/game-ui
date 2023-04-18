import styled from 'styled-components'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark, docco, xcode, vs } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'contexts'

import { CODE_HIGHLIGHTER_STYLE } from 'pages/Contract/ContractForm/components/StepDetails'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'

const Details = ({ log }: any) => {
  const [currentLogId, setCurrentLogId] = useState<any>()
  const { user } = useContext(AuthContext)

  const params = useParams()

  const data = log

  // const param = data.gql_variables

  useEffect(() => {
    return setCurrentLogId(params)
  }, [params])

  const filteredLogId = data.filter((d: { id: string | undefined }) => d.id === params.id)

  console.log('details', filteredLogId)

  const code = `
  // Imports
import mongoose, { Schema } from 'mongoose'

// Collection name
export const collection = 'Product'|

// Schema
const schema = new Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  }
}, {timestamps: true})

// Model
export default mongoose.model(collection, schema, collection)

  `
  return (
    <StyledContainer>
      <StyledTitle>
        <Heading
          type={Heading.types.h1}
          value={filteredLogId[0]?.method}
          size='small'
          customColor={'#FFFFFF'}
        />
        <Heading
          type={Heading.types.h1}
          value='&ensp; &ensp;'
          size='small'
          customColor={'#FFFFFF'}
        />
        <Heading
          type={Heading.types.h1}
          value={filteredLogId[0]?.endpoint}
          size='small'
          customColor={'#FFFFFF'}
        />
      </StyledTitle>

      <StyledDetails>
        <StyledDetailsItem>
          <StyledLabel>
            <Typography
              value='Status'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor='rgba(255, 255, 255, 0.8)'
            />
          </StyledLabel>
          <StyledStatusContainer is_error={parseInt(filteredLogId[0]?.status) !== 200}>
            {filteredLogId[0]?.status} {parseInt(filteredLogId[0]?.status) !== 200 ? 'ERR' : 'OK'}
          </StyledStatusContainer>
        </StyledDetailsItem>
        <StyledDetailsItem>
          <StyledLabel>
            <Typography
              value='ID'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor='rgba(255, 255, 255, 0.8)'
            />
          </StyledLabel>
          <StyledLabel>{filteredLogId[0]?.id}</StyledLabel>
        </StyledDetailsItem>
        <StyledDetailsItem>
          <StyledLabel>
            <Typography
              value='Time'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor='rgba(255, 255, 255, 0.8)'
            />
          </StyledLabel>
          <StyledLabel>{moment(filteredLogId[0]?.request_date).format('h:mm:ss A')}</StyledLabel>
        </StyledDetailsItem>
        <StyledDetailsItem>
          <StyledLabel>
            <Typography
              value='IP address'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor='rgba(255, 255, 255, 0.8)'
            />
          </StyledLabel>
          <StyledLabel>{filteredLogId[0]?.ip}</StyledLabel>
        </StyledDetailsItem>
        <StyledDetailsItem>
          <StyledLabel>
            <Typography
              value='API Version'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor='rgba(255, 255, 255, 0.8)'
            />
          </StyledLabel>
          <StyledLabel>2022-08-01</StyledLabel>
        </StyledDetailsItem>
        <StyledDetailsItem>
          <StyledLabel>
            <Typography
              value='Source'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor='rgba(255, 255, 255, 0.8)'
            />
          </StyledLabel>
          <StyledLabel>
            {filteredLogId[0]?.source_type} – {user.email}
          </StyledLabel>
        </StyledDetailsItem>
        <StyledDetailsItem>
          <StyledLabel>
            <Typography
              value='Idempotency'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor='rgba(255, 255, 255, 0.8)'
            />
          </StyledLabel>
          <StyledLabel>Key – {filteredLogId[0]?.id}</StyledLabel>
        </StyledDetailsItem>
      </StyledDetails>

      <StyledLine />

      <StyledSubTitle>
        <Typography
          value='Request query parametrs'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='#FFFFFF'
        />
      </StyledSubTitle>

      {/* <StyledCodeContainer>
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
          {JSON.stringify(filteredLogId[0]?.gql_variables, null, 4)}
        </SyntaxHighlighter>
      </StyledCodeContainer> */}

      {/* <StyledSubTitle>Response body</StyledSubTitle> */}

      <StyledCodeContainer>
        {/* <SyntaxHighlighter
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
          {JSON.stringify(data.response, null, 4)}
        </SyntaxHighlighter> */}
        <SyntaxHighlighter
          id='code'
          language='solidity'
          style={CODE_HIGHLIGHTER_STYLE}
          showLineNumbers
        >
          {code}
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
  display: flex;
  width: 100%;
  height: 32px;
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
  // border-top-left-radius: 20px;
  // border-top-right-radius: 20px;
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
