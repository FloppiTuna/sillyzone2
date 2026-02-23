#!/bin/bash

echo "=== sillyzone2 ~ ToonTown Rewritten Launcher ==="
echo "You are: $SILLYZONE_USERNAME"
echo ""

echo "Loading credentials..." > /tmp/game_progress.txt
echo "Loading your credentials from Sillyzone, please wait..."
sleep 1

# fetch credentials from the API route and parse the JSON to get the username and password
echo "Applying credentials from Sillyzone..." > /tmp/game_progress.txt
response=$(curl -s ${SILLYZONE_ROOT_URL}/api/games/credentials)

TOONTOWN_USERNAME=$(echo $response | jq -r '.game_credentials.ttr.username')
TOONTOWN_PASSWORD=$(echo $response | jq -r '.game_credentials.ttr.password')

# if either is empty then we should ask the user to input them
if [ -z "$TOONTOWN_USERNAME" ] || [ -z "$TOONTOWN_PASSWORD" ]; then
  echo "Prompting user for credentials..." > /tmp/game_progress.txt

  echo "Failed to load ToonTown credentials from Sillyzone! You may enter them now, but they will not be saved."
  echo "Go to [File -> Manage Game Credentials] in the Jellybean launcher to save your credentials."
  read -p "Username: " TOONTOWN_USERNAME
  read -s -p "Password: " TOONTOWN_PASSWORD
  echo ""
fi

echo "Username: $TOONTOWN_USERNAME"
echo "Password: $(echo $TOONTOWN_PASSWORD | sed 's/./*/g')"
echo ""

# push this as TOONTOWN_USERNAME: TOONTOWN_PASSWORD into the "accounts" array in the config.json file for the launcher
# if the accounts array doesn't exist, create it
jq --arg user "$TOONTOWN_USERNAME" --arg pass "$TOONTOWN_PASSWORD" \
  '.accounts[$user] = $pass' \
  /launcher/config.json > /launcher/config.json.tmp && \
  mv /launcher/config.json.tmp /launcher/config.json

echo "Loaded credentials into the launcher."

echo "Downloading and launching ToonTown!" > /tmp/game_progress.txt
echo -e "\033[5mLaunching ToonTown Rewritten...\033[0m"
sleep 2

# pipe the password into the input when it asks for "Password for" and then run the launcher with the username and password
echo "It's go time!" > /tmp/game_progress.txt

/launcher/target/release/shticker_book_unwritten --config /launcher/config.json --username "$TOONTOWN_USERNAME" 

# Maximize the window after launching
sleep 5

# wmctrl -r :ACTIVE: -b add,maximized_vert,maximized_horz