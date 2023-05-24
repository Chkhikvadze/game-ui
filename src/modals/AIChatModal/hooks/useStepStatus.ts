import { CHAT_STEP_ENUM, IChat, INITIAL_STEPS, STEP_STATUS_ENUM } from '../types'

const useStepStatus = () => {
  const updateStepStatus = (chat: IChat) => {
    const steps = INITIAL_STEPS
    if (!chat.gameCategory || !chat.gameIdea) {
      steps[CHAT_STEP_ENUM.CreateGameConcept] = STEP_STATUS_ENUM.InProgress
    } else {
      steps[CHAT_STEP_ENUM.CreateGameConcept] = STEP_STATUS_ENUM.Completed
    }

    if (!chat.gameplay) {
      steps[CHAT_STEP_ENUM.GenerateGameplay] = STEP_STATUS_ENUM.Pending

      if (steps[CHAT_STEP_ENUM.CreateGameConcept] === STEP_STATUS_ENUM.Completed) {
        steps[CHAT_STEP_ENUM.GenerateGameplay] = STEP_STATUS_ENUM.InProgress
      }
    } else {
      steps[CHAT_STEP_ENUM.GenerateGameplay] = STEP_STATUS_ENUM.Completed
    }

    if (!chat.collections?.length) {
      steps[CHAT_STEP_ENUM.GenerateCollections] = STEP_STATUS_ENUM.Pending
      steps[CHAT_STEP_ENUM.GenerateAssets] = STEP_STATUS_ENUM.Pending

      if (steps[CHAT_STEP_ENUM.GenerateGameplay] === STEP_STATUS_ENUM.Completed) {
        steps[CHAT_STEP_ENUM.GenerateCollections] = STEP_STATUS_ENUM.InProgress
        steps[CHAT_STEP_ENUM.GenerateAssets] = STEP_STATUS_ENUM.InProgress
      }
    } else {
      steps[CHAT_STEP_ENUM.GenerateCollections] = STEP_STATUS_ENUM.Completed

      if (!chat.collections[0].assets?.length) {
        steps[CHAT_STEP_ENUM.GenerateAssets] = STEP_STATUS_ENUM.Pending
      } else {
        steps[CHAT_STEP_ENUM.GenerateAssets] = STEP_STATUS_ENUM.Completed
      }
    }

    if (!chat.rewards?.length) {
      steps[CHAT_STEP_ENUM.GenerateAchievementsAndRewards] = STEP_STATUS_ENUM.Pending

      if (steps[CHAT_STEP_ENUM.GenerateCollections] === STEP_STATUS_ENUM.Completed) {
        steps[CHAT_STEP_ENUM.GenerateAchievementsAndRewards] = STEP_STATUS_ENUM.InProgress
      }
    } else {
      steps[CHAT_STEP_ENUM.GenerateAchievementsAndRewards] = STEP_STATUS_ENUM.Completed
    }

    if (steps[CHAT_STEP_ENUM.GenerateAchievementsAndRewards] === STEP_STATUS_ENUM.Completed) {
      steps[CHAT_STEP_ENUM.FinishAndCreate] = STEP_STATUS_ENUM.InProgress
    }

    if (chat.isCreateFinished) {
      steps[CHAT_STEP_ENUM.FinishAndCreate] = STEP_STATUS_ENUM.Completed
    }

    if (chat.isAssetMediasGenerated) {
      steps[CHAT_STEP_ENUM.AssetsMedias] = STEP_STATUS_ENUM.Completed
    }

    // if (steps[CHAT_STEP_ENUM.FinishAndCreate] === STEP_STATUS_ENUM.Completed) {
    //   steps[CHAT_STEP_ENUM.FinishAndCreate] = STEP_STATUS_ENUM.InProgress
    // }

    return {
      steps: steps,
    }
  }
  return {
    updateStepStatus,
  }
}

export { useStepStatus }
