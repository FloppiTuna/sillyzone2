FROM ubuntu:25.04

ENV DEBIAN_FRONTEND=noninteractive

# install deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    xterm \
    supervisor \
    xvfb \
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
    x11-xserver-utils \
    xvfb \
    x11vnc \
    openbox \
    x11-utils \
&& rm -rf /var/lib/apt/lists/*

# allow build-time override of the VNC password (default: "secret")
ARG VNC_PASSWORD=secret

# create VNC password file
RUN mkdir -p /root/.vnc && \
    x11vnc -storepasswd "$VNC_PASSWORD" /root/.vnc/passwd

# install rust
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# build shticker_book_unwritten
RUN git clone https://github.com/JonathanHelianthicusDoe/shticker_book_unwritten.git /launcher
WORKDIR /launcher
RUN cargo build --release

COPY config.json /launcher/config.json

# copy launch script
COPY ttr_launch.sh /launcher/ttr_launch.sh
RUN chmod +x /launcher/ttr_launch.sh

# copy supervisord config
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# cosmetic crap
COPY openbox_config.sh /root/.config/openbox/autostart



CMD ["/usr/bin/supervisord"]

# VNC
EXPOSE 5900