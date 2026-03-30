import type { ModelsResponse } from "~/services/copilot/get-models"

export interface State {
  githubToken?: string
  copilotToken?: string

  accountType: string
  models?: ModelsResponse
  vsCodeVersion?: string

  forceAgentInitiator: boolean
  manualApprove: boolean
  rateLimitWait: boolean
  showToken: boolean

  // Rate limiting configuration
  rateLimitSeconds?: number
  lastRequestTimestamp?: number
}

export const state: State = {
  accountType: "individual",
  forceAgentInitiator: false,
  manualApprove: false,
  rateLimitWait: false,
  showToken: false,
}
