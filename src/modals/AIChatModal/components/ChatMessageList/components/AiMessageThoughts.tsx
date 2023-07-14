import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { StyledTable, StyledReactMarkdown } from './AiMessage'
import remarkGfm from 'remark-gfm'

type AiMessageThoughtsProps = {
  thoughts: any[]
}

const AiMessageThoughts = ({ thoughts }: AiMessageThoughtsProps) => {
  return (
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
  )
}

export default AiMessageThoughts

const StyledThought = styled.li`
  color: #fff;
  line-height: 1.6;
  margin: 24px 0;
`

const StyledThoughtResult = styled.div`
  margin-left: 24px;
`
