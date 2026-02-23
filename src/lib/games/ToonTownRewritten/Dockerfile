FROM ubuntu:25.04

ENV DEBIAN_FRONTEND=noninteractive

# sillyzone's root url
ARG SILLYZONE_ROOT_URL=http://192.168.1.240:5173
ENV SILLYZONE_ROOT_URL=${SILLYZONE_ROOT_URL}

# install deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    wmctrl \
    sudo \
    xterm \
    build-essential \
    curl \
    wget \
    git \
    software-properties-common \
    gnupg2 \
    ca-certificates \
    unzip \
    pkg-config \
    libx11-dev \
    libgl1-mesa-dev \
    libvulkan-dev \
    libxrandr-dev \
    libxinerama-dev \
    libxcursor-dev \
    libxi-dev \
    libasound2-dev \
    jq \
    pulseaudio \
    pulseaudio-utils \
&& rm -rf /var/lib/apt/lists/*

# install xpra
RUN curl https://xpra.org/get-xpra.sh | bash

# install rust as root (will be accessible via PATH)
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# build shticker_book_unwritten as root
RUN git clone https://github.com/JonathanHelianthicusDoe/shticker_book_unwritten.git /launcher
WORKDIR /launcher
RUN cargo build --release

# copy files
COPY ttr_launch.sh /launcher/ttr_launch.sh
RUN chmod +x /launcher/ttr_launch.sh
COPY config.json /launcher/config.json
COPY startup.sh /launcher/startup.sh
RUN chmod +x /launcher/startup.sh

# create non-root user cuz root is scary and running toontown as root is just too powerful it would be unfair for the cogs
RUN useradd -m -s /bin/bash sillyuser && \
    echo "sillyuser ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# change ownership of launcher directory to sillyuser
RUN chown -R sillyuser:sillyuser /launcher /home/sillyuser

RUN touch /tmp/game_progress.txt
RUN chown sillyuser:sillyuser /tmp/game_progress.txt

# switch to non-root user
USER sillyuser
WORKDIR /launcher

CMD ["/launcher/startup.sh"]

# XPRA web interface and audio
EXPOSE 10000