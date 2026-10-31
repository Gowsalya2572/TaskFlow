
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Button from "../components/Button";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-app-bg px-6 py-16">
      <div className="mx-auto max-w-7xl rounded-2xl bg-primary px-6 py-14 text-center text-white sm:px-12">

        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Ready to organize your workflow?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-indigo-100">
          Bring your projects, tasks and team into one simple
          workspace.
        </p>

        <div className="mt-8">
          <Button
            variant="outline"
            className="border-white bg-white text-primary hover:bg-indigo-50"
            onClick={() => navigate("/register")}
          >
            Start Managing Tasks <ArrowRight size={17} />
          </Button>
        </div>

      </div>
    </section>
  );
};

export default CTA;
