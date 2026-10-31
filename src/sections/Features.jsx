
import {
  Grip,
  Users,
  ShieldCheck,
  ChartNoAxesCombined,
} from "lucide-react";

import Card from "../components/Card";

const Features = () => {
  const features = [
    {
      title: "Drag & Drop",
      description:
        "Move tasks between workflows easily and organize your team's work.",
      icon: Grip,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Real-Time Collaboration",
      description:
        "Keep your team synchronized and collaborate on projects together.",
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Team Permissions",
      description:
        "Control what each team member can view and manage.",
      icon: ShieldCheck,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Productivity Analytics",
      description:
        "Understand your team's progress with useful project insights.",
      icon: ChartNoAxesCombined,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <section id="features" className="bg-app-bg px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold text-primary">
            FEATURES
          </span>

          <h2 className="mt-3 font-display text-3xl font-bold text-text-main sm:text-4xl">
            Everything Your Team Needs
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-text-secondary">
            Organize projects, manage tasks and keep your team
            productive from one place.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}
                >
                  <Icon size={24} />
                </div>

                <h3 className="text-lg font-semibold text-text-main">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

