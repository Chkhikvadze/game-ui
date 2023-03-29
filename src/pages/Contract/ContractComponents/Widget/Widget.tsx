import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'

import { ReactNode } from 'react'

type WidgetProps = {
  title: string
  titleValue?: string
  items: ReactNode
}

const Widget = ({ title, items, titleValue }: WidgetProps) => {
  return (
    <StyledWidget>
      <StyledWidgetHeader>
        <Typography
          value={title}
          type={Typography.types.LABEL}
          size={Typography.sizes.md}
          customColor={'#FFF'}
        />
        {titleValue && (
          <StyledTitleValue>
            <Typography
              value={titleValue}
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor={'#FFF'}
            />
          </StyledTitleValue>
        )}
      </StyledWidgetHeader>
      <StyledWidgetContent>{items}</StyledWidgetContent>
    </StyledWidget>
  )
}

export default Widget

const StyledWidget = styled.div`
  width: 310px;
  height: 200px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;

  background: rgba(0, 0, 0, 0.2);
  box-shadow: inset 0px 1px 20px rgba(8, 8, 16, 0.1);
  border-radius: 16px;
`
const StyledWidgetHeader = styled.div`
  width: 100%;

  padding: 0px 16px 10px 0px;
  gap: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledWidgetContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`

const StyledTitleValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;

  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`
