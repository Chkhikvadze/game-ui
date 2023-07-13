import { StyledMessageInfo, StyledMessageText, StyledMessageWrapper } from './HumanMessage'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

type AiMessageProps = {
  avatarImg: string
  messageDate: string
  messageText: string
  thoughts: any[]
}

const AiMessage = ({ avatarImg, messageDate, messageText, thoughts }: AiMessageProps) => {
  return (
    <StyledMessageWrapper secondary>
      <StyledMessageInfo>
        <Typography
          value={messageDate}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
          customColor={'rgba(255, 255, 255, 0.60)'}
        />
        <Typography
          value='L3'
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor={'#FFF'}
        />
        <Avatar size={Avatar.sizes.SMALL} src={avatarImg} type={Avatar.types.IMG} rectangle />
      </StyledMessageInfo>
      <StyledMessageText secondary>
        {thoughts && (
          <ol>
            {thoughts?.map(({ id, title, result, loading }: any) => (
              <StyledThought key={id}>
                <Typography
                  value={title}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={loading ? '#fff' : '#78db36'}
                />

                <br />

                {result && !result.includes('action_input') && (
                  <StyledThoughtResult>
                    <StyledReactMarkdown
                      children={result}
                      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                      components={{
                        table: ({ node, ...props }) => <StyledTable {...props} />,

                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || 'language-js')

                          return !inline && match ? (
                            <SyntaxHighlighter
                              children={String(children).replace(/\n$/, '')}
                              style={atomDark as any}
                              language={match[1]}
                              PreTag='div'
                              {...props}
                            />
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          )
                        },
                      }}
                    />
                  </StyledThoughtResult>
                )}
              </StyledThought>
            ))}
          </ol>
        )}

        <StyledReactMarkdown
          children={thoughts?.length ? thoughts[thoughts.length - 1].result : messageText}
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          components={{
            table: ({ node, ...props }) => <StyledTable {...props} />,

            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || 'language-js')

              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={atomDark as any}
                  language={match[1]}
                  PreTag='div'
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        />
      </StyledMessageText>
    </StyledMessageWrapper>
  )
}

export default AiMessage

const StyledReactMarkdown = styled(ReactMarkdown)`
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledTable = styled.table`
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #fff;
    padding: 5px 30px;
    text-align: center;
  }
`

const StyledThought = styled.li`
  color: #fff;
  line-height: 1.6;
  margin: 24px 0;
`

const StyledThoughtResult = styled.div`
  margin-left: 24px;
`
