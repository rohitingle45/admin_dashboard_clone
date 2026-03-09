import React, { useState } from "react";
import Topbar from "../../Components/layout/Topbar";
import Button from "../../Components/buttons/Button";

interface SettingsProps {
  onMount?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onMount }) => {
  React.useEffect(() => {
    if (onMount) onMount();
  }, [onMount]);

  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: {
      desktopPush: true,
      mobilePush: true,
      email: true
    },
    privacy: {
      profileVisible: true,
      activityVisible: true,
      showOnlineStatus: true
    },
    security: {
      twoFactor: true
    },
    language: 'en'
  });

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setSettings(prev => ({ ...prev, theme }));
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleNotificationChange = (type: 'desktopPush' | 'mobilePush' | 'email', value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [type]: value }
    }));
  };

  const handlePrivacyChange = (type: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, [type]: value }
    }));
  };

  const handleSecurityChange = (value: boolean) => {
    setSettings(prev => ({
      ...prev,
      security: { ...prev.security, twoFactor: value }
    }));
  };

  const handleSave = () => {
    // Here you would typically save settings to backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="w-full flex flex-col bg-white">
      <div className="mb-2 mt-6">
        <Topbar
          title={
            <div className="font-['Lexend'] font-light text-[16px] leading-6 text-[#16151C]">
              Settings
            </div>
          }
          subtitle="Manage your account settings and preferences"
          subtitleClassName="text-[14px] leading-5 text-[#A2A1A8] font-light"
        />
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div className="p-6 space-y-5">
          {/* Theme Settings */}
          <div className="border-b border-gray-200 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#16151C] mb-2">Appearance</h3>
                <p className="text-sm text-[#A2A1A8] mb-4">Customize how your theme looks on your device</p>
              </div>
              <div className="ml-4">
                <select
                  value={settings.theme}
                  onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark')}
                  className="w-[84px] h-[40px] border bg-[#A2A1A81A] text-[#16151C] rounded-xl px-2.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </div>

          {/* Language & Region */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#16151C] mb-2">Language</h3>
                <p className="text-sm text-[#A2A1A8]">Select your preferred language</p>
              </div>
              <div className="ml-4">
                <select
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="w-[84px] h-[40px] border bg-[#A2A1A81A] text-[#16151C] rounded-xl px-2.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#16151C] mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-[#A2A1A8]">Add an extra layer of security to your account</p>
              </div>
              <div className="ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactor}
                    onChange={(e) => handleSecurityChange(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#34C759]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#34C759]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Push Notifications */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#16151C] mb-2">Mobile Push Notifications</h3>
                <p className="text-sm text-[#A2A1A8]">Receive push notifications on mobile devices</p>
              </div>
              <div className="ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.mobilePush}
                    onChange={(e) => handleNotificationChange('mobilePush', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#34C759]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#34C759]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Deskptop Notifications */}
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#16151C] mb-2">Desktop Notifications</h3>
                <p className="text-sm text-[#A2A1A8]">Receive push notifications on desktop devices</p>
              </div>
              <div className="ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.desktopPush}
                    onChange={(e) => handleNotificationChange('desktopPush', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#34C759]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#34C759]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#16151C] mb-2">Email Notifications</h3>
                <p className="text-sm text-[#A2A1A8]">Receive email notification</p>
              </div>
              <div className="ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={(e) => handleNotificationChange('email', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#34C759]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#34C759]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
