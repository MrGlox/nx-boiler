#!/bin/bash

# This script wraps the shadcn add command and updates the index.gen.ts file

# Check if component name is provided
if [ -z "$1" ]; then
  echo "Error: Component name is required"
  echo "Usage: ./shadcn-add.sh <component-name> [additional-shadcn-options]"
  exit 1
fi

COMPONENT_NAME=$1
INDEX_FILE="libs/ui/src/components/index.gen.ts"

# Make sure the index file directory exists
mkdir -p "$(dirname "$INDEX_FILE")"
touch "$INDEX_FILE"

# Convert component name to kebab case if it's in camel case
KEBAB_CASE=$(echo "$COMPONENT_NAME" | sed -r 's/([a-z0-9])([A-Z])/\1-\2/g' | tr '[:upper:]' '[:lower:]')

# Check if the export already exists before running shadcn
if grep -q "export \* from './ui/$KEBAB_CASE';" "$INDEX_FILE"; then
  echo "Export for $KEBAB_CASE already exists in $INDEX_FILE"
  # Still run shadcn command to ensure component exists
  TS_NODE_PROJECT=tsconfig.base.json pnpm dlx shadcn@latest add "$@"
  exit 0
fi

# Run the shadcn add command with the correct output path
# We need to run this command first before updating the index file
TS_NODE_PROJECT=tsconfig.base.json pnpm dlx shadcn@latest add "$@"

# Check if the component was successfully added
if [ ! -f "libs/ui/src/components/ui/$KEBAB_CASE.tsx" ]; then
  echo "Warning: Component file not found at libs/ui/src/components/ui/$KEBAB_CASE.tsx"
  echo "The shadcn command may have failed or used a different path."
fi

# Cross-platform compatible sed command
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS (BSD) sed
  sed -i '' -e "$ i\\
export * from './ui/$KEBAB_CASE';" "$INDEX_FILE"
else
  # GNU sed (Linux)
  sed -i -e "$ i\\export * from './ui/$KEBAB_CASE';" "$INDEX_FILE"
fi

echo "Added export for $KEBAB_CASE to $INDEX_FILE"