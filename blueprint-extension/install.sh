#!/bin/bash

# Pterodactyl Glassmorphism Theme Installation Script
# This script automates the installation of the Blueprint extension.

set -e

echo -e "\n\033[1;34m=================================================================\033[0m"
echo -e "\033[1;36m       Pterodactyl Glassmorphism Theme Installer\033[0m"
echo -e "\033[1;34m=================================================================\033[0m\n"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo -e "\033[1;31mPlease run as root.\033[0m"
  exit 1
fi

# Check if Blueprint is installed
if ! command -v blueprint &> /dev/null; then
  echo -e "\033[1;31mBlueprint is not installed. Please install Blueprint first.\033[0m"
  echo "Visit https://blueprint.zip for installation instructions."
  exit 1
fi

cd /var/www/pterodactyl

echo -e "\033[1;33m[1/3] Downloading the theme extension...\033[0m"
# In a real scenario, this would download the .blueprint file from a release URL.
# For this demo, we assume the user has uploaded the .blueprint file to the server.
# Example: wget -O glasstheme.blueprint https://github.com/yourusername/yourrepo/releases/latest/download/glasstheme.blueprint

if [ ! -f "glasstheme.blueprint" ]; then
    echo -e "\033[1;31mError: glasstheme.blueprint not found in /var/www/pterodactyl.\033[0m"
    echo "Please upload the packaged .blueprint file to your pterodactyl directory and run this script again."
    exit 1
fi

echo -e "\033[1;33m[2/3] Installing the Blueprint extension...\033[0m"
blueprint -install glasstheme

echo -e "\033[1;33m[3/3] Building the panel...\033[0m"
# Blueprint handles the build process automatically via the blueprint.yml hooks,
# but we can trigger it manually if needed.
blueprint -b

echo -e "\n\033[1;32m=================================================================\033[0m"
echo -e "\033[1;32m  Installation Complete! The Glassmorphism theme is now active.\033[0m"
echo -e "\033[1;32m=================================================================\033[0m\n"
