
import { Check } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const features = [
    "Project management",
    "Task organization",
    "Team collaboration",
    "Progress tracking",
  ];

  return (
    <section id="pricing" className="bg-app-bg px-6 py-20">
      <div className="mx-auto max-w-4xl">

        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-text-main">
            Simple Plans for Your Team
          </h2>

          <p className="mt-3 text-sm text-text-secondary">
            Explore TaskFlow and organize your team's workflow.
          </p>
        </div>

        <Card className="mx-auto max-w-md border-primary/30 p-8">
          <span className="text-sm font-semibold text-primary">
            TASKFLOW
          </span>

          <h3 className="mt-3 text-2xl font-bold text-text-main">
            Get Started
          </h3>

          <p className="mt-2 text-sm text-text-secondary">
            Start organizing your projects in one workspace.
          </p>

          <div className="my-6 space-y-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <Check size={18} className="text-green-600" />
                <span className="text-sm text-text-main">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <Button
            onClick={() => navigate("/register")}
          >
            Create Your Account
          </Button>
        </Card>

      </div>
    </section>
  );
};

export default Pricing;
