import { useMutation } from '@apollo/client'

import createAgentGql from '../../gql/agent/createAgent.gql'

type CreateAgentInput = {
  name: string
  role: string
  description: string
  temperature: number
}

export const useCreateAgentService = () => {
  const [mutation] = useMutation(createAgentGql)

  const createAgentService = async (input: CreateAgentInput) => {
    const { name, role, description, temperature } = input

    const {
      data: { createAgent },
    } = await mutation({
      variables: {
        input: {
          agent: {
            name: name,
            description: description,
            role: role,
            is_template: false,
          },
          configs: {
            goals: ['string', 'string 2', 'string 3'],
            constraints: ['constraints 2', 'constraints 1'],
            tools: ['tool 1', 'tools 2'],
            datasources: ['datasources 1', 'datasources 2'],
            mode_provider: 'OpenAI',
            model_version: 'GPT-4',
            temperature: temperature,
            instructions: ['instructions 1', 'instructions 2'],
          },
        },
      },
    })

    return createAgent
  }

  return [createAgentService]
}
