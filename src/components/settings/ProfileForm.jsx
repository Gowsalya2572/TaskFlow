
import { useEffect, useState } from "react";
import { UserRound, Save } from "lucide-react";
import useAuthStore from "../../store/authStore";

const ProfileForm = () => {
  const user = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobTitle: "",
  });

  const [message, setMessage] = useState("");

  // Load user information into the form
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        jobTitle: user.jobTitle || "",
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
  };

  // Save profile
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setMessage("Name and email are required.");
      return;
    }

    // Update profile in Zustand
    useAuthStore.getState().updateUser(formData);

    setMessage("Profile updated successfully!");
  };

  return (
    <section className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          <UserRound size={22} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-text-main">
            Profile Information
          </h2>
          <p className="text-sm text-text-secondary">
            Update your personal information.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-text-main">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full rounded-lg border border-border px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-main">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-border px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-text-main">
            Job Title
          </label>

          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            className="w-full rounded-lg border border-border px-4 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        {message && (
          <p
            className={`text-sm ${
              message.includes("success")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover"
        >
          <Save size={16} />
          Save Profile
        </button>
      </form>
    </section>
  );
};

export default ProfileForm;
