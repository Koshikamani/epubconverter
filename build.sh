#!/usr/bin/env bash

# Update package list
apt-get update

# Install system dependencies for pygobject
apt-get install -y \
  libgirepository1.0-dev \
  gir1.2-gtk-3.0 \
  gobject-introspection \
  build-essential \
  pkg-config \
  libcairo2-dev \
  libpango1.0-dev \
  libgdk-pixbuf2.0-dev \
  libgtk-3-dev

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

