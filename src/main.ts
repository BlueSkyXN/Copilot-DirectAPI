#!/usr/bin/env node

import { defineCommand, runMain } from "citty"

import { auth } from "./auth"
import { checkUsage } from "./check-usage"
import { debug } from "./debug"
import { APP_NAME } from "./lib/app-info"
import { start } from "./start"

const main = defineCommand({
  meta: {
    name: APP_NAME,
    description: `${APP_NAME} wraps GitHub Copilot API and exposes an OpenAI/Anthropic-compatible interface.`,
  },
  subCommands: { auth, start, "check-usage": checkUsage, debug },
})

await runMain(main)
