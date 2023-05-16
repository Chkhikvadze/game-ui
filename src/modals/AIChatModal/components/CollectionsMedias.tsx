import styled from 'styled-components'
import ImageCard from './ImageCard'
import { WrapperSecondary } from './WrapperSecondary'
import { useState } from 'react'

const CollectionMedias = ({ message }: any) => {
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
        {message?.collections?.map((collection: any) => {
          return collection.assets?.map((asset: any, index: any) => {
            return (
              <ImageCard
                key={index}
                src={asset?.medias?.length > 0 ? asset?.medias[0]?.url : undefined}
                isSelected={items.includes(index)}
                onClick={() => handleClick(index)}
              />
            )
          })
        })}

        {/* {message?.medias?.map((item: any) => (
          <ImageCard
            key={item}
            src={item}
            isSelected={items.includes(item)}
            onClick={() => handleClick(item)}
          />
        ))} */}
      </StyledImageWrapper>
    </WrapperSecondary>
  )
}

export default CollectionMedias

const StyledImageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  grid-auto-rows: 228px;
`
