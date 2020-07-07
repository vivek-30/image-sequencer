FROM gitpod/workspace-full

RUN sudo apt-get update \
 && sudo apt-get install -y \
    install xserver-xorg-dev libxext-dev libxi-dev build-essential libxi-dev libglu1-mesa-dev libglew-dev pkg-config libglu1-mesa-dev freeglut3-dev mesa-common-dev \
 && sudo rm -rf /var/lib/apt/lists/*
