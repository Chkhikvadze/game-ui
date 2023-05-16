import { IAsset, IAssetMedia } from '../types'
import { callChatGPT, davinci } from '../utils/davinci'
import { parseGPTContent } from '../utils/prompts'
import { testJSON, testRewardsAchievementsJSON } from '../utils/test'
import { dalle } from 'modals/AIChatModal/utils/dalle'
import { v4 as uuidv4 } from 'uuid'

const useMediaAI = () => {
  const generateCollectionMediasAI = async (): Promise<any> => {}

  const generateGameMediasAI = async (
    name: string,
    description: string,
    amount: number,
  ): Promise<string[]> => {
    const prompt = `Generate Prompt for Dalle AI, I want to use it for the game:
    Game title: "${name}",
    Game description: "${description}",

    General rules:
    1. character amount must be less than 400. 
    2. Give me output only prompt text`
    const dallePrompt = await callChatGPT(prompt)

    if (!dallePrompt) return []
    const response = await dalle(dallePrompt, amount)
    const result = response?.data?.data?.map((item: any) => {
      return item?.url
    })
    return result
  }

  const generateAssetsMediasAI = async (
    assets: IAsset[],
    name: string,
    description: string,
    amount: number,
  ): Promise<any> => {
    const assetJson = assets.map(asset => {
      return {
        id: asset.id,
        name: asset.name,
        description: asset.description,
      }
    })

    const prompt = `Generate Prompts for Dalle AI, I want to use it for the game's assets:
    Game title: "${name}",
    Game description: "${description}",
    Game assets json file: "${JSON.stringify(assetJson)}"

    General rules:
    1. character amount must be less than 400. 
    2. Give me output only prompt text
    3. Output should be in JSON format.
    4. Please return only json with any other text
    5. Example of output: 
    "{prompts:[{
        "id": "1",
        "asset_id":  "1", // asset id, must be the same as in the json file
        "prompt": "Generate Prompt for Dalle AI, I want to use it for the game's assets"
      }]
    }"`

    const content = await callChatGPT(prompt)
    if (!content) {
      console.log('Something wrong to generate asset medias')
      return
    }
    const json = parseGPTContent(content)
    const dallePrompts = json?.prompts
    if (!dallePrompts) return []

    const assetUrls: {
      [key: string]: IAssetMedia[]
    } = {}
    const prs = dallePrompts.map(async (prompt: any) => {
      const response = await dalle(prompt.prompt, amount)
      const url = response?.data?.data?.map((item: any) => {
        return item?.url
      })
      assetUrls[prompt.asset_id] = [
        {
          id: uuidv4(),
          url: url[0],
          is_main: true,
          format: 'jpg',
        },
      ]
    })
    await Promise.all(prs)

    return assetUrls
  }

  return {
    generateCollectionMediasAI,
    generateGameMediasAI,
    generateAssetsMediasAI,
  }
}

export { useMediaAI }
