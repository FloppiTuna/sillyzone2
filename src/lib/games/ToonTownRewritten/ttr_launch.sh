#!/bin/bash

echo "=== sillyzone2 ~ ToonTown Rewritten Launcher ==="
echo "You are: $SILLYZONE_USERNAME"
echo ""
echo "NOTE: This script will attempt to automatically load your account credentials from Sillyzone."
echo "Make sure you put your credentials in the Jellybean launcher on Sillyzone, and that they are valid."

echo "Fetching credentials from Sillyzone..."
sleep 1

# fetch credentials from the API route and parse the JSON to get the username and password
response=$(curl -s ${SILLYZONE_ROOT_URL}/api/games/credentials)

TOONTOWN_USERNAME=$(echo $response | jq -r '.game_credentials.ttr.username')
TOONTOWN_PASSWORD=$(echo $response | jq -r '.game_credentials.ttr.password')

echo "Username: $TOONTOWN_USERNAME"
echo "Password: $(echo $TOONTOWN_PASSWORD | sed 's/./*/g')"
echo ""

# push this as TOONTOWN_USERNAME: TOONTOWN_PASSWORD into the "accounts" array in the config.json file for the launcher
# if the accounts array doesn't exist, create it
jq --arg user "$TOONTOWN_USERNAME" --arg pass "$TOONTOWN_PASSWORD" \
  '.accounts[$user] = $pass' \
  /launcher/config.json > /launcher/config.json.tmp && \
  mv /launcher/config.json.tmp /launcher/config.json

echo "Loaded credentials!"

echo -e "\033[5mDownloading and running ToonTown Rewritten...\033[0m"
sleep 2

# pipe the password into the input when it asks for "Password for" and then run the launcher with the username and password
/launcher/target/release/shticker_book_unwritten --config /launcher/config.json --username "$TOONTOWN_USERNAME"