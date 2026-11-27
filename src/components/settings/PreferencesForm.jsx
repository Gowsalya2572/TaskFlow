
import { useEffect, useState } from "react";
import { SlidersHorizontal, Save } from "lucide-react";

const STORAGE_KEY = "taskflow_preferences";

const defaultPreferences = {
  theme: "light",
  emailNotifications: true,
  taskNotifications: true,
  dueDateReminders: true,
};

const PreferencesForm = () => {
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [message, setMessage] = useState("");

  // Load saved preferences
  useEffect(() => {
    try {
      const savedPreferences = JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      );

      if (savedPreferences) {
        setPreferences({
          ...defaultPreferences,
          ...savedPreferences,
        });
      }
    } catch {
      setPreferences(defaultPreferences);
    }
  }, []);

  // Update preference values
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setPreferences((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setMessage("");
  };

  // Save preferences
  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(preferences)
    );

    setMessage("Preferences saved successfully!");
  };

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          <SlidersHorizontal size={22} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text-main">
            Preferences
          </h2>
          <p className="text-sm text-text-secondary">
            Customize your TaskFlow experience.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Theme */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-main">
            Theme
          </label>

          <select
            name="theme"
            value={preferences.theme}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 outline-none focus:border-primary"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

          <p className="mt-1 text-xs text-text-secondary">
            Choose your preferred appearance.
          </p>
        </div>

        {/* Email notifications */}
        <label className="flex items-center justify-between gap-4 cursor-pointer">
          <div>
            <p className="text-sm font-medium text-text-main">
              Email Notifications
            </p>
            <p className="text-xs text-text-secondary">
              Receive updates through email.
            </p>
          </div>

          <input
            type="checkbox"
            name="emailNotifications"
            checked={preferences.emailNotifications}
            onChange={handleChange}
            className="h-4 w-4 accent-primary"
          />
        </label>

        {/* Task notifications */}
        <label className="flex items-center justify-between gap-4 cursor-pointer">
          <div>
            <p className="text-sm font-medium text-text-main">
              Task Notifications
            </p>
            <p className="text-xs text-text-secondary">
              Get notified about task assignments and updates.
            </p>
          </div>

          <input
            type="checkbox"
            name="taskNotifications"
            checked={preferences.taskNotifications}
            onChange={handleChange}
            className="h-4 w-4 accent-primary"
          />
        </label>

        {/* Due date reminders */}
        <label className="flex items-center justify-between gap-4 cursor-pointer">
          <div>
            <p className="text-sm font-medium text-text-main">
              Due Date Reminders
            </p>
            <p className="text-xs text-text-secondary">
              Enable reminders for upcoming deadlines.
            </p>
          </div>

          <input
            type="checkbox"
            name="dueDateReminders"
            checked={preferences.dueDateReminders}
            onChange={handleChange}
            className="h-4 w-4 accent-primary"
          />
        </label>

        {message && (
          <p className="text-sm text-green-600">{message}</p>
        )}

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover"
        >
          <Save size={16} />
          Save Preferences
        </button>
      </form>
    </section>
  );
};

export default PreferencesForm;
