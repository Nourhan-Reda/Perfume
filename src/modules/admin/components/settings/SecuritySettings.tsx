import React from "react";
import { Shield, Mail, Lock, Eye, EyeOff } from "lucide-react";

// Professional interface ensuring type safety across the admin suite
interface SettingsState {
  houseName: string;
  currency: string;
  tone: string;
  bio: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  adminRole: string;
  twoFactor: boolean;
}

interface SecurityProps {
  settings: SettingsState;
  setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
  showPassword: boolean; // Corrected from 'any'
  setShowPassword: (val: boolean) => void;
}

const SecuritySettings: React.FC<SecurityProps> = ({
  settings,
  setSettings,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Curator Access Section */}
      <div className="space-y-6">
        <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-black border-l-2 border-black pl-4">
          Curator Access
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-neutral-50/50 p-8 rounded-[2.5rem] border border-neutral-100">
          {/* Email Field */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 mb-2">
              <Mail size={12} className="text-gray-400" />
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                Admin Email
              </label>
            </div>
            <input
              type="email"
              value={settings.adminEmail}
      
              onChange={(e) =>
                setSettings({ ...settings, adminEmail: e.target.value })
              }
              className="w-full bg-transparent border-b border-gray-200 py-2 text-sm font-light outline-none focus:border-black transition-all"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 mb-2">
              <Lock size={12} className="text-gray-400" />
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                Security Key
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={settings.adminPassword}
                onChange={(e) =>
                  setSettings({ ...settings, adminPassword: e.target.value })
                }
                className="w-full bg-transparent border-b border-gray-200 py-2 text-sm font-light outline-none focus:border-black transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-2 text-gray-400 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Factor Status Toggle */}
      <div className="flex items-center justify-between p-8 border border-gray-100 rounded-3xl group hover:border-black transition-all duration-500">
        <div className="flex items-center space-x-4">
          <div
            className={`p-3 rounded-2xl transition-colors duration-500 ${settings.twoFactor ? "bg-black" : "bg-neutral-50"}`}
          >
            <Shield
              className={settings.twoFactor ? "text-white" : "text-gray-400"}
              size={20}
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-black">
              Multi-Factor Protocol
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              {settings.twoFactor
                ? "Highly Secure Access"
                : "Security Vulnerability Detected"}
            </p>
          </div>
        </div>
        <button
          onClick={() =>
            setSettings({ ...settings, twoFactor: !settings.twoFactor })
          }
          className={`w-14 h-7 rounded-full transition-all relative ${settings.twoFactor ? "bg-black shadow-lg shadow-black/20" : "bg-gray-200"}`}
        >
          <div
            className={`absolute top-1.5 w-4 h-4 bg-white rounded-full transition-all ${settings.twoFactor ? "right-1.5" : "left-1.5"}`}
          />
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;
