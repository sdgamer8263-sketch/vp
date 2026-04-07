# Pterodactyl Blueprint Extension: GlassTheme

This directory contains the necessary structure to build a `.blueprint` extension for the Pterodactyl panel.

## Directory Structure

To package this as a `.blueprint` file, your directory structure should look like this:

```
glasstheme/
├── blueprint.yml          # The main configuration file for the extension
├── public/
│   └── extensions/
│       └── glasstheme/    # Public assets (CSS, JS, Images)
│           └── style.css  # Custom CSS for the glassmorphism theme
└── resources/
    └── scripts/           # React frontend files (copy the 'src' folder contents here)
        ├── components/
        ├── pages/
        ├── App.tsx
        └── ...
```

## How to Build and Install

1. **Prepare the files**: Copy all the contents of the `src` folder from this project into the `resources/scripts/` folder of your extension directory.
2. **Package the extension**: Compress the `glasstheme` folder into a `.zip` file, and rename the extension to `.blueprint` (e.g., `glasstheme.blueprint`).
3. **Upload to Pterodactyl**: Upload the `glasstheme.blueprint` file to your Pterodactyl panel's root directory (usually `/var/www/pterodactyl`).
4. **Run the Blueprint build command**:
   ```bash
   blueprint -b
   ```
5. **Wait for compilation**: Blueprint will automatically copy the files, inject the CSS into the Blade templates, and run `yarn build:production` to compile the React frontend.

## Features Included

- **Glassmorphism UI**: A sleek, modern design applied to all panel components.
- **Custom Pages**: Subdomain Manager, Plugin/Mod/Addon Installers, Version Changer, Resource Pack Manager, and Egg Changer.
- **Conditional Sidebar**: Management links only appear when viewing a specific server.
- **Admin Panel**: Styled admin settings and ticket system.

## Note on React Modifications

This extension completely replaces several core React files (like `App.tsx` and `ServerView.tsx`) to add the new routes and components. Ensure you are installing this on a fresh or compatible Pterodactyl installation to avoid conflicts with other themes that modify the same files.
