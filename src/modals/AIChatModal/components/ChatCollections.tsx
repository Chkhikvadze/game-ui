import React, { useState } from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { IChatMessage } from 'modals/AIChatModal/types'

type CollectionProps = {
  message: IChatMessage
}

const renderFields = (fields?: any[], fieldType?: string) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {fields?.map(field => (
          <tr key={field.name}>
            <td>{field.name}</td>
            {field.items.map((item: any) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const ChatCollections: React.FC<CollectionProps> = ({ message }) => {
  const { collections } = message
  const { setCollections, currentChat } = useChatState()
  const [activeTab, setActiveTab] = useState('assets')

  return (
    <div>
      {collections?.map((collection: any) => (
        <div
          key={collection.id}
          onClick={() => {
            setCollections([...collections, collection])
          }}
        >
          <img src={collection.image} alt={collection.name} />
          <div>ID: {collection.id}</div>
          <div>Title: {collection.name}</div>
          <div>Description: {collection.description}</div>
          <div>
            <button onClick={() => setActiveTab('assets')}>Assets</button>
            <button onClick={() => setActiveTab('properties')}>Properties</button>
            <button onClick={() => setActiveTab('attributes')}>Attributes</button>
          </div>
          {activeTab === 'assets' && renderFields(collection?.assets, 'Assets')}
          {activeTab === 'properties' && renderFields(collection?.properties, 'Properties')}
          {activeTab === 'attributes' && renderFields(collection?.attributes, 'Attributes')}
        </div>
      ))}
      <h3>Chosen Game Idea:</h3>
      {currentChat?.gameplay && <h3> {currentChat?.gameplay?.description}</h3>}
      <button
        onClick={() => {
          setCollections(null)
        }}
      >
        Remove Selected
      </button>
    </div>
  )
}

export default ChatCollections
