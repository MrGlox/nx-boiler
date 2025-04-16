#!/bin/bash

# This script scans the components directory and updates the index.gen.ts file with exports for all components

INDEX_FILE="libs/ui/src/components/index.gen.ts"
COMPONENTS_DIR="libs/ui/src/components/ui"

# Check if the components directory exists
if [ ! -d "$COMPONENTS_DIR" ]; then
  echo "Error: Components directory not found at $COMPONENTS_DIR"
  exit 1
fi

# Create a temporary file for the new index content
TEMP_FILE=$(mktemp)

# Add a header to the index file
echo "// This file is auto-generated. Do not edit directly." > "$TEMP_FILE"
echo "" >> "$TEMP_FILE"

# Find all component files and generate export statements
for FILE in "$COMPONENTS_DIR"/*.tsx; do
  if [ -f "$FILE" ]; then
    # Extract the filename without extension
    FILENAME=$(basename "$FILE" .tsx)

    # Convert filename to kebab-case if it's in camelCase
    KEBAB_CASE=$(echo "$FILENAME" | sed -r 's/([a-z0-9])([A-Z])/\1-\2/g' | tr '[:upper:]' '[:lower:]')

    # Add the export statement
    echo "export * from './ui/$KEBAB_CASE';" >> "$TEMP_FILE"
  fi
done

# Add a blank line at the end
echo "" >> "$TEMP_FILE"

# Replace the index file with the new content
mv "$TEMP_FILE" "$INDEX_FILE"

echo "Updated $INDEX_FILE with exports for all ui in $COMPONENTS_DIR"
