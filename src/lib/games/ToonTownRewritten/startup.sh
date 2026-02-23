#!/bin/bash

# Start XPRA display server with web interface
echo "Starting XPRA server..." > /tmp/game_progress.txt
xpra start :100 \
	--bind-tcp=0.0.0.0:10000 \
	--html=on \
	--pulseaudio=yes \
	--speaker=on \
	--microphone=off \
	--exit-with-children=no \
	--daemon=no \
	--start-child=openbox \
	--start-child="xterm -e /launcher/ttr_launch.sh"
