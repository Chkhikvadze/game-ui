import { random } from 'lodash'

export const collection1 = {
  id: 1,
  name: "Empire's Arsenal",
  description:
    'A stunning assembly of tools, trinkets, and artifacts wielded by emperors past, each embodying a unique aspect of territorial strategy and conquest.',
  categories: ['Strategy', 'Conquest'],
  attributes: [
    { id: 1, name: 'Power', min: '1', max: '100', description: "Represents asset's potency" },
    { id: 2, name: 'Rarity', min: '1', max: '5', description: "Indicates asset's scarcity" },
    { id: 3, name: 'Durability', min: '1', max: '100', description: "Shows asset's resilience" },
    {
      id: 4,
      name: 'Versatility',
      min: '1',
      max: '100',
      description: "Indicates asset's adaptability",
    },
    { id: 5, name: 'Charm', min: '1', max: '100', description: "Shows asset's allure" },
  ],
  properties: [
    { id: 1, name: 'Color', description: 'Visual hue of the asset' },
    { id: 2, name: 'Size', description: 'Physical proportions of the asset' },
    { id: 3, name: 'Shape', description: 'Form or contour of the asset' },
    { id: 4, name: 'Material', description: 'Substance the asset is made of' },
    { id: 5, name: 'Texture', description: 'Surface feel of the asset' },
  ],
  assets: [
    {
      id: 1,
      name: "Conqueror's Banner",
      description: 'A majestic flag that once rallied armies to victory',
      attributes: [
        { id: 1, name: 'Power', value: '70' },
        { id: 2, name: 'Rarity', value: '4' },
        { id: 3, name: 'Durability', value: '50' },
        { id: 4, name: 'Versatility', value: '30' },
        { id: 5, name: 'Charm', value: '90' },
      ],
      properties: [
        { id: 1, name: 'Color', value: 'Gold' },
        { id: 2, name: 'Size', value: 'Large' },
        { id: 3, name: 'Shape', value: 'Rectangular' },
        { id: 4, name: 'Material', value: 'Silk' },
        { id: 5, name: 'Texture', value: 'Smooth' },
      ],
    },
    {
      id: 2,
      name: "Sovereign's Scepter",
      description: 'A royal staff symbolizing authority and power',
      attributes: [
        { id: 1, name: 'Power', value: '90' },
        { id: 2, name: 'Rarity', value: '5' },
        { id: 3, name: 'Durability', value: '80' },
        { id: 4, name: 'Versatility', value: '60' },
        { id: 5, name: 'Charm', value: '70' },
      ],
      properties: [
        { id: 1, name: 'Color', value: 'Silver' },
        { id: 2, name: 'Size', value: 'Medium' },
        { id: 3, name: 'Shape', value: 'Cylindrical' },
        { id: 4, name: 'Material', value: 'Metal' },
        { id: 5, name: 'Texture', value: 'Smooth' },
      ],
    },
    {
      id: 3,
      name: "Diplomat's Quill",
      description: 'A feathered pen that has signed countless treaties',
      attributes: [
        { id: 1, name: 'Power', value: '40' },
        { id: 2, name: 'Rarity', value: '3' },
        { id: 3, name: 'Durability', value: '20' },
        { id: 4, name: 'Versatility', value: '80' },
        { id: 5, name: 'Charm', value: '60' },
      ],
      properties: [
        { id: 1, name: 'Color', value: 'Black' },
        { id: 2, name: 'Size', value: 'Small' },
        { id: 3, name: 'Shape', value: 'Linear' },
        { id: 4, name: 'Material', value: 'Feather' },
        { id: 5, name: 'Texture', value: 'Soft' },
      ],
    },
    {
      id: 4,
      name: "General's Map",
      description: 'A tattered chart that guided legions through winding battles',
      attributes: [
        { id: 1, name: 'Power', value: '60' },
        { id: 2, name: 'Rarity', value: '2' },
        { id: 3, name: 'Durability', value: '30' },
        { id: 4, name: 'Versatility', value: '70' },
        { id: 5, name: 'Charm', value: '50' },
      ],
      properties: [
        { id: 1, name: 'Color', value: 'Multicolor' },
        { id: 2, name: 'Size', value: 'Large' },
        { id: 3, name: 'Shape', value: 'Rectangular' },
        { id: 4, name: 'Material', value: 'Parchment' },
        { id: 5, name: 'Texture', value: 'Rough' },
      ],
    },
    {
      id: 5,
      name: "Merchant's Coin",
      description: 'An ancient coin that bought kingdoms and sold wars',
      attributes: [
        { id: 1, name: 'Power', value: '50' },
        { id: 2, name: 'Rarity', value: '1' },
        { id: 3, name: 'Durability', value: '100' },
        { id: 4, name: 'Versatility', value: '40' },
        { id: 5, name: 'Charm', value: '80' },
      ],
      properties: [
        { id: 1, name: 'Color', value: 'Gold' },
        { id: 2, name: 'Size', value: 'Small' },
        { id: 3, name: 'Shape', value: 'Circular' },
        { id: 4, name: 'Material', value: 'Gold' },
        { id: 5, name: 'Texture', value: 'Smooth' },
      ],
    },
  ],
}

const collection2 = {
  id: 1,
  name: 'Territory Conquest Assets',
  description:
    'A unique collection of collectibles for Territory Conquest, bringing life to the game through unique assets that fuel the strategic and cooperative elements.',
  categories: [
    'Territory Cards',
    'Action Cards',
    'Resource Tokens',
    'Player Tokens',
    'Territory Tiles',
  ],
  attributes: [
    {
      id: 1,
      name: 'Territory Control Value',
      min: '1',
      max: '5',
      description: "Determines territory's strategic worth",
    },
    {
      id: 2,
      name: 'Action Power',
      min: '1',
      max: '10',
      description: 'Defines effectiveness of action cards',
    },
    {
      id: 3,
      name: 'Resource Quantity',
      min: '1',
      max: '20',
      description: 'Defines amount of resources in token',
    },
    {
      id: 4,
      name: 'Player Agility',
      min: '1',
      max: '5',
      description: "Defines player's movement ability",
    },
    {
      id: 5,
      name: 'Tile Defense',
      min: '1',
      max: '5',
      description: "Defines territory tile's defense strength",
    },
  ],
  properties: [
    {
      id: 1,
      name: 'Territory Card Art',
      description: 'Visual design of territory cards',
    },
    {
      id: 2,
      name: 'Action Card Design',
      description: 'Visual aesthetics of action cards',
    },
    {
      id: 3,
      name: 'Resource Token Material',
      description: 'Material of resource tokens',
    },
    {
      id: 4,
      name: 'Player Token Color',
      description: 'Color of player tokens',
    },
    {
      id: 5,
      name: 'Territory Tile Texture',
      description: 'Texture of territory tiles',
    },
  ],
  assets: [
    {
      id: 1,
      name: 'Fortress Card',
      description: 'An impregnable fortress granting high defense',
      attributes: [
        {
          id: 1,
          name: 'Territory Control Value',
          value: '5',
        },
      ],
      properties: [
        {
          id: 1,
          name: 'Territory Card Art',
          value: 'Detailed fortress sketch',
        },
      ],
    },
    {
      id: 2,
      name: 'Stealth Attack',
      description: 'Action card allowing for a surprise attack',
      attributes: [
        {
          id: 2,
          name: 'Action Power',
          value: '8',
        },
      ],
      properties: [
        {
          id: 2,
          name: 'Action Card Design',
          value: 'Shadowy figure illustration',
        },
      ],
    },
    {
      id: 3,
      name: 'Gold Resource',
      description: 'A token representing valuable gold resources',
      attributes: [
        {
          id: 3,
          name: 'Resource Quantity',
          value: '15',
        },
      ],
      properties: [
        {
          id: 3,
          name: 'Resource Token Material',
          value: 'Gleaming gold-toned metal',
        },
      ],
    },
    {
      id: 4,
      name: 'Scout Token',
      description: 'A player token embodying the agile scout role',
      attributes: [
        {
          id: 4,
          name: 'Player Agility',
          value: '5',
        },
      ],
      properties: [
        {
          id: 4,
          name: 'Player Token Color',
          value: 'Forest green',
        },
      ],
    },
    {
      id: 5,
      name: 'Mountain Tile',
      description: 'A territory tile representing a formidable mountain range',
      attributes: [
        {
          id: 5,
          name: 'Tile Defense',
          value: '5',
        },
      ],
      properties: [
        {
          id: 5,
          name: 'Territory Tile Texture',
          value: 'Rugged, rocky surface',
        },
      ],
    },
  ],
}

const collection3 = {
  id: 2,
  name: 'Gio Conquest Assets',
  description:
    'A unique collection of collectibles for Gio Conquest, bringing life to the game through unique assets that fuel the strategic and cooperative elements.',
  categories: ['Gio Cards', 'Action Cards', 'Resource Tokens', 'Player Tokens', 'Gio Tiles'],
  attributes: [
    {
      id: 1,
      name: 'Gio Control Value',
      min: '1',
      max: '5',
      description: "Determines Gio's strategic worth",
    },
    {
      id: 2,
      name: 'Action Power',
      min: '1',
      max: '10',
      description: 'Defines effectiveness of action cards',
    },
    {
      id: 3,
      name: 'Resource Quantity',
      min: '1',
      max: '20',
      description: 'Defines amount of resources in token',
    },
    {
      id: 4,
      name: 'Player Agility',
      min: '1',
      max: '5',
      description: "Defines player's movement ability",
    },
    {
      id: 5,
      name: 'Tile Defense',
      min: '1',
      max: '5',
      description: "Defines Gio tile's defense strength",
    },
  ],
  properties: [
    {
      id: 1,
      name: 'Gio Card Art',
      description: 'Visual design of Gio cards',
    },
    {
      id: 2,
      name: 'Action Card Design',
      description: 'Visual aesthetics of action cards',
    },
    {
      id: 3,
      name: 'Resource Token Material',
      description: 'Material of resource tokens',
    },
    {
      id: 4,
      name: 'Player Token Color',
      description: 'Color of player tokens',
    },
    {
      id: 5,
      name: 'Gio Tile Texture',
      description: 'Texture of Gio tiles',
    },
  ],
  assets: [
    {
      id: 1,
      name: 'Fortress Card',
      description: 'An impregnable fortress granting high defense',
      attributes: [
        {
          id: 1,
          name: 'Gio Control Value',
          value: '5',
        },
      ],
      properties: [
        {
          id: 1,
          name: 'Gio Card Art',
          value: 'Detailed fortress sketch',
        },
      ],
    },
    {
      id: 2,
      name: 'Stealth Defense',
      description: 'Action card allowing for a surprise Defense',
      attributes: [
        {
          id: 2,
          name: 'Action Power',
          value: '8',
        },
      ],
      properties: [
        {
          id: 2,
          name: 'Action Card Design',
          value: 'Shadowy figure illustration',
        },
      ],
    },
    {
      id: 3,
      name: 'Gold Resource',
      description: 'A token representing valuable gold resources',
      attributes: [
        {
          id: 3,
          name: 'Resource Quantity',
          value: '15',
        },
      ],
      properties: [
        {
          id: 3,
          name: 'Resource Token Material',
          value: 'Gleaming gold-toned metal',
        },
      ],
    },
    {
      id: 4,
      name: 'Scout Token',
      description: 'A player token embodying the agile scout role',
      attributes: [
        {
          id: 4,
          name: 'Player Agility',
          value: '5',
        },
      ],
      properties: [
        {
          id: 4,
          name: 'Player Token Color',
          value: 'Forest green',
        },
      ],
    },
    {
      id: 5,
      name: 'Hotel Tile',
      description: 'A Gio tile representing a formidable Hotel range',
      attributes: [
        {
          id: 5,
          name: 'Tile Defense',
          value: '5',
        },
      ],
      properties: [
        {
          id: 5,
          name: 'Gio Tile Texture',
          value: 'Rugged, rocky surface',
        },
      ],
    },
  ],
}

const testCollections = [collection1, collection2, collection3]

export const testJSON = async (): Promise<any> => {
  return {
    collection: testCollections[random(0, 2)],
  }
}
