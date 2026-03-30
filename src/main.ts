#!/usr/bin/env node

import { defineCommand, runMain, parseArgs } from "citty"

import { APP_NAME } from "./lib/app-info"

const cliArgs = {
  "api-home": {
    type: "string",
    description: "Path to the API home directory.",
  },
  "oauth-app": {
    type: "string",
    description: "OAuth app identifier.",
  },
  "enterprise-url": {
    type: "string",
    description: "Enterprise URL for GitHub.",
  },
} as const

const args = parseArgs(process.argv, cliArgs)

// Set environment variables before loading other modules
if (typeof args["api-home"] === "string") {
  process.env.COPILOT_API_HOME = args["api-home"]
}
if (typeof args["oauth-app"] === "string") {
  process.env.COPILOT_API_OAUTH_APP = args["oauth-app"]
}
if (typeof args["enterprise-url"] === "string") {
  process.env.COPILOT_API_ENTERPRISE_URL = args["enterprise-url"]
}

// Dynamically import other modules to ensure environment variables are set
const { auth } = await import("./auth")
const { checkUsage } = await import("./check-usage")
const { debug } = await import("./debug")
const { start } = await import("./start")

const main = defineCommand({
  meta: {
    name: APP_NAME,
    description: `${APP_NAME} wraps GitHub Copilot API and exposes an OpenAI/Anthropic-compatible interface.`,
  },
  subCommands: { auth, start, "check-usage": checkUsage, debug },
  args: cliArgs,
})

await runMain(main)
