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

# Put panel in maintenance mode
echo "Putting panel in maintenance mode..."
php artisan down

# Create backup
echo "Creating backup of current panel..."
mkdir -p $BACKUP_DIR
cp -r resources $BACKUP_DIR/
cp -r public $BACKUP_DIR/
echo "Backup created at $BACKUP_DIR"

# Download theme files
echo "Downloading theme files from GitHub..."
# Replace this URL with the actual URL where your compiled theme files are hosted
wget -qO theme.zip https://github.com/sdgamer8263-sketch/my/archive/refs/heads/main.zip

# Extract and install
echo "Extracting theme files..."
unzip -qo theme.zip
# Make sure the path matches where your theme files are located inside the zip
cp -r my-main/* $PANEL_DIR/

# Clean up downloaded files
rm -rf theme.zip my-main

# Install dependencies and build
echo "Setting up swap file to prevent out-of-memory errors during build..."
fallocate -l 4G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=4096
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab

echo "Installing Node.js dependencies and building assets..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
npm install -g yarn
yarn cache clean
yarn install --network-timeout 100000
yarn build:production || { echo "Build failed. Trying again with increased memory limit..."; NODE_OPTIONS="--max_old_space_size=4096" yarn build:production; }

# Remove swap file after build
swapoff /swapfile
rm -f /swapfile
sed -i '/\/swapfile/d' /etc/fstab

# Clear cache and optimize
echo "Clearing cache and optimizing..."
php artisan view:clear
php artisan config:clear
php artisan route:clear
php artisan optimize

# Set permissions
echo "Setting correct permissions..."
chown -R www-data:www-data $PANEL_DIR/*

# Bring panel back online
echo "Bringing panel back online..."
php artisan up

echo "Theme installation completed successfully!"
echo "Please refresh your browser to see the changes."
