import React, { useEffect } from 'react';

const GlassTheme = () => {
    useEffect(() => {
        if (document.getElementById('pterodactyl-glass-theme')) return;

        const style = document.createElement('style');
        style.id = 'pterodactyl-glass-theme';
        style.innerHTML = `
            /* Global Background */
            body {
                background-image: url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop") !important;
                background-size: cover !important;
                background-position: center !important;
                background-attachment: fixed !important;
                background-color: transparent !important;
            }

            /* Dark Overlay */
            body::before {
                content: "";
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.4);
                z-index: -1;
                pointer-events: none;
            }

            /* Sidebar */
            div[class*="NavigationBar"] {
                background: rgba(0, 0, 0, 0.2) !important;
                backdrop-filter: blur(12px) !important;
                -webkit-backdrop-filter: blur(12px) !important;
                border-right: 1px solid rgba(255, 255, 255, 0.1) !important;
            }

            /* Topbar / SubNavigation */
            div[class*="SubNavigation"] {
                background: rgba(0, 0, 0, 0.2) !important;
                backdrop-filter: blur(12px) !important;
                -webkit-backdrop-filter: blur(12px) !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
            }

            /* Server Cards */
            div[class*="ServerRow"] {
                background: rgba(0, 0, 0, 0.3) !important;
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                border-radius: 0.75rem !important;
                transition: all 0.2s ease-in-out !important;
            }
            div[class*="ServerRow"]:hover {
                background: rgba(0, 0, 0, 0.4) !important;
                border-color: rgba(255, 255, 255, 0.2) !important;
            }

            /* Content Blocks / Panels */
            div[class*="ContentContainer"], 
            div[class*="PageContentBlock"],
            div[class*="GreyRowBox"] {
                background: rgba(0, 0, 0, 0.3) !important;
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
            }

            /* Console */
            div[class*="Terminal"] {
                background: rgba(0, 0, 0, 0.5) !important;
                backdrop-filter: blur(8px) !important;
                -webkit-backdrop-filter: blur(8px) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
            }

            /* Buttons */
            button[class*="Button"] {
                background: rgba(255, 255, 255, 0.1) !important;
                backdrop-filter: blur(4px) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
            }
            button[class*="Button"]:hover {
                background: rgba(255, 255, 255, 0.2) !important;
            }
            button[class*="Button"][color="primary"] {
                background: rgba(59, 130, 246, 0.5) !important;
                border-color: rgba(59, 130, 246, 0.5) !important;
            }
            button[class*="Button"][color="primary"]:hover {
                background: rgba(59, 130, 246, 0.7) !important;
            }
        `;
        document.head.appendChild(style);
    }, []);

    return null;
};

export default GlassTheme;
