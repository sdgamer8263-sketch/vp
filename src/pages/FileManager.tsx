import React, { useState } from "react";
import { Folder, File, Upload, Plus, Trash2, MoreVertical, Check } from "lucide-react";

export const FileManager = () => {
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isCreatingFile, setIsCreatingFile] = useState(false);

  const handleCreateFolder = () => {
    setIsCreatingFolder(true);
    setTimeout(() => setIsCreatingFolder(false), 2000);
  };

  const handleCreateFile = () => {
    setIsCreatingFile(true);
    setTimeout(() => setIsCreatingFile(false), 2000);
  };

  const files = [
    { name: "plugins", type: "folder", size: "--", date: "Oct 24, 2023" },
    { name: "world", type: "folder", size: "--", date: "Oct 24, 2023" },
    { name: "server.properties", type: "file", size: "1.2 KB", date: "Oct 24, 2023" },
    { name: "eula.txt", type: "file", size: "150 B", date: "Oct 24, 2023" },
    { name: "spigot.jar", type: "file", size: "45 MB", date: "Oct 24, 2023" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2 text-sm text-gray-400 bg-black/30 px-4 py-2 rounded-lg border border-white/10">
          <span className="text-white">/home/container</span>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleCreateFolder}
            disabled={isCreatingFolder}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all ${
              isCreatingFolder
                ? "bg-green-600/50 border border-green-500/50"
                : "bg-white/10 hover:bg-white/20 border border-white/10"
            }`}
          >
            {isCreatingFolder ? (
              <>
                <Check size={16} className="animate-pulse" />
                <span>Created</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>New Folder</span>
              </>
            )}
          </button>
          <button 
            onClick={handleCreateFile}
            disabled={isCreatingFile}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all ${
              isCreatingFile
                ? "bg-green-600/50 border border-green-500/50"
                : "bg-white/10 hover:bg-white/20 border border-white/10"
            }`}
          >
            {isCreatingFile ? (
              <>
                <Check size={16} className="animate-pulse" />
                <span>Created</span>
              </>
            ) : (
              <>
                <File size={16} />
                <span>New File</span>
              </>
            )}
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 border border-blue-500/50 rounded-lg text-white text-sm font-medium transition-colors shadow-[0_0_10px_rgba(37,99,235,0.3)]">
            <Upload size={16} />
            <span>Upload</span>
          </button>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-4 font-semibold text-gray-300 text-sm">File Name</th>
                <th className="px-6 py-4 font-semibold text-gray-300 text-sm">Size</th>
                <th className="px-6 py-4 font-semibold text-gray-300 text-sm">Last Modified</th>
                <th className="px-6 py-4 font-semibold text-gray-300 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {files.map((file, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 text-gray-200 flex items-center space-x-3">
                    {file.type === "folder" ? (
                      <Folder size={18} className="text-blue-400" />
                    ) : (
                      <File size={18} className="text-gray-400" />
                    )}
                    <span>{file.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{file.size}</td>
                  <td className="px-6 py-4 text-gray-400">{file.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors">
                        <MoreVertical size={16} />
                      </button>
                      <button className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
