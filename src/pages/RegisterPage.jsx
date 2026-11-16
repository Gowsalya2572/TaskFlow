import { CheckCircle2 } from "lucide-react";
import { useNavigate,Link } from "react-router-dom";
import Input from '../components/Input';
import Button from "../components/Button";
import Alert from '../components/Alert';

import useAuthStore from '../store/authStore'
import { useState } from "react";

const RegisterPage = () => {
    const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const result = register({
        name: formData.name,
        email: formData.email,
      });

      if (!result.success) {
        setError(result.message);
        return;
      }

      navigate("/dashboard", { replace: true });
    } catch {
      setError("Unable to create your account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="lg:mx-auto max-w-4xl rounded-xl shadow-xl grid  bg-white md:grid-cols-2 md:grid-cols-[3fr_4fr] m-8 lg:my-5">

      {/* Left branding panel */}
      <section className="relative hidden rounded-xl shadow-xl flex-col justify-between overflow-hidden bg-sidebar p-8 text-white md:flex lg:p-10">

        <h1 className="text-2xl font-bold">
          Task<span className="text-primary">Flow</span>
        </h1>

        <div>
          <h2 className="font-display text-2xl font-bold leading-tight pt-5 lg:text-3xl">
            Start Something Great
          </h2>

          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
            Join TaskFlow and start managing your projects
            and team in one workspace.
          </p>

          <div className="mt-8 mb-3 space-y-4 text-sm text-slate-300">
            <p className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-primary" />
              Organize your projects
            </p>

            <p className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-primary" />
              Work together with your team
            </p>

            <p className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-primary" />
              Achieve your goals
            </p>
          </div>
        </div>
        <img src="../src/assets/login.png" alt="login image" className="mt-4 mb-6" />

        <p className="text-xs text-slate-400">
          Build better workflows with TaskFlow.
        </p>
      </section>

      {/* Right registration form */}
      <section className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">

          <div className="mb-8 text-center md:hidden">
            <h1 className="text-2xl font-bold text-text-main">
              Task<span className="text-primary">Flow</span>
            </h1>
          </div>

          {/* form */}
              <form onSubmit={handleSubmit} className="w-full space-y-4 px-4">

      <div>
        <h2 className="text-2xl font-bold text-text-main">
          Create your account
        </h2>

        <p className="mt-2 text-sm text-text-secondary">
          It's free and only takes a minute.
        </p>
      </div>

      {error && <Alert type="error" message={error} />}

      <Input
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="John Doe"
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@example.com"
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
        required
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your password"
        required
      />

      <Button type="submit" className="w-full" block disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>

      <p className="text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-primary hover:underline"
        >
          Login
        </Link>
      </p>

    </form>


        </div>
      </section>

    </main>
  );
};

export default RegisterPage;
