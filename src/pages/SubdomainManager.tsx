import React, { useState } from "react";
import { Globe, Plus, Trash2, CheckCircle, AlertCircle } from "lucide-react";

export const SubdomainManager = () => {
  const [subdomains, setSubdomains] = useState([
    { id: 1, name: "play", domain: "myserver.com", status: "active" },
  ]);
  const [newSubdomain, setNewSubdomain] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubdomain) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setSubdomains([
        ...subdomains,
        {
          id: Math.random(),
          name: newSubdomain,
          domain: "myserver.com",
          status: "pending",
        },
      ]);
      setNewSubdomain("");
      setIsSubmitting(false);
    }, 1000);
  };

  const deleteSubdomain = (id: number) => {
    setSubdomains(subdomains.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Globe className="text-blue-500" size={32} />
          Subdomain Manager
        </h1>
        <p className="text-neutral-400">
          Create and manage custom subdomains for your server to make it easier
          for players to connect.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Plus size={20} className="text-green-400" />
              Create Subdomain
            </h3>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Subdomain Name
                </label>
                <div className="flex items-center">
                  <input
                    value={newSubdomain}
                    onChange={(e) => setNewSubdomain(e.target.value)}
                    placeholder="play"
                    className="flex-1 bg-black/50 border border-white/10 rounded-l-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <div className="bg-neutral-800 border border-l-0 border-white/10 rounded-r-lg px-4 py-2 text-neutral-400">
                    .myserver.com
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-medium transition-all"
              >
                {isSubmitting ? "Creating..." : "Create Subdomain"}
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">
              Active Subdomains
            </h3>

            {subdomains.length === 0 ? (
              <div className="text-center py-8 text-neutral-400 bg-black/20 rounded-xl border border-white/5">
                No subdomains configured yet.
              </div>
            ) : (
              <div className="space-y-3">
                {subdomains.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between bg-black/40 border border-white/10 p-4 rounded-xl hover:border-white/20 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                        <Globe size={20} className="text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-lg">
                          {sub.name}.{sub.domain}
                        </div>
                        <div
                          className={`flex items-center gap-1 text-sm mt-0.5 ${sub.status === "active" ? "text-green-400" : "text-yellow-400"}`}
                        >
                          {sub.status === "active" ? (
                            <CheckCircle size={14} />
                          ) : (
                            <AlertCircle size={14} />
                          )}
                          {sub.status === "active"
                            ? "Active & Routing"
                            : "Pending DNS Propagation"}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteSubdomain(sub.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
