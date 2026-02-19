FROM ubuntu:25.04

ENV DEBIAN_FRONTEND=noninteractive

# sillyzone's root url
ARG SILLYZONE_ROOT_URL=http://192.168.1.241:5173
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
    openbox \
    jq \
    pulseaudio \
    pulseaudio-utils \
&& rm -rf /var/lib/apt/lists/*

# install xpra
RUN curl https://xpra.org/get-xpra.sh | bash

# install rust
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# build shticker_book_unwritten
RUN git clone https://github.com/JonathanHelianthicusDoe/shticker_book_unwritten.git /launcher
WORKDIR /launcher
RUN cargo build --release

# copy files
COPY ttr_launch.sh /launcher/ttr_launch.sh
RUN chmod +x /launcher/ttr_launch.sh
COPY config.json /launcher/config.json
COPY startup.sh /launcher/startup.sh
RUN chmod +x /launcher/startup.sh
COPY openbox_config.sh /root/.config/openbox/autostart

# setup pulseaudio
RUN mkdir -p /root/.config/pulse && \
    echo "load-module module-null-sink sink_name=@DEFAULT_SINK@" >> /root/.config/pulse/default.pa

CMD ["/launcher/startup.sh"]

# XPRA web interface and audio
EXPOSE 10000