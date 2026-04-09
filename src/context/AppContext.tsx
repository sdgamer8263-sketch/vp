import React, { createContext, useContext, useState, ReactNode } from "react";

export type Role = "Admin" | "Standard";

export interface Theme {
  primary: string;
  secondary: string;
  sidebar: string;
  backgroundUrl: string;
  logoUrl: string;
  faviconUrl: string;
}

export interface SocialMedia {
  discord: { enabled: boolean; url: string };
  twitter: { enabled: boolean; url: string };
  youtube: { enabled: boolean; url: string };
  github: { enabled: boolean; url: string };
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface Server {
  id: string;
  name: string;
  ownerId: string;
  software: "Paper" | "Spigot" | "Bukkit" | "Bedrock" | "Pocket Edition" | "Node.js" | "Python" | "Fabric" | "Forge" | "Vanilla" | "CS:GO";
  status: "running" | "offline" | "suspended";
  cpu: { used: number; total: number };
  ram: { used: number; total: number };
  disk: { used: number; total: number };
  uptime: string;
  expirationDate?: string;
  autoSuspendDate?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed";
  createdAt: string;
  createdBy: string;
  creatorId: string;
  isAdminCreator?: boolean;
  replies?: any[];
}

export interface CloudflareSettings {
  baseDomain: string;
  apiToken: string;
  zoneId: string;
}

export interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  currentUser: User;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  socialMedia: SocialMedia;
  setSocialMedia: (socialMedia: SocialMedia) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  servers: Server[];
  setServers: (servers: Server[]) => void;
  updateServerStatus: (id: string, status: "running" | "offline" | "suspended") => void;
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
  discordSettings: {
    suspendChannel: string;
    renewalChannel: string;
    renewalDaysWarning: number;
  };
  setDiscordSettings: (settings: any) => void;
  cloudflareSettings: CloudflareSettings;
  setCloudflareSettings: (settings: CloudflareSettings) => void;
  viewMode: "user" | "admin";
  setViewMode: (mode: "user" | "admin") => void;
}

const defaultTheme: Theme = {
  primary: "#3b82f6", // blue-500
  secondary: "#1e40af", // blue-800
  sidebar: "#111827", // gray-900
  backgroundUrl: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2342&auto=format&fit=crop",
  logoUrl: "",
  faviconUrl: "",
};

const defaultSocialMedia: SocialMedia = {
  discord: { enabled: true, url: "https://discord.gg/example" },
  twitter: { enabled: false, url: "https://twitter.com/example" },
  youtube: { enabled: false, url: "https://youtube.com/example" },
  github: { enabled: true, url: "https://github.com/example" },
};

const initialUsers: User[] = [
  { id: "u-1", username: "admin", email: "admin@example.com", role: "Admin", createdAt: "2023-01-01" },
  { id: "u-2", username: "player1", email: "player1@example.com", role: "Standard", createdAt: "2023-05-15" },
  { id: "u-3", username: "player2", email: "player2@example.com", role: "Standard", createdAt: "2023-08-20" },
];

const initialServers: Server[] = [
  {
    id: "srv-1",
    name: "Minecraft Survival",
    ownerId: "u-1",
    software: "Paper",
    status: "running",
    cpu: { used: 45, total: 100 },
    ram: { used: 2048, total: 4096 },
    disk: { used: 15000, total: 50000 },
    uptime: "14d 5h 23m",
    expirationDate: "2026-04-15",
    autoSuspendDate: "2026-04-15T00:00:00Z",
  },
  {
    id: "srv-2",
    name: "CS:GO Competitive",
    ownerId: "u-2",
    software: "CS:GO",
    status: "offline",
    cpu: { used: 0, total: 100 },
    ram: { used: 0, total: 2048 },
    disk: { used: 5000, total: 20000 },
    uptime: "0m",
    expirationDate: "2026-05-01",
  },
];

const defaultCloudflareSettings: CloudflareSettings = {
  baseDomain: "",
  apiToken: "",
  zoneId: "",
};

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>("Admin");
  const [viewMode, setViewMode] = useState<"user" | "admin">("user");
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [socialMedia, setSocialMedia] = useState<SocialMedia>(defaultSocialMedia);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [servers, setServers] = useState<Server[]>(initialServers);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [discordSettings, setDiscordSettings] = useState({
    suspendChannel: "",
    renewalChannel: "",
    renewalDaysWarning: 7,
  });
  const [cloudflareSettings, setCloudflareSettings] = useState<CloudflareSettings>(defaultCloudflareSettings);

  const currentUser = role === "Admin" && viewMode === "user"
    ? (users.find(u => u.role === "Standard") || users[0])
    : (users.find(u => u.role === role) || users[0]);

  const updateServerStatus = (id: string, status: "running" | "offline" | "suspended") => {
    setServers((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        theme,
        setTheme,
        socialMedia,
        setSocialMedia,
        users,
        setUsers,
        servers,
        setServers,
        updateServerStatus,
        tickets,
        setTickets,
        discordSettings,
        setDiscordSettings,
        cloudflareSettings,
        setCloudflareSettings,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
