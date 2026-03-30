import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"

import { APP_NAME, LEGACY_PACKAGE_NAME } from "./app-info"

const APP_DIR = path.join(os.homedir(), ".local", "share", APP_NAME)
const LEGACY_APP_DIR = path.join(
  os.homedir(),
  ".local",
  "share",
  LEGACY_PACKAGE_NAME,
)
const GITHUB_TOKEN_PATH = path.join(APP_DIR, "github_token")
const LEGACY_GITHUB_TOKEN_PATH = path.join(LEGACY_APP_DIR, "github_token")

export const PATHS = {
  APP_DIR,
  GITHUB_TOKEN_PATH,
}

export async function ensurePaths(): Promise<void> {
  await fs.mkdir(PATHS.APP_DIR, { recursive: true })
  await migrateLegacyGithubToken()
  await ensureFile(PATHS.GITHUB_TOKEN_PATH)
}

async function ensureFile(filePath: string): Promise<void> {
  try {
    await fs.access(filePath, fs.constants.W_OK)
  } catch {
    await fs.writeFile(filePath, "")
    await fs.chmod(filePath, 0o600)
  }
}

async function migrateLegacyGithubToken(): Promise<void> {
  if (await pathExists(PATHS.GITHUB_TOKEN_PATH)) {
    return
  }

  if (!(await pathExists(LEGACY_GITHUB_TOKEN_PATH))) {
    return
  }

  await fs.copyFile(LEGACY_GITHUB_TOKEN_PATH, PATHS.GITHUB_TOKEN_PATH)
  await fs.chmod(PATHS.GITHUB_TOKEN_PATH, 0o600)
}

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}
