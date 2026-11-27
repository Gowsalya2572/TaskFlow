
import ProfileForm from "../components/settings/ProfileForm";
import PreferencesForm from "../components/settings/PreferencesForm";
import { Settings as SettingsIcon } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <SettingsIcon size={24} className="text-primary" />

          <h1 className="text-2xl font-bold text-text-main">
            Settings
          </h1>
        </div>

        <p className="mt-1 text-sm text-text-secondary">
          Manage your profile and application preferences.
        </p>
      </div>

      {/* Settings Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Profile */}
        <ProfileForm />

        {/* Preferences */}
        <PreferencesForm />

      </div>
    </div>
  );
};

export default SettingsPage;
