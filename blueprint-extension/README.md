# Pterodactyl Blueprint Extension: GlassTheme

This directory contains the necessary structure to build a `.blueprint` extension for the Pterodactyl panel.

## Directory Structure

```
blueprint-extension/
├── blueprint.yml          # The main configuration file for the extension
├── public/
│   └── extensions/
│       └── glasstheme/    # Public assets (CSS, JS, Images)
│           └── style.css  # Custom CSS for the glassmorphism theme
└── resources/
    └── views/
        └── templates/     # Blade template overrides/injections
```

## How to Build and Install

1. Place this `blueprint-extension` folder inside your Pterodactyl panel directory (usually `/var/www/pterodactyl`).
2. Run the Blueprint build command:
   ```bash
   blueprint -b
   ```
3. This will package the extension and apply the necessary changes to your panel.

## Note on React Components
Since Pterodactyl's frontend is built with React, adding completely new pages (like the Subdomain Manager or Mod Installer) requires modifying the React source code and recompiling the assets using `yarn build:production`. 

A Blueprint extension can inject CSS and modify Blade templates easily, but for deep React modifications, you typically use a combination of Blueprint hooks and direct file modifications (which Blueprint can handle via its patching system).

The provided `blueprint.yml` and `style.css` give you the foundation for the Glassmorphism look. To fully integrate the custom React pages built in this preview, you would include them in the `resources/scripts` directory and use Blueprint to patch the `App.tsx` and `Sidebar.tsx` files.
