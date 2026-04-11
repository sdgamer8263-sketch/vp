#!/bin/bash

# GlassTheme Blueprint Extension Auto-Creator & Installer
# Author: sdgamer8263

echo "================================================="
echo "  Creating GlassTheme Blueprint Extension...     "
echo "================================================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit
fi

# Ensure zip is installed
apt-get update && apt-get install -y zip unzip

# Navigate to Pterodactyl directory
cd /var/www/pterodactyl || { echo "Pterodactyl not found at /var/www/pterodactyl"; exit 1; }

# Create temporary extension directory
echo "Setting up extension files..."
mkdir -p glasstheme-ext
cd glasstheme-ext

# 1. Create conf.yml (Blueprint configuration file)
cat << 'EOF' > conf.yml
info:
  name: GlassTheme
  identifier: glasstheme
  description: A custom glassmorphism theme for Pterodactyl.
  version: 1.0.0
  target: any
  author: sdgamer8263
  icon: fa-paint-brush
admin:
  view: admin
EOF

# 1.5 Create admin view file (Required by Blueprint)
cat << 'EOF' > admin.blade.php
@extends('layouts.admin')
@include('partials/admin.settings.nav', ['activeTab' => 'basic'])

@section('title')
    GlassTheme Settings
@endsection

@section('content-header')
    <h1>GlassTheme<small>A custom glassmorphism theme.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Extensions</li>
    </ol>
@endsection

@section('content')
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title">GlassTheme Installed Successfully</h3>
                </div>
                <div class="box-body">
                    <p>The GlassTheme CSS has been injected into your panel. Your panel should now have a glassmorphism look!</p>
                </div>
            </div>
        </div>
    </div>
@endsection
EOF

# 2. Create CSS file (The magic that makes it glass without breaking React)
mkdir -p public
cat << 'EOF' > public/glass.css
/* Custom Glassmorphism Background */
body {
    background-color: #0f172a !important;
    background-image: 
        radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
        radial-gradient(at 50% 0%, hsla(225,39%,30%,0.1) 0, transparent 50%), 
        radial-gradient(at 100% 0%, hsla(339,49%,30%,0.1) 0, transparent 50%) !important;
    background-attachment: fixed !important;
    color: white !important;
}

/* Make the main backgrounds transparent */
.bg-neutral-900, .bg-gray-900, .bg-black {
    background-color: transparent !important;
}

/* Make cards glassmorphism */
.bg-neutral-800, .bg-gray-800, .bg-neutral-700 {
    background: rgba(255, 255, 255, 0.05) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1) !important;
    border-radius: 0.75rem !important;
}

/* Fix text colors for better visibility on glass */
.text-neutral-400, .text-gray-400 {
    color: rgba(255, 255, 255, 0.7) !important;
}

/* Glass buttons */
button.bg-neutral-700 {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
}
button.bg-neutral-700:hover {
    background: rgba(255, 255, 255, 0.2) !important;
}
EOF

# 3. Create install script (Injects CSS into the wrapper)
cat << 'EOF' > install.sh
#!/bin/bash
echo "Applying GlassTheme CSS injection..."
if ! grep -q "glass.css" /var/www/pterodactyl/resources/views/templates/wrapper.blade.php; then
    sed -i 's|</head>|<link rel="stylesheet" href="/assets/extensions/glasstheme/glass.css">\n</head>|g' /var/www/pterodactyl/resources/views/templates/wrapper.blade.php
fi
echo "CSS injected successfully."
EOF

# 4. Create remove script
cat << 'EOF' > remove.sh
#!/bin/bash
echo "Removing GlassTheme CSS injection..."
sed -i '/glass.css/d' /var/www/pterodactyl/resources/views/templates/wrapper.blade.php
echo "CSS removed successfully."
EOF

chmod +x *.sh

# 5. Package into .blueprint file
echo "Packaging into glasstheme.blueprint..."
zip -r ../glasstheme.blueprint *

# 6. Clean up temp folder
cd ..
rm -rf glasstheme-ext

# 7. Install via Blueprint
echo "================================================="
echo "  Installing via Blueprint Framework...          "
echo "================================================="
if command -v blueprint &> /dev/null; then
    blueprint -install glasstheme
    echo "================================================="
    echo "  SUCCESS! GlassTheme has been installed.        "
    echo "================================================="
else
    echo "ERROR: Blueprint command not found!"
    echo "Please make sure you have installed the Blueprint framework first."
    echo "You can install it from: https://blueprint.zip/"
fi
