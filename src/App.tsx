import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Server, Users, Settings, LogOut, Menu, X, Image as ImageIcon, 
  Save, Terminal as TerminalIcon, Play, Square, RotateCcw, Sun, Moon, ChevronDown,
  User, Key, Folder, Database, Calendar, Shield, Archive, Network, Cpu,
  Globe, Puzzle, Box, Users as UsersIcon, Package, Layers, Eye, EyeOff, Download, Search, ShieldAlert,
  CreditCard, ShoppingCart, LifeBuoy, Receipt, Ticket, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export default function App() {
  const [authState, setAuthState] = useState<'login' | 'register' | 'authenticated'>('login');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Servers');
  const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');
  const [customWallpaperInput, setCustomWallpaperInput] = useState('');
  
  // Theme Settings State
  const [panelName, setPanelName] = useState('SKA HOST');
  const [panelNameInput, setPanelNameInput] = useState('SKA HOST');
  const [panelIcon, setPanelIcon] = useState('');
  const [panelIconInput, setPanelIconInput] = useState('');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  // Billing Settings State
  const [billingSettings, setBillingSettings] = useState({
    currency: 'USD',
    taxRate: '0',
    paypalClientId: '',
    stripePublicKey: '',
    stripeSecretKey: ''
  });
  const [billingSettingsInput, setBillingSettingsInput] = useState({
    currency: 'USD',
    taxRate: '0',
    paypalClientId: '',
    stripePublicKey: '',
    stripeSecretKey: ''
  });

  const [autoSuspend, setAutoSuspend] = useState({ enabled: true, days: 3 });
  const [autoSuspendInput, setAutoSuspendInput] = useState({ enabled: true, days: 3 });

  const [storePlans, setStorePlans] = useState([
    { name: 'Starter', ram: '2 GB', cpu: '1 Core', disk: '20 GB NVMe', price: '4.00' },
    { name: 'Professional', ram: '4 GB', cpu: '2 Cores', disk: '40 GB NVMe', price: '8.00', popular: true },
    { name: 'Extreme', ram: '8 GB', cpu: '4 Cores', disk: '80 GB NVMe', price: '16.00' },
  ]);
  const [storePlansInput, setStorePlansInput] = useState([
    { name: 'Starter', ram: '2 GB', cpu: '1 Core', disk: '20 GB NVMe', price: '4.00' },
    { name: 'Professional', ram: '4 GB', cpu: '2 Cores', disk: '40 GB NVMe', price: '8.00', popular: true },
    { name: 'Extreme', ram: '8 GB', cpu: '4 Cores', disk: '80 GB NVMe', price: '16.00' },
  ]);

  // Social Media State
  interface SocialLink {
    enabled: boolean;
    url: string;
  }

  const [socialLinks, setSocialLinks] = useState<Record<string, SocialLink>>({
    discord: { enabled: true, url: 'https://discord.gg/' },
    twitter: { enabled: false, url: 'https://twitter.com/' },
    youtube: { enabled: false, url: 'https://youtube.com/' },
    github: { enabled: false, url: 'https://github.com/' }
  });
  const [socialLinksInput, setSocialLinksInput] = useState<Record<string, SocialLink>>({
    discord: { enabled: true, url: 'https://discord.gg/' },
    twitter: { enabled: false, url: 'https://twitter.com/' },
    youtube: { enabled: false, url: 'https://youtube.com/' },
    github: { enabled: false, url: 'https://github.com/' }
  });

  // Server Customization State (Mocked for demonstration)
  const [serverCustomization, setServerCustomization] = useState<Record<string, { icon: string, bg: string }>>({
    'Survival SMP': { icon: '', bg: '' },
    'Lobby': { icon: '', bg: '' },
    'Bedwars-1': { icon: '', bg: '' },
    'Development': { icon: '', bg: '' }
  });
  const [serverCustomizationInput, setServerCustomizationInput] = useState({ icon: '', bg: '' });

  // Server View State
  const [activeServerTab, setActiveServerTab] = useState('Console');
  const [ipBlurred, setIpBlurred] = useState(true);
  const [modSource, setModSource] = useState('Modrinth');
  const [installingItem, setInstallingItem] = useState<string | null>(null);
  const [installedItems, setInstalledItems] = useState<string[]>([]);
  const [compilingItem, setCompilingItem] = useState<string | null>(null);
  const [compiledItems, setCompiledItems] = useState<string[]>([]);

  const handleInstall = (name: string) => {
    setInstallingItem(name);
    setTimeout(() => {
      setInstallingItem(null);
      setInstalledItems(prev => [...prev, name]);
    }, 2000);
  };

  const handleCompile = (name: string) => {
    setCompilingItem(name);
    setTimeout(() => {
      setCompilingItem(null);
      setCompiledItems(prev => [...prev, name]);
    }, 3000);
  };

  // Mock data for animated graphs
  const [stats, setStats] = useState({ cpu: [] as any[], ram: [] as any[] });

  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      return Array.from({ length: 20 }).map((_, i) => ({
        time: new Date(now.getTime() - (19 - i) * 2000).toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
        cpu: Math.floor(Math.random() * 40) + 10,
        ram: Math.floor(Math.random() * 30) + 40,
      }));
    };
    setStats({ cpu: generateData(), ram: generateData() });

    const interval = setInterval(() => {
      setStats(prev => {
        const newTime = new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' });
        const newCpu = [...prev.cpu.slice(1), { time: newTime, cpu: Math.floor(Math.random() * 40) + 10, ram: Math.floor(Math.random() * 30) + 40 }];
        return { cpu: newCpu, ram: newCpu };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleWallpaperChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (customWallpaperInput) {
      setWallpaper(customWallpaperInput);
      setCustomWallpaperInput('');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setPanelName(panelNameInput);
    setPanelIcon(panelIconInput);
    setSocialLinks(socialLinksInput);
    setBillingSettings(billingSettingsInput);
    setAutoSuspend(autoSuspendInput);
    setStorePlans(storePlansInput);
    if (customWallpaperInput) {
      setWallpaper(customWallpaperInput);
    }
  };

  const handleSaveServerSettings = (serverName: string) => {
    setServerCustomization(prev => ({
      ...prev,
      [serverName]: serverCustomizationInput
    }));
  };

  const serverTabs = [
    { name: 'Console', icon: <TerminalIcon size={16} /> },
    { name: 'File Manager', icon: <Folder size={16} /> },
    { name: 'Databases', icon: <Database size={16} /> },
    ...(isAdmin ? [{ name: 'Subdomains', icon: <Globe size={16} /> }] : []),
    { name: 'Plugins', icon: <Puzzle size={16} /> },
    { name: 'Mods', icon: <Box size={16} /> },
    { name: 'Version Changer', icon: <Layers size={16} /> },
    { name: 'Egg Changer', icon: <Box size={16} /> },
    { name: 'Players', icon: <UsersIcon size={16} /> },
    { name: 'Resource Packs', icon: <Package size={16} /> },
    { name: 'Bedrock Add-ons', icon: <Layers size={16} /> },
    { name: 'Schedules', icon: <Calendar size={16} /> },
    { name: 'Backups', icon: <Archive size={16} /> },
    ...(isAdmin ? [
      { name: 'Network', icon: <Network size={16} /> },
      { name: 'Startup', icon: <Play size={16} /> },
      { name: 'Settings', icon: <Settings size={16} /> }
    ] : []),
  ];

  useEffect(() => {
    if (!isAdmin && ['Subdomains', 'Network', 'Startup', 'Settings'].includes(activeServerTab)) {
      setActiveServerTab('Console');
    }
  }, [isAdmin, activeServerTab]);

  // Helper to simulate file upload
  const handleFileUpload = (setter: (val: string) => void) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setter(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  if (authState !== 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center relative font-sans" style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-md p-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl text-white">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 shadow-lg flex items-center justify-center">
              <Server size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{panelName}</h1>
            <p className="text-white/60 mt-2">{authState === 'login' ? 'Welcome back, sign in to continue' : 'Create a new account'}</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setAuthState('authenticated'); }} className="space-y-5">
            {authState === 'register' && (
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Username</label>
                <input type="text" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" placeholder="admin" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Email</label>
              <input type="email" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" placeholder="admin@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">Password</label>
              <input type="password" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
              {authState === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          <div className="mt-8 text-center">
            <button onClick={() => setAuthState(authState === 'login' ? 'register' : 'login')} className="text-sm text-white/60 hover:text-white transition-colors">
              {authState === 'login' ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen font-sans overflow-hidden relative flex ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dynamic overlay based on theme mode */}
      <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${themeMode === 'dark' ? 'bg-black/60' : 'bg-white/40 backdrop-blur-sm'}`} />

      {/* Mobile Sidebar Toggle */}
      <button 
        className="lg:hidden absolute top-4 left-4 z-50 p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className={`w-64 h-screen flex-shrink-0 z-40 relative flex flex-col backdrop-blur-xl border-r shadow-[4px_0_24px_rgba(0,0,0,0.2)] ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}
          >
            <div className="p-6 flex items-center justify-center border-b border-white/10 text-center gap-3">
              {panelIcon ? (
                <img src={panelIcon} alt="Panel Icon" className="w-8 h-8 rounded-lg object-cover shadow-lg" />
              ) : null}
              <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 leading-tight drop-shadow-sm">
                {panelName}
              </h1>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
              {activeTab === 'ServerView' ? (
                <>
                  <button 
                    onClick={() => setActiveTab('Servers')} 
                    className={`flex items-center gap-2 text-sm mb-4 px-4 transition-colors ${themeMode === 'dark' ? 'text-white/50 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    <ChevronDown className="rotate-90" size={16} /> Back to Servers
                  </button>
                  {serverTabs.map(tab => (
                    <NavItem 
                      key={tab.name}
                      icon={tab.icon} 
                      label={tab.name} 
                      active={activeServerTab === tab.name} 
                      onClick={() => setActiveServerTab(tab.name)} 
                      themeMode={themeMode} 
                    />
                  ))}
                </>
              ) : (
                <>
                  <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} themeMode={themeMode} />
                  <NavItem icon={<Server size={20} />} label="Servers" active={activeTab === 'Servers'} onClick={() => setActiveTab('Servers')} themeMode={themeMode} />
                  
                  <div className="pt-4 pb-2">
                    <p className={`text-xs font-bold uppercase tracking-wider px-4 ${themeMode === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>Billing & Store</p>
                  </div>
                  <NavItem icon={<CreditCard size={20} />} label="Store & Billing" active={activeTab === 'Store & Billing'} onClick={() => setActiveTab('Store & Billing')} themeMode={themeMode} />
                  <NavItem icon={<LifeBuoy size={20} />} label="Support" active={activeTab === 'Support'} onClick={() => setActiveTab('Support')} themeMode={themeMode} />
                  
                  {isAdmin && (
                    <>
                      <div className="pt-4 pb-2">
                        <p className={`text-xs font-bold uppercase tracking-wider px-4 ${themeMode === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>Administration</p>
                      </div>
                      <NavItem icon={<User size={20} />} label="Users" active={activeTab === 'Users'} onClick={() => setActiveTab('Users')} themeMode={themeMode} />
                    </>
                  )}
                </>
              )}
            </nav>

            <div className="p-4 border-t border-white/10">
              <button onClick={() => setAuthState('login')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${themeMode === 'dark' ? 'text-red-300 hover:bg-red-500/20 hover:text-red-200' : 'text-red-600 hover:bg-red-500/20 hover:text-red-700'}`}>
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
            {/* Social Links in Sidebar */}
            <div className={`p-4 border-t flex justify-center gap-4 ${themeMode === 'dark' ? 'border-white/10' : 'border-white/30'}`}>
              {Object.entries(socialLinks).map(([platform, data]: [string, any]) => {
                if (!data.enabled) return null;
                return (
                  <a key={platform} href={data.url} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-lg transition-colors ${themeMode === 'dark' ? 'text-white/50 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'}`}>
                    {platform === 'discord' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>}
                    {platform === 'twitter' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>}
                    {platform === 'youtube' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>}
                    {platform === 'github' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>}
                  </a>
                );
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto relative z-10 flex flex-col">
        {/* Top Header */}
        <header className={`h-20 flex items-center justify-between px-8 backdrop-blur-md border-b sticky top-0 z-30 ${themeMode === 'dark' ? 'bg-black/20 border-white/10' : 'bg-white/20 border-white/30 shadow-sm'}`}>
          <div className="flex items-center lg:pl-0 pl-12">
            <h2 className="text-xl font-semibold">{activeTab === 'ServerView' ? 'Survival SMP' : activeTab}</h2>
          </div>
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button 
              onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-full transition-colors ${themeMode === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-slate-800'}`}
            >
              {themeMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`flex items-center gap-2 p-1 pr-3 rounded-full transition-colors border ${themeMode === 'dark' ? 'bg-white/10 hover:bg-white/20 border-white/10 text-white' : 'bg-white/40 hover:bg-white/60 border-white/40 text-slate-800 shadow-sm'}`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-inner" />
                <span className="text-sm font-medium">{isAdmin ? 'Admin' : 'User'}</span>
                <ChevronDown size={16} />
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 mt-2 w-56 backdrop-blur-xl border rounded-2xl shadow-2xl overflow-hidden z-50 ${themeMode === 'dark' ? 'bg-black/80 border-white/10 text-white' : 'bg-white/90 border-white/40 text-slate-800'}`}
                  >
                    <div className="p-4 border-b border-white/10">
                      <p className="font-semibold">{isAdmin ? 'Administrator' : 'Standard User'}</p>
                      <p className={`text-xs ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>{isAdmin ? 'admin' : 'user'}@skahost.com</p>
                    </div>
                    <div className="p-2">
                      <DropdownItem icon={<User size={16} />} label="My Account" themeMode={themeMode} />
                      <DropdownItem icon={<Key size={16} />} label="API Credentials" themeMode={themeMode} />
                      <div className="h-px bg-white/10 my-2 mx-2" />
                      <div onClick={() => {
                        setIsAdmin(!isAdmin);
                        setUserDropdownOpen(false);
                        if (isAdmin && activeTab === 'Settings') setActiveTab('Servers');
                      }}>
                        <DropdownItem icon={<ShieldAlert size={16} />} label={`Switch to ${isAdmin ? 'User' : 'Admin'}`} themeMode={themeMode} />
                      </div>
                      <div onClick={() => setAuthState('login')}>
                        <DropdownItem icon={<LogOut size={16} />} label="Logout" themeMode={themeMode} danger />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 flex-1 space-y-8">
          
          {activeTab === 'Dashboard' && (
            <>
              <div className="space-y-6 mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Welcome back, Admin!</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  <div className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${themeMode === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                        <Server size={24} />
                      </div>
                    </div>
                    <h3 className={`text-sm font-semibold mb-1 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>Total Servers</h3>
                    <p className="text-3xl font-bold">4</p>
                  </div>
                  
                  <div className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${themeMode === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                        <Cpu size={24} />
                      </div>
                    </div>
                    <h3 className={`text-sm font-semibold mb-1 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>Total CPU Usage</h3>
                    <p className="text-3xl font-bold">146%</p>
                  </div>

                  <div className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${themeMode === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
                        <Database size={24} />
                      </div>
                    </div>
                    <h3 className={`text-sm font-semibold mb-1 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>Total RAM Usage</h3>
                    <p className="text-3xl font-bold">7.7 GB</p>
                  </div>

                  <div className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-xl ${themeMode === 'dark' ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
                        <LifeBuoy size={24} />
                      </div>
                    </div>
                    <h3 className={`text-sm font-semibold mb-1 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>Active Tickets</h3>
                    <p className="text-3xl font-bold">1</p>
                  </div>
                </div>
              </div>

              {isAdmin && (
                <div className={`backdrop-blur-lg border rounded-2xl p-8 shadow-xl max-w-4xl ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                  <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <Settings size={24} className="text-blue-500" />
                    Settings
                  </h3>
                  
                  <form onSubmit={handleSaveSettings} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Panel Identity */}
                      <div className="space-y-6">
                        <h4 className={`text-lg font-medium border-b pb-2 ${themeMode === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>Panel Identity</h4>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                            Panel Name
                          </label>
                          <input 
                            type="text" 
                            value={panelNameInput}
                            onChange={(e) => setPanelNameInput(e.target.value)}
                            className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white placeholder-white/50' : 'bg-white/50 border-white/40 text-slate-900 placeholder-slate-500'}`}
                            placeholder="Enter Panel Name"
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                            Panel Icon (URL or Upload)
                          </label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={panelIconInput}
                              onChange={(e) => setPanelIconInput(e.target.value)}
                              className={`flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white placeholder-white/50' : 'bg-white/50 border-white/40 text-slate-900 placeholder-slate-500'}`}
                              placeholder="https://example.com/icon.png"
                            />
                            <button type="button" onClick={() => handleFileUpload(setPanelIconInput)} className={`px-4 py-2 rounded-xl border transition-colors ${themeMode === 'dark' ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                              Upload
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                            Panel Background Image (URL or Upload)
                          </label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              value={customWallpaperInput}
                              onChange={(e) => setCustomWallpaperInput(e.target.value)}
                              className={`flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white placeholder-white/50' : 'bg-white/50 border-white/40 text-slate-900 placeholder-slate-500'}`}
                              placeholder="https://example.com/bg.jpg"
                            />
                            <button type="button" onClick={() => handleFileUpload(setCustomWallpaperInput)} className={`px-4 py-2 rounded-xl border transition-colors ${themeMode === 'dark' ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                              Upload
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="space-y-6">
                        <h4 className={`text-lg font-medium border-b pb-2 ${themeMode === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>Social Media Links</h4>
                        {Object.entries(socialLinksInput).map(([platform, data]: [string, any]) => (
                          <div key={platform}>
                            <div className="flex items-center justify-between mb-2">
                              <label className={`block text-sm font-medium capitalize ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                                {platform}
                              </label>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  className="sr-only peer" 
                                  checked={data.enabled}
                                  onChange={(e) => setSocialLinksInput(prev => ({ ...prev, [platform]: { ...prev[platform as keyof typeof socialLinksInput], enabled: e.target.checked } }))}
                                />
                                <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                              </label>
                            </div>
                            <input 
                              type="url" 
                              value={data.url}
                              disabled={!data.enabled}
                              onChange={(e) => setSocialLinksInput(prev => ({ ...prev, [platform]: { ...prev[platform as keyof typeof socialLinksInput], url: e.target.value } }))}
                              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${!data.enabled ? 'opacity-50 cursor-not-allowed' : ''} ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white placeholder-white/50' : 'bg-white/50 border-white/40 text-slate-900 placeholder-slate-500'}`}
                              placeholder={`https://${platform}.com/`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Billing & Payment Setup */}
                    <div className="space-y-6 mt-8">
                      <h4 className={`text-lg font-medium border-b pb-2 ${themeMode === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>Billing & Payment Setup</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                              Currency
                            </label>
                            <select 
                              value={billingSettingsInput.currency}
                              onChange={(e) => setBillingSettingsInput(prev => ({ ...prev, currency: e.target.value }))}
                              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white' : 'bg-white/50 border-white/40 text-slate-900'}`}
                            >
                              <option value="USD">USD ($)</option>
                              <option value="EUR">EUR (€)</option>
                              <option value="GBP">GBP (£)</option>
                              <option value="INR">INR (₹)</option>
                            </select>
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                              Tax Rate (%)
                            </label>
                            <input 
                              type="number" 
                              value={billingSettingsInput.taxRate}
                              onChange={(e) => setBillingSettingsInput(prev => ({ ...prev, taxRate: e.target.value }))}
                              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white placeholder-white/50' : 'bg-white/50 border-white/40 text-slate-900 placeholder-slate-500'}`}
                              placeholder="e.g., 20"
                            />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                              PayPal Client ID
                            </label>
                            <input 
                              type="text" 
                              value={billingSettingsInput.paypalClientId}
                              onChange={(e) => setBillingSettingsInput(prev => ({ ...prev, paypalClientId: e.target.value }))}
                              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white placeholder-white/50' : 'bg-white/50 border-white/40 text-slate-900 placeholder-slate-500'}`}
                              placeholder="Enter PayPal Client ID"
                            />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                              Stripe Publishable Key
                            </label>
                            <input 
                              type="text" 
                              value={billingSettingsInput.stripePublicKey}
                              onChange={(e) => setBillingSettingsInput(prev => ({ ...prev, stripePublicKey: e.target.value }))}
                              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white placeholder-white/50' : 'bg-white/50 border-white/40 text-slate-900 placeholder-slate-500'}`}
                              placeholder="pk_test_..."
                            />
                          </div>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                              Stripe Secret Key
                            </label>
                            <input 
                              type="password" 
                              value={billingSettingsInput.stripeSecretKey}
                              onChange={(e) => setBillingSettingsInput(prev => ({ ...prev, stripeSecretKey: e.target.value }))}
                              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white placeholder-white/50' : 'bg-white/50 border-white/40 text-slate-900 placeholder-slate-500'}`}
                              placeholder="sk_test_..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Auto Suspend Settings */}
                    <div className="space-y-6 mt-8">
                      <h4 className={`text-lg font-medium border-b pb-2 ${themeMode === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>Auto Suspend Settings</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <label className={`flex items-center gap-3 cursor-pointer ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            <div className="relative">
                              <input 
                                type="checkbox" 
                                className="sr-only"
                                checked={autoSuspendInput.enabled}
                                onChange={(e) => setAutoSuspendInput(prev => ({ ...prev, enabled: e.target.checked }))}
                              />
                              <div className={`block w-14 h-8 rounded-full transition-colors ${autoSuspendInput.enabled ? 'bg-blue-500' : (themeMode === 'dark' ? 'bg-white/20' : 'bg-slate-300')}`}></div>
                              <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${autoSuspendInput.enabled ? 'transform translate-x-6' : ''}`}></div>
                            </div>
                            <span className="font-medium">Enable Auto Suspend</span>
                          </label>
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                              Suspend after (days overdue)
                            </label>
                            <input 
                              type="number" 
                              value={autoSuspendInput.days}
                              onChange={(e) => setAutoSuspendInput(prev => ({ ...prev, days: parseInt(e.target.value) || 0 }))}
                              disabled={!autoSuspendInput.enabled}
                              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${!autoSuspendInput.enabled ? 'opacity-50 cursor-not-allowed' : ''} ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white placeholder-white/50' : 'bg-white/50 border-white/40 text-slate-900 placeholder-slate-500'}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Store Plans Settings */}
                    <div className="space-y-6 mt-8">
                      <h4 className={`text-lg font-medium border-b pb-2 ${themeMode === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>Store Plans Configuration</h4>
                      <div className="space-y-4">
                        {storePlansInput.map((plan, index) => (
                          <div key={index} className={`p-4 rounded-xl border ${themeMode === 'dark' ? 'bg-black/20 border-white/10' : 'bg-white/50 border-white/40'}`}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                              <div>
                                <label className={`block text-xs font-medium mb-1 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>Plan Name</label>
                                <input 
                                  type="text" 
                                  value={plan.name}
                                  onChange={(e) => {
                                    const newPlans = [...storePlansInput];
                                    newPlans[index].name = e.target.value;
                                    setStorePlansInput(newPlans);
                                  }}
                                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                                />
                              </div>
                              <div>
                                <label className={`block text-xs font-medium mb-1 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>RAM</label>
                                <input 
                                  type="text" 
                                  value={plan.ram}
                                  onChange={(e) => {
                                    const newPlans = [...storePlansInput];
                                    newPlans[index].ram = e.target.value;
                                    setStorePlansInput(newPlans);
                                  }}
                                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                                />
                              </div>
                              <div>
                                <label className={`block text-xs font-medium mb-1 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>CPU</label>
                                <input 
                                  type="text" 
                                  value={plan.cpu}
                                  onChange={(e) => {
                                    const newPlans = [...storePlansInput];
                                    newPlans[index].cpu = e.target.value;
                                    setStorePlansInput(newPlans);
                                  }}
                                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                                />
                              </div>
                              <div>
                                <label className={`block text-xs font-medium mb-1 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>Storage</label>
                                <input 
                                  type="text" 
                                  value={plan.disk}
                                  onChange={(e) => {
                                    const newPlans = [...storePlansInput];
                                    newPlans[index].disk = e.target.value;
                                    setStorePlansInput(newPlans);
                                  }}
                                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                                />
                              </div>
                              <div>
                                <label className={`block text-xs font-medium mb-1 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>Price</label>
                                <input 
                                  type="text" 
                                  value={plan.price}
                                  onChange={(e) => {
                                    const newPlans = [...storePlansInput];
                                    newPlans[index].price = e.target.value;
                                    setStorePlansInput(newPlans);
                                  }}
                                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`pt-6 border-t ${themeMode === 'dark' ? 'border-white/10' : 'border-white/30'} flex gap-4`}>
                      <button 
                        type="submit"
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-500/30 transition-colors"
                      >
                        <Save size={20} />
                        Save Settings
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => { e.preventDefault(); handleWallpaperChange(e as any); }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors border ${themeMode === 'dark' ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-900'}`}
                      >
                        <ImageIcon size={20} />
                        Apply Background
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}

          {activeTab === 'Servers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <ServerCard name="Survival SMP" status="Online" cpu="45%" ram="4.2 GB" node="Node-01" onClick={() => { setActiveTab('ServerView'); setActiveServerTab('Console'); }} themeMode={themeMode} icon={serverCustomization['Survival SMP']?.icon} bg={serverCustomization['Survival SMP']?.bg} />
              <ServerCard name="Lobby" status="Online" cpu="12%" ram="1.1 GB" node="Node-01" onClick={() => { setActiveTab('ServerView'); setActiveServerTab('Console'); }} themeMode={themeMode} icon={serverCustomization['Lobby']?.icon} bg={serverCustomization['Lobby']?.bg} />
              <ServerCard name="Bedwars-1" status="Starting" cpu="89%" ram="2.4 GB" node="Node-02" onClick={() => { setActiveTab('ServerView'); setActiveServerTab('Console'); }} themeMode={themeMode} icon={serverCustomization['Bedwars-1']?.icon} bg={serverCustomization['Bedwars-1']?.bg} />
              <ServerCard name="Development" status="Offline" cpu="0%" ram="0 GB" node="Node-03" onClick={() => { setActiveTab('ServerView'); setActiveServerTab('Console'); }} themeMode={themeMode} icon={serverCustomization['Development']?.icon} bg={serverCustomization['Development']?.bg} />
            </div>
          )}

          {activeTab === 'Store & Billing' && (
            <div className="space-y-8">
              {/* Billing Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-2"><CreditCard size={24} className="text-blue-500"/> Billing Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl ${themeMode === 'dark' ? 'bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-white/20' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'}`}>
                    <h3 className={`text-sm font-semibold mb-2 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>Account Balance</h3>
                    <p className="text-4xl font-bold mb-4">{billingSettings.currency === 'USD' ? '$' : billingSettings.currency === 'EUR' ? '€' : billingSettings.currency === 'GBP' ? '£' : '₹'}24.50</p>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/30">Add Funds</button>
                  </div>
                  <div className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                    <h3 className={`text-sm font-semibold mb-2 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>Active Services</h3>
                    <p className="text-4xl font-bold mb-4">4</p>
                    <button onClick={() => document.getElementById('store-section')?.scrollIntoView({ behavior: 'smooth' })} className={`w-full py-2.5 rounded-xl font-medium transition-colors border ${themeMode === 'dark' ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-white hover:bg-slate-50 border-slate-200'}`}>Order New Service</button>
                  </div>
                  <div className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                    <h3 className={`text-sm font-semibold mb-2 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>Unpaid Invoices</h3>
                    <p className="text-4xl font-bold mb-4 text-red-500">1</p>
                    <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-red-500/30">Pay Now ({billingSettings.currency === 'USD' ? '$' : billingSettings.currency === 'EUR' ? '€' : billingSettings.currency === 'GBP' ? '£' : '₹'}12.00)</button>
                  </div>
                </div>

                <div className={`backdrop-blur-lg border rounded-2xl shadow-xl overflow-hidden ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                  <div className={`px-6 py-4 border-b flex justify-between items-center ${themeMode === 'dark' ? 'border-white/10' : 'border-white/30'}`}>
                    <h3 className="text-lg font-bold flex items-center gap-2"><Receipt size={20} className="text-blue-500"/> Recent Invoices</h3>
                  </div>
                  <div className="divide-y divide-white/10">
                    {[
                      { id: '#INV-0042', date: 'Mar 25, 2026', amount: '12.00', status: 'Unpaid' },
                      { id: '#INV-0041', date: 'Feb 25, 2026', amount: '12.00', status: 'Paid' },
                      { id: '#INV-0040', date: 'Jan 25, 2026', amount: '12.00', status: 'Paid' },
                    ].map(inv => (
                      <div key={inv.id} className={`px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors ${themeMode === 'dark' ? '' : 'hover:bg-white/50'}`}>
                        <div>
                          <p className="font-bold">{inv.id}</p>
                          <p className={`text-sm ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>{inv.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-mono font-medium">{billingSettings.currency === 'USD' ? '$' : billingSettings.currency === 'EUR' ? '€' : billingSettings.currency === 'GBP' ? '£' : '₹'}{inv.amount}</span>
                          <span className={`text-xs px-2 py-1 rounded-md font-medium ${inv.status === 'Paid' ? (themeMode === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600') : (themeMode === 'dark' ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600')}`}>
                            {inv.status}
                          </span>
                          <button className={`p-2 rounded-lg transition-colors ${themeMode === 'dark' ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}>
                            <Download size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Store Section */}
              <div id="store-section" className="space-y-6 pt-8 border-t border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2"><ShoppingCart size={24} className="text-blue-500"/> Server Store</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {storePlans.map(plan => (
                    <div key={plan.name} className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'} ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
                      {plan.popular && <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Most Popular</div>}
                      <h4 className="text-xl font-bold mb-1">{plan.name}</h4>
                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-3xl font-bold">{billingSettings.currency === 'USD' ? '$' : billingSettings.currency === 'EUR' ? '€' : billingSettings.currency === 'GBP' ? '£' : '₹'}{plan.price}</span>
                        <span className={`text-sm ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>/mo</span>
                      </div>
                      <div className="space-y-3 mb-8 flex-1">
                        <div className="flex justify-between items-center border-b pb-2 border-white/10">
                          <span className={themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}>RAM</span>
                          <span className="font-medium">{plan.ram}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2 border-white/10">
                          <span className={themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}>CPU</span>
                          <span className="font-medium">{plan.cpu}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2 border-white/10">
                          <span className={themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}>Storage</span>
                          <span className="font-medium">{plan.disk}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2 border-white/10">
                          <span className={themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}>Databases</span>
                          <span className="font-medium">Unlimited</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2 border-white/10">
                          <span className={themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}>Backups</span>
                          <span className="font-medium">3 Slots</span>
                        </div>
                      </div>
                      <button className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg ${plan.popular ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/30' : (themeMode === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-white hover:bg-slate-50 text-slate-900 shadow-slate-200/50')}`}>
                        Order Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}



          {activeTab === 'Support' && (
            <div className={`backdrop-blur-lg border rounded-2xl shadow-xl overflow-hidden ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
              <div className={`px-6 py-4 border-b flex justify-between items-center ${themeMode === 'dark' ? 'border-white/10' : 'border-white/30'}`}>
                <h3 className="text-lg font-bold flex items-center gap-2"><LifeBuoy size={20} className="text-blue-500"/> Support Tickets</h3>
                <div className="flex gap-2">
                  {isAdmin && (
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border ${themeMode === 'dark' ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-900'}`}>
                      <Settings size={16} /> Manage Tickets
                    </button>
                  )}
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                    <Ticket size={16} /> New Ticket
                  </button>
                </div>
              </div>
              <div className="divide-y divide-white/10">
                {[
                  { id: '#TKT-1024', subject: 'Server crashing on startup', status: 'Open', updated: '2 hours ago' },
                  { id: '#TKT-1018', subject: 'How to install Modpacks?', status: 'Closed', updated: '3 days ago' },
                ].map(ticket => (
                  <div key={ticket.id} className={`px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer ${themeMode === 'dark' ? '' : 'hover:bg-white/50'}`}>
                    <div>
                      <p className="font-bold">{ticket.subject}</p>
                      <p className={`text-sm mt-1 ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>{ticket.id} • Last updated {ticket.updated}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${ticket.status === 'Open' ? (themeMode === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600') : (themeMode === 'dark' ? 'bg-white/10 text-white/50' : 'bg-slate-200 text-slate-500')}`}>
                      {ticket.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ServerView' && (
            <div className="space-y-6">
              {/* Back Button */}
              <button 
                onClick={() => setActiveTab('Servers')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${themeMode === 'dark' ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <ChevronDown className="rotate-90" size={16} /> Back to Servers
              </button>

              {/* Server Header & Power Controls */}
              <div className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl flex flex-wrap gap-4 items-center justify-between relative overflow-hidden ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                {serverCustomization['Survival SMP']?.bg && <div className="absolute inset-0 opacity-20 bg-cover bg-center -z-10" style={{ backgroundImage: `url(${serverCustomization['Survival SMP'].bg})` }} />}
                <div className="flex items-center gap-4 relative z-10">
                  {serverCustomization['Survival SMP']?.icon ? (
                    <img src={serverCustomization['Survival SMP'].icon} alt="Survival SMP" className="w-12 h-12 rounded-xl object-cover shadow-lg" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
                  )}
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      Survival SMP 
                      {serverCustomization['Survival SMP']?.icon && <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <p className={`text-sm font-mono transition-all duration-300 ${themeMode === 'dark' ? 'text-white/60' : 'text-slate-500'} ${ipBlurred ? 'blur-md select-none opacity-50' : ''}`}>
                        Node-01 • 192.168.1.100:25565
                      </p>
                      <button 
                        onClick={() => setIpBlurred(!ipBlurred)}
                        className={`p-1.5 rounded-md transition-colors ${themeMode === 'dark' ? 'hover:bg-white/10 text-white/50 hover:text-white' : 'hover:bg-black/5 text-slate-400 hover:text-slate-700'}`}
                        title={ipBlurred ? "Reveal IP" : "Hide IP"}
                      >
                        {ipBlurred ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition-colors shadow-lg shadow-emerald-500/20">
                    <Play size={18} /> Start
                  </button>
                  <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-colors shadow-lg shadow-blue-500/20">
                    <RotateCcw size={18} /> Restart
                  </button>
                  <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-colors shadow-lg shadow-red-500/20">
                    <Square size={18} /> Stop
                  </button>
                </div>
              </div>

              {/* Tab Content Area with Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeServerTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
              {/* Console View */}
              {activeServerTab === 'Console' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Terminal */}
                  <div className={`lg:col-span-2 backdrop-blur-xl border rounded-2xl p-4 font-mono text-sm shadow-2xl h-[400px] overflow-y-auto flex flex-col ${themeMode === 'dark' ? 'bg-black/60 border-white/10' : 'bg-slate-900/90 border-slate-700 text-white'}`}>
                    <div className="flex-1 overflow-y-auto space-y-1">
                      <div className="text-white/50">SKA HOST Console Instance initialized...</div>
                      <div className="text-emerald-400">[10:24:01 INFO]: Starting minecraft server version 1.20.4</div>
                      <div className="text-emerald-400">[10:24:01 INFO]: Loading properties</div>
                      <div className="text-emerald-400">[10:24:01 INFO]: Default game type: SURVIVAL</div>
                      <div className="text-emerald-400">[10:24:01 INFO]: Generating keypair</div>
                      <div className="text-emerald-400">[10:24:02 INFO]: Starting Minecraft server on *:25565</div>
                      <div className="text-emerald-400">[10:24:02 INFO]: Using default channel type</div>
                      <div className="text-emerald-400">[10:24:04 INFO]: Preparing level "world"</div>
                      <div className="text-emerald-400">[10:24:05 INFO]: Preparing start region for dimension minecraft:overworld</div>
                      <div className="text-emerald-400">[10:24:07 INFO]: Time elapsed: 2456 ms</div>
                      <div className="text-emerald-400">[10:24:07 INFO]: Done (6.123s)! For help, type "help"</div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-white/50">
                      <span>$</span>
                      <input type="text" className="bg-transparent border-none outline-none flex-1 text-white" placeholder="Type a command..." />
                    </div>
                  </div>

                  {/* Graphs */}
                  <div className="space-y-6">
                    <div className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl h-[188px] flex flex-col ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                      <h3 className={`text-sm font-semibold mb-2 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>CPU Usage</h3>
                      <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={stats.cpu}>
                            <defs>
                              <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCpu)" isAnimationActive={false} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl h-[188px] flex flex-col ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                      <h3 className={`text-sm font-semibold mb-2 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>Memory Usage</h3>
                      <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={stats.ram}>
                            <defs>
                              <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="ram" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRam)" isAnimationActive={false} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* File Manager Mock */}
              {activeServerTab === 'File Manager' && (
                <div className={`backdrop-blur-lg border rounded-2xl shadow-xl overflow-hidden ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                  <div className={`px-6 py-4 border-b flex justify-between items-center ${themeMode === 'dark' ? 'border-white/10' : 'border-white/30'}`}>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span className="text-blue-400">/home/container</span>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      New File
                    </button>
                  </div>
                  <div className="divide-y divide-white/10">
                    {['world', 'plugins', 'config', 'logs'].map(folder => (
                      <div key={folder} className={`px-6 py-3 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer ${themeMode === 'dark' ? '' : 'hover:bg-white/50'}`}>
                        <div className="flex items-center gap-3">
                          <Folder size={20} className="text-blue-400" />
                          <span className="font-medium">{folder}</span>
                        </div>
                        <span className={`text-sm ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>Directory</span>
                      </div>
                    ))}
                    {['server.properties', 'eula.txt', 'spigot.yml'].map(file => (
                      <div key={file} className={`px-6 py-3 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer ${themeMode === 'dark' ? '' : 'hover:bg-white/50'}`}>
                        <div className="flex items-center gap-3">
                          <TerminalIcon size={20} className="text-slate-400" />
                          <span className="font-medium">{file}</span>
                        </div>
                        <span className={`text-sm ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>2 KB</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subdomains */}
              {activeServerTab === 'Subdomains' && (
                <div className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2"><Globe size={20} className="text-blue-500"/> Cloudflare Subdomain Manager</h3>
                    <span className={`text-xs px-2 py-1 rounded-md font-medium ${themeMode === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>API Connected</span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 flex">
                      <input type="text" placeholder="myserver" className={`flex-1 border border-r-0 rounded-l-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white' : 'bg-white/50 border-white/40 text-slate-900'}`} />
                      <div className={`px-4 py-3 border rounded-r-xl flex items-center font-medium ${themeMode === 'dark' ? 'bg-white/5 border-white/10 text-white/70' : 'bg-slate-100 border-white/40 text-slate-600'}`}>.skahost.com</div>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-blue-500/30 transition-colors flex items-center justify-center gap-2">
                      <Globe size={18} /> Create Record
                    </button>
                  </div>
                  
                  <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>Active Subdomains</h4>
                  <div className="space-y-3">
                    <div className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-colors ${themeMode === 'dark' ? 'bg-black/20 border-white/10 hover:bg-white/5' : 'bg-white/50 border-white/30 hover:bg-white/80'}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">
                          <Globe size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-lg">play.skahost.com</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`w-2 h-2 rounded-full bg-emerald-500`} />
                            <p className={`text-xs font-mono ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>SRV Record • Points to 192.168.1.100:25565</p>
                          </div>
                        </div>
                      </div>
                      <button className="text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-colors font-medium text-sm border border-transparent hover:border-red-500/30">Delete Record</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Version Changer */}
              {activeServerTab === 'Version Changer' && (
                <div className={`p-6 rounded-2xl border backdrop-blur-md ${themeMode === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/40 border-white/40 shadow-xl'}`}>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Layers className="text-blue-400" /> Version Changer
                  </h3>
                  <p className={`mb-6 ${themeMode === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
                    Change the version of your server software. This may require a server restart and could affect compatibility with existing plugins or mods.
                  </p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['1.20.4', '1.20.2', '1.19.4', '1.18.2', '1.16.5', '1.12.2'].map(version => (
                        <button key={version} className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${themeMode === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:border-blue-500'}`}>
                          <span className="font-medium">{version}</span>
                          <Download size={16} className={themeMode === 'dark' ? 'text-white/40' : 'text-slate-400'} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Egg Changer */}
              {activeServerTab === 'Egg Changer' && (
                <div className={`p-6 rounded-2xl border backdrop-blur-md ${themeMode === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/40 border-white/40 shadow-xl'}`}>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Box className="text-purple-400" /> Egg Changer
                  </h3>
                  <p className={`mb-6 ${themeMode === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>
                    Change the core server software (Egg). Warning: This will reinstall your server and may delete existing files if not backed up.
                  </p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: 'Paper', desc: 'High performance Minecraft server' },
                        { name: 'Vanilla', desc: 'Standard Minecraft server' },
                        { name: 'Forge', desc: 'Modded Minecraft server' },
                        { name: 'Fabric', desc: 'Lightweight modded server' }
                      ].map(egg => (
                        <div key={egg.name} className={`p-4 rounded-xl border flex flex-col gap-2 transition-colors ${themeMode === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:border-purple-500'}`}>
                          <div className="flex items-center justify-between">
                            <span className="font-bold">{egg.name}</span>
                            <button className="px-3 py-1 rounded-lg bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 transition-colors">Install</button>
                          </div>
                          <span className={`text-sm ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>{egg.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Plugin/Mod Installer */}
              {(activeServerTab === 'Plugins' || activeServerTab === 'Mods') && (
                <div className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                  <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 whitespace-nowrap">
                      {activeServerTab === 'Plugins' ? <Puzzle size={20} className="text-purple-500"/> : <Box size={20} className="text-orange-500"/>} 
                      {activeServerTab} Browser + Auto-Compiler
                    </h3>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full xl:w-auto">
                      <div className={`flex items-center gap-1 p-1 rounded-xl border w-full sm:w-auto overflow-x-auto scrollbar-hide ${themeMode === 'dark' ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                        {['Modrinth', 'CurseForge', ...(activeServerTab === 'Plugins' ? ['SpigotMC'] : [])].map(source => (
                          <button 
                            key={source}
                            onClick={() => setModSource(source)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-1 sm:flex-none ${modSource === source ? (themeMode === 'dark' ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-slate-800 shadow-sm') : (themeMode === 'dark' ? 'text-white/50 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-800 hover:bg-white/50')}`}
                          >
                            {source}
                          </button>
                        ))}
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border w-full sm:w-auto ${themeMode === 'dark' ? 'bg-black/20 border-white/10' : 'bg-white/50 border-white/30'}`}>
                        <Search size={16} className={themeMode === 'dark' ? 'text-white/50' : 'text-slate-400'} />
                        <input type="text" placeholder={`Search on ${modSource}...`} className="bg-transparent border-none outline-none text-sm w-full sm:w-48" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {[
                      { name: 'EssentialsX', desc: 'The essential plugin for Spigot servers.', dl: '5.2M', author: 'EssentialsXTeam' },
                      { name: 'WorldEdit', desc: 'In-game voxel map editor.', dl: '12.1M', author: 'sk89q' },
                      { name: 'Vault', desc: 'Permissions, Chat, & Economy API.', dl: '8.4M', author: 'Kilkari' },
                      { name: 'LuckPerms', desc: 'An advanced permissions plugin.', dl: '4.9M', author: 'Luck' },
                      { name: 'ClearLag', desc: 'Clears lag from your server.', dl: '3.1M', author: 'bob7l' },
                      { name: 'Multiverse-Core', desc: 'World management plugin.', dl: '6.7M', author: 'Multiverse' }
                    ].map(item => (
                      <div key={item.name} className={`p-4 rounded-xl border flex flex-col gap-3 ${themeMode === 'dark' ? 'bg-black/20 border-white/10' : 'bg-white/50 border-white/30'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold">{item.name}</p>
                            <p className={`text-xs mt-1 line-clamp-1 ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>{item.desc}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                                modSource === 'Modrinth' ? (themeMode === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700') :
                                modSource === 'CurseForge' ? (themeMode === 'dark' ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-700') :
                                (themeMode === 'dark' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700')
                              }`}>
                                {modSource}
                              </span>
                              <span className={`text-[10px] ${themeMode === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>By {item.author}</span>
                            </div>
                          </div>
                          <div className="w-10 h-10 shrink-0 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                            {activeServerTab === 'Plugins' ? <Puzzle size={20} className="text-blue-400"/> : <Box size={20} className="text-orange-400"/>}
                          </div>
                        </div>
                        <button 
                          onClick={() => handleInstall(item.name)}
                          disabled={installingItem === item.name || installedItems.includes(item.name)}
                          className={`w-full mt-auto flex items-center justify-center gap-2 border py-2 rounded-lg transition-all text-sm font-medium ${
                            installedItems.includes(item.name)
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/50 cursor-default'
                              : installingItem === item.name 
                                ? 'bg-blue-500 text-white border-blue-500 opacity-80 cursor-not-allowed'
                                : 'bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white border-blue-500/50'
                          }`}
                        >
                          {installedItems.includes(item.name) ? (
                            <>
                              <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px]">✓</div>
                              Compiled & Installed
                            </>
                          ) : installingItem === item.name ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Compiling to /{activeServerTab.toLowerCase()}...
                            </>
                          ) : (
                            <>
                              <Download size={16} /> Install & Compile
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
                    <ShieldAlert size={20} className="text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-blue-500">Auto-Compiler is Active</p>
                      <p className={`text-sm mt-1 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>All {activeServerTab.toLowerCase()} installed from {modSource} are automatically compiled and injected into your server's /{activeServerTab.toLowerCase()} directory.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Player Manager */}
              {activeServerTab === 'Players' && (
                <div className={`backdrop-blur-lg border rounded-2xl shadow-xl overflow-hidden ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                  <div className={`px-6 py-4 border-b flex justify-between items-center ${themeMode === 'dark' ? 'border-white/10' : 'border-white/30'}`}>
                    <h3 className="text-lg font-bold flex items-center gap-2"><UsersIcon size={20} className="text-emerald-500"/> Player Manager (3/20)</h3>
                  </div>
                  <div className="divide-y divide-white/10">
                    {[
                      { name: 'Notch', ping: '12ms', rank: 'Owner' },
                      { name: 'Jeb_', ping: '24ms', rank: 'Admin' },
                      { name: 'Dinnerbone', ping: '45ms', rank: 'Developer' },
                      { name: 'Steve', ping: '120ms', rank: 'Player' },
                      { name: 'Alex', ping: '85ms', rank: 'Player' }
                    ].map(player => (
                      <div key={player.name} className={`px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors ${themeMode === 'dark' ? '' : 'hover:bg-white/50'}`}>
                        <div className="flex items-center gap-4">
                          <img src={`https://minotar.net/avatar/${player.name}/32`} alt={player.name} className="w-8 h-8 rounded-md" />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold">{player.name}</p>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                player.rank === 'Owner' ? 'bg-red-500/20 text-red-500' :
                                player.rank === 'Admin' ? 'bg-orange-500/20 text-orange-500' :
                                player.rank === 'Developer' ? 'bg-blue-500/20 text-blue-500' :
                                'bg-slate-500/20 text-slate-500'
                              }`}>
                                {player.rank}
                              </span>
                            </div>
                            <p className={`text-xs mt-1 ${themeMode === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>Online • {player.ping}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors">OP</button>
                          <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors">Kick</button>
                          <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors">Ban</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resource Packs & Bedrock Add-ons */}
              {(activeServerTab === 'Resource Packs' || activeServerTab === 'Bedrock Add-ons') && (
                <div className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      {activeServerTab === 'Resource Packs' ? <Package size={20} className="text-pink-500"/> : <Layers size={20} className="text-cyan-500"/>} 
                      {activeServerTab} {activeServerTab === 'Bedrock Add-ons' && '+ Auto-Compiler'}
                    </h3>
                    {activeServerTab === 'Bedrock Add-ons' && (
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border w-full md:w-auto ${themeMode === 'dark' ? 'bg-black/20 border-white/10' : 'bg-white/50 border-white/30'}`}>
                        <Search size={16} className={themeMode === 'dark' ? 'text-white/50' : 'text-slate-400'} />
                        <input type="text" placeholder="Search CurseForge..." className="bg-transparent border-none outline-none text-sm w-full md:w-48" />
                      </div>
                    )}
                  </div>

                  {activeServerTab === 'Bedrock Add-ons' && (
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className={`text-sm font-semibold uppercase tracking-wider ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>CurseForge Browser</h4>
                        <span className={`text-xs px-2 py-1 rounded-md font-medium ${themeMode === 'dark' ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>CurseForge API</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          { name: 'Tinkers Construct Bedrock', desc: 'Brings Tinkers Construct to Bedrock Edition.', dl: '1.2M', author: 'Stratosphere' },
                          { name: 'More Ores Addon', desc: 'Adds 15+ new ores and armors.', dl: '850K', author: 'OresPlus' },
                          { name: 'True Backpacks', desc: 'Fully functional backpacks with UI.', dl: '2.1M', author: 'TrueTeam' }
                        ].map(item => (
                          <div key={item.name} className={`p-4 rounded-xl border flex flex-col gap-3 ${themeMode === 'dark' ? 'bg-black/20 border-white/10' : 'bg-white/50 border-white/30'}`}>
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-bold">{item.name}</p>
                                <p className={`text-xs mt-1 line-clamp-1 ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>{item.desc}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${themeMode === 'dark' ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-200 text-orange-700'}`}>CurseForge</span>
                                  <span className={`text-[10px] ${themeMode === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>By {item.author}</span>
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleCompile(item.name)}
                              disabled={compilingItem === item.name || compiledItems.includes(item.name)}
                              className={`w-full mt-auto flex items-center justify-center gap-2 border py-2 rounded-lg transition-all text-sm font-medium ${
                                compiledItems.includes(item.name)
                                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/50 cursor-default'
                                  : compilingItem === item.name 
                                    ? 'bg-blue-500 text-white border-blue-500 opacity-80 cursor-not-allowed'
                                    : 'bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white border-blue-500/50'
                              }`}
                            >
                              {compiledItems.includes(item.name) ? (
                                <>
                                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px]">✓</div>
                                  Compiled & Installed
                                </>
                              ) : compilingItem === item.name ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  Compiling...
                                </>
                              ) : (
                                <>
                                  <Download size={16} /> Install & Compile
                                </>
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={`border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-4 ${themeMode === 'dark' ? 'border-white/20 bg-black/20' : 'border-slate-300 bg-white/50'}`}>
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                      <Download size={24} />
                    </div>
                    <div>
                      <p className="font-bold">Manual Upload (.zip, .mcpack)</p>
                      <p className={`text-xs mt-1 ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>Drag and drop or click to browse</p>
                    </div>
                  </div>

                  {activeServerTab === 'Bedrock Add-ons' && (
                    <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
                      <ShieldAlert size={20} className="text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-blue-500">Auto-Compiler is Active</p>
                        <p className={`text-sm mt-1 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>All addons installed from CurseForge or uploaded manually are automatically compiled, injected into your server's behavior/resource pack directories, and registered in world_behavior_packs.json.</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>Installed {activeServerTab}</h4>
                    <div className="space-y-3">
                      {[
                        { name: activeServerTab === 'Resource Packs' ? 'Faithful 32x' : 'More Ores Addon', size: '12.4 MB', status: 'Active' },
                        { name: activeServerTab === 'Resource Packs' ? 'Bare Bones' : 'Tinkers Construct Bedrock', size: '4.1 MB', status: 'Inactive' }
                      ].map(pack => (
                        <div key={pack.name} className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-colors ${themeMode === 'dark' ? 'bg-black/20 border-white/10 hover:bg-white/5' : 'bg-white/50 border-white/30 hover:bg-white/80'}`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeServerTab === 'Resource Packs' ? 'bg-pink-500/20 text-pink-500' : 'bg-cyan-500/20 text-cyan-500'}`}>
                              {activeServerTab === 'Resource Packs' ? <Package size={20} /> : <Layers size={20} />}
                            </div>
                            <div>
                              <p className="font-bold">{pack.name}</p>
                              <p className={`text-xs font-mono mt-1 ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>{pack.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                              pack.status === 'Active' 
                                ? themeMode === 'dark' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                                : themeMode === 'dark' ? 'bg-white/10 text-white/50' : 'bg-slate-200 text-slate-500'
                            }`}>
                              {pack.status}
                            </span>
                            <button className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              pack.status === 'Active'
                                ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white'
                                : 'bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white'
                            }`}>
                              {pack.status === 'Active' ? 'Disable' : 'Enable'}
                            </button>
                            <button className="text-red-500 hover:bg-red-500/20 p-1.5 rounded-lg transition-colors">
                              <X size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Server Settings */}
              {activeServerTab === 'Settings' && (
                <div className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                    <Settings size={20} className="text-blue-500"/> Server Customization
                  </h3>
                  <div className="space-y-6 max-w-2xl">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                        Custom Server Icon (URL or Upload)
                      </label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={serverCustomizationInput.icon}
                          onChange={(e) => setServerCustomizationInput(prev => ({ ...prev, icon: e.target.value }))}
                          className={`flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white placeholder-white/50' : 'bg-white/50 border-white/40 text-slate-900 placeholder-slate-500'}`}
                          placeholder="https://example.com/icon.png"
                        />
                        <button type="button" onClick={() => handleFileUpload((val) => setServerCustomizationInput(prev => ({ ...prev, icon: val })))} className={`px-4 py-2 rounded-xl border transition-colors ${themeMode === 'dark' ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                          Upload
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-700'}`}>
                        Custom Server Background Image (URL or Upload)
                      </label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={serverCustomizationInput.bg}
                          onChange={(e) => setServerCustomizationInput(prev => ({ ...prev, bg: e.target.value }))}
                          className={`flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${themeMode === 'dark' ? 'bg-black/20 border-white/10 text-white placeholder-white/50' : 'bg-white/50 border-white/40 text-slate-900 placeholder-slate-500'}`}
                          placeholder="https://example.com/bg.jpg"
                        />
                        <button type="button" onClick={() => handleFileUpload((val) => setServerCustomizationInput(prev => ({ ...prev, bg: val })))} className={`px-4 py-2 rounded-xl border transition-colors ${themeMode === 'dark' ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-white border-slate-200 hover:bg-slate-50'}`}>
                          Upload
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleSaveServerSettings('Survival SMP')}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-500/30 transition-colors w-full md:w-auto"
                    >
                      Save Server Settings
                    </button>
                  </div>
                </div>
              )}
                </motion.div>
              </AnimatePresence>

            </div>
          )}



          {activeTab === 'Users' && isAdmin && (
            <div className={`backdrop-blur-lg border rounded-2xl p-8 shadow-xl max-w-4xl ${themeMode === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold flex items-center gap-2">
                  <User size={24} className="text-blue-500" />
                  User Management
                </h3>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg shadow-blue-500/30 transition-colors flex items-center gap-2">
                  <Plus size={18} /> Create User
                </button>
              </div>
              
              <div className={`border rounded-xl overflow-hidden ${themeMode === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`${themeMode === 'dark' ? 'bg-white/5 border-b border-white/10' : 'bg-slate-50 border-b border-slate-200'}`}>
                      <th className="p-4 font-medium text-sm">ID</th>
                      <th className="p-4 font-medium text-sm">Name</th>
                      <th className="p-4 font-medium text-sm">Email</th>
                      <th className="p-4 font-medium text-sm">Role</th>
                      <th className="p-4 font-medium text-sm text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, name: 'Admin User', email: 'admin@skahost.com', role: 'Administrator' },
                      { id: 2, name: 'Test User', email: 'user@example.com', role: 'Standard' },
                      { id: 3, name: 'John Doe', email: 'john@example.com', role: 'Standard' },
                    ].map((user) => (
                      <tr key={user.id} className={`border-b last:border-0 ${themeMode === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}>
                        <td className="p-4 text-sm">{user.id}</td>
                        <td className="p-4 text-sm font-medium">{user.name}</td>
                        <td className="p-4 text-sm">{user.email}</td>
                        <td className="p-4 text-sm">
                          <span className={`px-2 py-1 rounded-md text-xs font-medium ${user.role === 'Administrator' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-right">
                          <button className="text-blue-500 hover:text-blue-400 mr-3">Edit</button>
                          <button className="text-red-500 hover:text-red-400">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer - STRICTLY HARDCODED */}
        <footer className={`py-6 text-center border-t backdrop-blur-md mt-auto ${themeMode === 'dark' ? 'border-white/10 bg-black/20 text-white/70' : 'border-white/30 bg-white/20 text-slate-600'}`}>
          <p className="text-sm font-medium tracking-widest uppercase">
            By SKA HOST
          </p>
        </footer>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick, themeMode }: { key?: string | number, icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void, themeMode: 'dark' | 'light' }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        active 
          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
          : themeMode === 'dark'
            ? 'text-white/70 hover:bg-white/10 hover:text-white'
            : 'text-slate-600 hover:bg-white/40 hover:text-slate-900'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function DropdownItem({ icon, label, danger = false, themeMode }: { icon: React.ReactNode, label: string, danger?: boolean, themeMode: 'dark' | 'light' }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      danger 
        ? themeMode === 'dark' ? 'text-red-400 hover:bg-red-500/20' : 'text-red-600 hover:bg-red-50'
        : themeMode === 'dark' ? 'text-white/70 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`}>
      {icon}
      {label}
    </button>
  );
}

function StatCard({ title, value, trend, alert = false, themeMode }: { title: string, value: string, trend: string, alert?: boolean, themeMode: 'dark' | 'light' }) {
  return (
    <div className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl relative overflow-hidden group transition-all ${themeMode === 'dark' ? 'bg-white/10 border-white/20 hover:bg-white/15' : 'bg-white/40 border-white/40 hover:bg-white/50'}`}>
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 ${themeMode === 'dark' ? 'bg-white/5' : 'bg-white/40'}`} />
      <h4 className={`font-medium mb-2 relative z-10 ${themeMode === 'dark' ? 'text-white/70' : 'text-slate-600'}`}>{title}</h4>
      <p className="text-3xl font-bold mb-2 relative z-10">{value}</p>
      <p className={`text-sm font-medium relative z-10 ${alert ? 'text-red-500' : 'text-emerald-500'}`}>
        {trend}
      </p>
    </div>
  );
}

function ServerCard({ name, status, cpu, ram, node, onClick, themeMode, icon, bg }: { name: string, status: 'Online' | 'Offline' | 'Starting', cpu: string, ram: string, node: string, onClick?: () => void, themeMode: 'dark' | 'light', icon?: string, bg?: string }) {
  const statusColors = {
    Online: 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
    Offline: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]',
    Starting: 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)] animate-pulse'
  };

  return (
    <div onClick={onClick} className={`backdrop-blur-lg border rounded-2xl p-6 shadow-xl transition-all cursor-pointer group relative overflow-hidden ${themeMode === 'dark' ? 'bg-white/10 border-white/20 hover:bg-white/15' : 'bg-white/40 border-white/40 hover:bg-white/50'}`}>
      {bg && <div className="absolute inset-0 opacity-20 bg-cover bg-center -z-20" style={{ backgroundImage: `url(${bg})` }} />}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-3">
          {icon ? (
            <img src={icon} alt={name} className="w-10 h-10 rounded-lg object-cover shadow-sm" />
          ) : (
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${themeMode === 'dark' ? 'bg-white/10 text-white/50' : 'bg-black/5 text-slate-500'}`}>
              <Server size={20} />
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors">{name}</h3>
            <p className={`text-sm flex items-center gap-1 ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}>
              <Network size={14} /> {node}
            </p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full border flex items-center gap-2 ${themeMode === 'dark' ? 'bg-black/20 border-white/10' : 'bg-white/50 border-white/30 shadow-sm'}`}>
          <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
          <span className={`text-xs font-medium ${themeMode === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>{status}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6 mb-6 relative z-10">
        <div className={`rounded-xl p-3 border ${themeMode === 'dark' ? 'bg-black/20 border-white/5' : 'bg-white/50 border-white/30 shadow-sm'}`}>
          <p className={`text-xs mb-1 flex items-center gap-1 ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}><Cpu size={14}/> CPU Usage</p>
          <p className="font-mono font-medium">{cpu}</p>
        </div>
        <div className={`rounded-xl p-3 border ${themeMode === 'dark' ? 'bg-black/20 border-white/5' : 'bg-white/50 border-white/30 shadow-sm'}`}>
          <p className={`text-xs mb-1 flex items-center gap-1 ${themeMode === 'dark' ? 'text-white/50' : 'text-slate-500'}`}><Database size={14}/> Memory</p>
          <p className="font-mono font-medium">{ram}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`flex items-center gap-2 pt-4 border-t ${themeMode === 'dark' ? 'border-white/10' : 'border-slate-200/50'}`}>
        <button className="flex-1 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white border border-emerald-500/30 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium" onClick={(e) => e.stopPropagation()}>
          <Play size={14} /> Start
        </button>
        <button className="flex-1 bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500/30 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium" onClick={(e) => e.stopPropagation()}>
          <RotateCcw size={14} /> Restart
        </button>
        <button className="flex-1 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium" onClick={(e) => e.stopPropagation()}>
          <Square size={14} /> Stop
        </button>
      </div>
    </div>
  );
}
