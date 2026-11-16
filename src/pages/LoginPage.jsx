import { CheckCircle2 } from "lucide-react";
import { useNavigate,Link } from "react-router-dom";
import Input from '../components/Input';
import Button from "../components/Button";
import Alert from '../components/Alert';

import useAuthStore from '../store/authStore'
import { useState } from "react";


const LoginPage = () => {

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const result = login(formData.email);

      if (!result.success) {
        setError(result.message);
        return;
      }

      navigate("/dashboard", { replace: true });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="lg:mx-auto max-w-4xl rounded-xl shadow-xl grid bg-white  md:grid-cols-2 md:grid-cols-[2fr_3fr] m-8 lg:my-5">

      {/* Left branding panel */}
      <section className=" relative hidden flex-col rounded-xl shadow-xl  justify-between overflow-hidden bg-sidebar p-10 lg:p-12 text-white md:flex ">

        <h1 className="text-2xl font-bold">
          Task<span className="text-primary">Flow</span>
        </h1>

        <div className="relative z-10 my-6">
          <h2 className="font-display text-2xl font-bold leading-tight lg:text-3xl">
            Welcome Back
          </h2>

          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
            Sign in to your account and continue your journey
            with TaskFlow.
          </p>

          <div className="mt-7 space-y-4 text-sm text-slate-300">
            <p className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-primary" />
              Manage your projects
            </p>

            <p className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-primary" />
              Collaborate with your team
            </p>

            <p className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-primary" />
              Track your progress
            </p>
          </div>
        </div>
        <img src="../src/assets/login.png" alt="login image" className="mt-3 mb-7" />

        <p className="text-xs text-slate-400">
          Better teamwork starts here.
        </p>
      </section>

      {/* Right login form */}
      <section className="flex items-center justify-center px-5 py-10 ">
        <div className="w-full max-w-md ">

          <div className="mb-8 text-center md:hidden">
            <h1 className="text-2xl font-bold text-text-main">
              Task<span className="text-primary">Flow</span>
            </h1>
          </div>

         {/* //form */}
         <form onSubmit={handleSubmit} className="w-full space-y-5 px-4">

      <div>
        <h2 className="text-2xl font-bold text-text-main">
          Welcome Back
        </h2>

        <p className="mt-2 text-sm text-text-secondary">
          Sign in to TaskFlow
        </p>
      </div>

      {error && <Alert type="error" message={error} />}

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

      <div className="flex items-center justify-between gap-3 text-sm">
        <label className="flex items-center gap-2 text-text-secondary">
          <input type="checkbox" className="accent-primary" />
          Remember me
        </label>

        <button
          type="button"
          onClick={() =>
            setError("Password recovery is not available in demo mode.")
          }
          className="font-medium text-primary hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <Button type="submit" block className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Login"}
      </Button>

      <p className="text-center text-sm text-text-secondary">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-primary hover:underline"
        >
          Create account
        </Link>
      </p>

    </form>


        </div>
      </section>

    </main>
  );
};

export default LoginPage;
