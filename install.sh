#!/bin/bash

# Pterodactyl Panel Theme Installation Script
# Repository: sdgamer8263-sketch/my

echo "Starting installation of Custom Pterodactyl Theme..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit
fi

# Define paths
PANEL_DIR="/var/www/pterodactyl"
BACKUP_DIR="/var/www/pterodactyl_backup_$(date +%Y%m%d_%H%M%S)"

# Navigate to panel directory
cd $PANEL_DIR || { echo "Pterodactyl installation not found at $PANEL_DIR"; exit 1; }

# Create backup
echo "Creating backup of current panel..."
mkdir -p $BACKUP_DIR
cp -r resources $BACKUP_DIR/
cp -r public $BACKUP_DIR/
echo "Backup created at $BACKUP_DIR"

# Download theme files
echo "Downloading theme files from GitHub..."
wget -qO theme.zip https://github.com/sdgamer8263-sketch/my/archive/refs/heads/main.zip

# Extract and install
echo "Extracting theme files..."
unzip -qo theme.zip
cp -r my-main/pterodactyl-theme-code/* $PANEL_DIR/

# Clean up downloaded files
rm -rf theme.zip my-main

# Install dependencies and build
echo "Installing Node.js dependencies and building assets..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
npm install -g yarn
yarn install
yarn build:production

# Clear cache and optimize
echo "Clearing cache and optimizing..."
php artisan view:clear
php artisan config:clear
php artisan route:clear
php artisan optimize

# Set permissions
echo "Setting correct permissions..."
chown -R www-data:www-data $PANEL_DIR/*

echo "Theme installation completed successfully!"
echo "Please refresh your browser to see the changes."
