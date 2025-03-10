#!/usr/bin/env bash

# Update package list
apt-get update

# Install system dependencies required for pygobject
apt-get install -y libgirepository1.0-dev gir1.2-gtk-3.0

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt


