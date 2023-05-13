import { Configuration, OpenAIApi } from 'openai'

export const davinci = async (prompt: string, key: string) => {
  const configuration = new Configuration({
    apiKey: key,
  })

  const openai = new OpenAIApi(configuration)

  //todo need make test gpt 4
  const response = await openai.createChatCompletion({
    // model: 'gpt-3.5-turbo',
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: "you're an a AI assistant that replies to all my questions in markdown format.",
      },
      { role: 'user', content: 'hi' },
      { role: 'assistant', content: 'Hi! How can I help you?' },
      { role: 'user', content: `${prompt}?` },
    ],
    temperature: 0.3,
    max_tokens: 7000,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0.2,
  })

  //eslint-disable-next-line

  // const content = response?.data?.choices[0]?.message?.content
  // console.log(content, 'content')
  // const jsonRegex = /```json([\s\S]*?)```/
  // const jsonMatch = content?.match(jsonRegex)
  // console.log(jsonMatch, 'jsonMatch')
  // const citiesJson = JSON.parse(jsonMatch ? jsonMatch[1] : '')
  // console.log(citiesJson, 'citiesJson')

  // if (content) {
  //   const jsonResponse = JSON.parse(content)
  //   console.log(jsonResponse, 'jsonResponse')
  // }

  return response
}
