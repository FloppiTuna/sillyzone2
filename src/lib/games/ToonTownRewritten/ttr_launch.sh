echo "=== sillyzone2 ~ ToonTown Rewritten Launcher ==="
echo "You are: $SILLYZONE_USERNAME"
echo ""
echo "NOTE: This script will attempt to automatically load your account credentials from Sillyzone."
echo "Make sure you put your credentials in the Jellybean launcher on Sillyzone, and that they are valid."

echo "\033[5mDownloading and running ToonTown Rewritten...\033[0m"
sleep 2
/launcher/target/release/shticker_book_unwritten --config /launcher/config.json -d