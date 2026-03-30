@echo off
echo ================================================
echo Copilot-DirectAPI Server with Usage Viewer
echo ================================================
echo.

if not exist node_modules (
    echo Installing dependencies...
    bun install
    echo.
)

echo Starting server...
echo The usage viewer page will open automatically after the server starts
echo.

start "" "https://blueskyxn.github.io/Copilot-DirectAPI/?endpoint=http://localhost:4141/usage"
bun run dev

pause
