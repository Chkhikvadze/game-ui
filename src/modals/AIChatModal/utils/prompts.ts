export const gameIdeaPrompt = (
  userInput: string,
  category: string,
  amount: number,
  format = 'JSON',
  chars: number,
) => {
  return `Generate ${amount} "ideas" for a <tag>${userInput}</tag> game; the game category is ${category}.
  Output as ${format}:
  {ideas: [
      {
          id: 1,
          title: 'game name',
          description: 'game description', // (Rules: Use at most ${chars} characters)
      }
  ]}
  
  General rules:
  1. Output should be in ${format} format.
  2. That is keywords for my game: "${userInput}" and category: "${category}".
  `
}

// export const gameIdeaParse = (content: string) => {}

export const gameplayPrompt = (
  gameName: string,
  gameIdea: string,
  amount: 5,
  format = 'JSON',
  chars: 200,
) => {
  return `Generate ${amount} "Gameplay" for that game.
  Output as ${format}:
  {gameplays: [
      {
          id: 1,
          game: 'game description', // (Rules: Use at most ${chars} characters)
      }
  ]}
  
  General rules:
  1. Output should be in ${format} format
  2. All this should be based on this game name: "${gameName}" and ida: "${gameIdea}"
  `
}

export const collectionPrompt = (
  gameName: string,
  gameIdea: string,
  gameplay: string,
  amount: 5,
  format = 'JSON',
  attributesChars: 80,
  propertiesChars: 80,
  collectionChars: 400,
  assetChars: 300,
  amountAssets: 5,
  amountAttributes: 5,
  amountProperties: 5,
) => {
  return `Generate ${amount} collections of assets, or collectibles that game "${gameName}" should have.
    we have four objects: 
    - collections: "Those are the collections of assets, or collectibles that this game should have"
    - attributes: "Those are the variables that define the characteristics of an asset"
    - properties: "Those are variables that define the appearance of an asset"
    - assets: "Those are the assets, or collectibles that this game should have"
    Output as ${format}:
    {
        collections: [{
            id: 1,
            name: 'collection name',
            description: 'collection description', // (Rules: Use at most ${collectionChars} characters)
            attributes: // (Rules: Build specific collection "attributes", which are variables that define asset characteristics)
            [{
                id: 1,
                title: 'attribute title',
                min_value: 'min vale of range',
                max_value: 'max value of range',
                value: 'actual value between min and max value', // (Rules: Should be balanced between the assets to have a better gameplay experience)
                description: 'attribute description', // (Rules: Use at most ${attributesChars} characters)
            }],
            properties: (Rules: Build specific collection "properties" that define the appearance of an asset)
            [{
                id: 1,
                title: 'property title',
                description: 'property description', // (Rules: Use at most ${propertiesChars} characters)
            }],
            assets: [{
                id: 1,
                title: 'asset title',
                story: 'asset story', // (Rules: Use at most ${assetChars} characters),
                attributes: [{
                    id: 1,
                    title: 'attribute title',
                    value: '30', // (Rules: Should be balanced between the assets to have a better gameplay experience)
                }],
                properties: [{
                    id: 1,
                    title: 'property title',
                    value: 'Text', // (Rules: Should be balanced between the assets to have a better gameplay experience),
                }],
            }]
        }],    
    }

    General rules:
    1. Output should be in ${format} format
    2. The "attributes" should be balanced between the "assets" to have a better gameplay experience
    3. The "properties" should be balanced between the "assets" to have a better gameplay experience
    4. Generate ${amountAssets} "assets",  ${amountAttributes} attributes and ${amountProperties} "properties" in each collection.
    5. All this should be based on this game idea: "${gameIdea}" and gameplay: "${gameplay}"
    `
}

export const assetRewardAchievement = (
  gameName: string,
  gameIdea: string,
  gameplay: string,
  amountReward: 5,
  amountAchievement: 5,
  format = 'JSON',
  achievementChars: 80,
  rewardChars: 80,
) => {
  return `Generate ${amountReward} amount Reward and  ${amountAchievement} amount Achievement should that game "${gameName}" should have:
  {
    rewards: [{
        id: 1,
        title: 'reward title',
        description: 'reward description', // (Rules: Use at most ${rewardChars} characters),
        type: 'attributes changed', // (Rules: which can be “attributes changed”, “new assets”, or “new currencies”. Use the Attributes and “Assets tables” defined previously to define the types of attributes changed or new assets that can be awarded.)
    }],
    achievements: [{
        id: 1,
        title: 'achievement title',
        description: 'achievement description', // (Rules: Use at most ${achievementChars} characters),
        trigger: 'achievement trigger', // (Rules: please explain the logic required to unlock this achievement, max 100 characters)
        rewards: //(Rule: for completing the achievement, the player can get 2-3 rewards per achievement,  using the “rewards” table,  the achievement can also be awarded by reaching new levels or XP)
        [{
            id: 1,
            title: 'reward title',
            description: 'reward description', // (Rules: Use at most ${rewardChars} characters),
            type: 'attributes changed', // (Rules: which can be “attributes changed”, “new assets”, or “new currencies”. Use the Attributes and “Assets tables” defined previously to define the types of attributes changed or new assets that can be awarded.)
        }],
    }],

  }
  _____
  General rules:
  1. Output should be in ${format} format
  2. We can draw inspiration from achievements and rewards in web3 games.
  3. Generate 5 records for each table
  4. You can use “Asset Table” from here: “**Collection 1: Spaceship Modules**
  5. All this should be based on this game idea: "${gameIdea}" and gameplay: "${gameplay}"`
}

export const parseGPTContent = (content: string) => {
  const start = content.indexOf('```json') + '```json'.length
  const end = content.lastIndexOf('```')
  const jsonString = content.substring(start, end).trim()

  try {
    const data = JSON.parse(jsonString)
    return data
  } catch (e) {
    return null
  }
}
