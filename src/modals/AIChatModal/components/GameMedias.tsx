import styled from 'styled-components'
import ImageCard from './ImageCard'
import { WrapperSecondary } from './WrapperSecondary'
import { useState } from 'react'

const GameMedias = ({ message }: any) => {
  const [items, setItems] = useState<any>([])

  const handleClick = (item: any) => {
    if (items.includes(item)) {
      // Remove the item from the array
      const updatedItems = items.filter((i: any) => i !== item)
      setItems(updatedItems)
    } else {
      // Push the item into the array
      const updatedItems = items.concat(item)
      setItems(updatedItems)
    }
  }
  return (
    <WrapperSecondary>
      <StyledImageWrapper>
        {message?.medias?.map((item: any) => (
          <ImageCard
            key={item}
            src={item}
            isSelected={items.includes(item)}
            onClick={() => handleClick(item)}
          />
        ))}
      </StyledImageWrapper>
    </WrapperSecondary>
  )
}

export default GameMedias

const StyledImageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  grid-auto-rows: 228px;
`
