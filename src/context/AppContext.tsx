import React, { createContext, useContext, useState, ReactNode } from "react";

export type Role = "Admin" | "Standard";

export interface Theme {
  primary: string;
  secondary: string;
  sidebar: string;
}

export interface Server {
  id: string;
  name: string;
  status: "running" | "offline" | "suspended";
  cpu: { used: number; total: number };
  ram: { used: number; total: number };
  disk: { used: number; total: number };
  uptime: string;
  expirationDate?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed";
  createdAt: string;
  createdBy: string;
}

export interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
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
  viewMode: "user" | "admin";
  setViewMode: (mode: "user" | "admin") => void;
}

const defaultTheme: Theme = {
  primary: "#3b82f6", // blue-500
  secondary: "#1e40af", // blue-800
  sidebar: "#111827", // gray-900
};

const initialServers: Server[] = [
  {
    id: "srv-1",
    name: "Minecraft Survival",
    status: "running",
    cpu: { used: 45, total: 100 },
    ram: { used: 2048, total: 4096 },
    disk: { used: 15000, total: 50000 },
    uptime: "14d 5h 23m",
    expirationDate: "2026-04-15",
  },
  {
    id: "srv-2",
    name: "CS:GO Competitive",
    status: "offline",
    cpu: { used: 0, total: 100 },
    ram: { used: 0, total: 2048 },
    disk: { used: 5000, total: 20000 },
    uptime: "0m",
    expirationDate: "2026-05-01",
  },
];

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>("Admin");
  const [viewMode, setViewMode] = useState<"user" | "admin">("user");
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [servers, setServers] = useState<Server[]>(initialServers);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [discordSettings, setDiscordSettings] = useState({
    suspendChannel: "",
    renewalChannel: "",
    renewalDaysWarning: 7,
  });

  const updateServerStatus = (id: string, status: "running" | "offline" | "suspended") => {
    setServers((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        theme,
        setTheme,
        servers,
        setServers,
        updateServerStatus,
        tickets,
        setTickets,
        discordSettings,
        setDiscordSettings,
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
