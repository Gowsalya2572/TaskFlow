import { useNavigate } from "react-router-dom";
import { CheckCircle2, Circle, Clock, DotIcon, Play } from "lucide-react";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden bg-app-bg text-center px-5 py-10 md:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

        {/* Left content */}
        <div>
          <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary shadow-sm ">
            Simple · Powerful · Collaborative
          </span>

          <h1 className="mt-6 max-w-xl font-display text-4xl font-bold leading-tight text-text-main sm:text-5xl lg:text-6xl">
            Collaborate.
            <br />
            Plan.
            <br />
            <span className="text-primary">
              Get Work Done.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-text-secondary">
            Manage your team's tasks, projects and workflows
            from one powerful workspace.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button onClick={() => navigate("/register")}>
              Get Started →
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="flex items-center hover:bg-primary hover:text-white"
            >
              View Demo  <Play size={16} />
            </Button>
          </div>

          <p className="mt-5 text-xs text-text-secondary">
            Organize your work. Collaborate with your team.
          </p>
        </div>

        {/* Right dashboard preview */}
          <div className="">
            <img
              src='../src/assets/hero.png'
              alt="TaskFlow project management dashboard"
              className=" size-120 w-full "
            />
          </div>

      </div>
    </section>
  );
};

export default Home;
