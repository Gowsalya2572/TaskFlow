import { useNavigate } from "react-router-dom";
import {  Play } from "lucide-react";
import Button from "../components/Button";


const Home = () => {
  const navigate = useNavigate();

  return (
  <section className="overflow-hidden bg-app-bg px-5 py-14 text-center sm:px-8 md:py-16 lg:py-10">

  <div className="mx-auto max-w-7xl grid lg:grid-cols-2 ">

    {/* Hero content */}
    <div className="mx-auto flex max-w-3xl flex-col lg:items-start items-center">

      <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary shadow-sm sm:text-sm">
        Simple · Powerful · Collaborative
      </span>

      <h1 className="mt-7 font-display lg:text-left text-4xl font-bold leading-tight text-text-main sm:text-5xl md:text-6xl lg:text-7xl">
        Collaborate.
        <br />
        Plan.
        <br />
        <span className="text-primary">
          Get Work Done.
        </span>
      </h1>

      <p className="mt-6 max-w-xl  lg:text-left text-sm leading-7 text-text-secondary sm:text-base md:text-lg">
        Manage your team's tasks, projects and workflows
        from one powerful workspace.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button onClick={() => navigate("/register")}>
          Get Started →
        </Button>

        <Button
          variant="outline"
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 hover:bg-primary hover:text-white"
        >
          View Demo <Play size={16} />
        </Button>
      </div>

      <p className="mt-5 text-xs text-text-secondary sm:text-sm">
        Organize your work. Collaborate with your team.
      </p>

    </div>

    {/* Dashboard preview */}
    <div className="mx-auto mt-12 w-full max-w-5xl sm:mt-16 md:mt-20 lg:mt-24">
      <img
        src='../src/assets/hero.png'
        alt="TaskFlow project management dashboard"
        className="h-auto w-full object-contain"
      />
    </div>

  </div>
</section>
  );
};

export default Home;
