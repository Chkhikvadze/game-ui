import React from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { IChatMessage } from 'modals/AIChatModal/types'

type CollectionProps = {
  message: IChatMessage
}

const renderFields = (fields: any[]) => {
  return fields.map(field => (
    <div key={field.name}>
      <div>--------{field.name} Start----------</div>
      {field.items.map((item: any) => (
        <div key={item.id}>
          <div>ID: {item.id}</div>
          <div>Name: {item.name}</div>
          <div>Description: {item.description}</div>
          <div>Value: {item.value}</div>
          <br />
        </div>
      ))}
      <div>--------{field.name} End----------</div>
      <br />
    </div>
  ))
}

const Collections: React.FC<CollectionProps> = ({ message }) => {
  const { collections } = message
  const { setCollections, currentChat } = useChatState()

  return (
    <div style={{ color: 'white' }}>
      <div>
        {collections?.map((collection: any) => (
          <div
            key={collection.id}
            onClick={() => {
              setCollections([...collections, collection])
            }}
          >
            <img src={collection.image} alt={collection.title} />
            <div>ID: {collection.id}</div>
            <div>Title: {collection.title}</div>
            <div>Description: {collection.description}</div>
            <br />
            <div>--------Assets Start----------</div>
            {renderFields(collection.assets)}
            <div>--------Assets end----------</div>
            <br />
            <div>--------Property Start----------</div>
            {renderFields(collection.properties)}
            <div>--------Property end----------</div>
            <br />
            <div>--------Attribute Start----------</div>
            {renderFields(collection.attributes)}
            <div>--------Attribute end----------</div>
          </div>
        ))}
      </div>
      <br />
      <h3>Chosen Game Idea:</h3>
      {currentChat?.gameplay && <h3> {currentChat?.gameplay?.name}</h3>}
      <h3
        onClick={() => {
          setCollections(null)
        }}
      >
        Remove Selected
      </h3>
    </div>
  )
}

export default Collections
