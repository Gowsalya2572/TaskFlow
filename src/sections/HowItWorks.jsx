
import {
  FolderPlus,
  UserPlus,
  ListTodo,
  TrendingUp,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create a Project",
      description:
        "Start your project and define your workflow.",
      icon: FolderPlus,
    },
    {
      number: "02",
      title: "Add Your Team",
      description:
        "Invite team members and assign roles.",
      icon: UserPlus,
    },
    {
      number: "03",
      title: "Create Tasks",
      description:
        "Create tasks with priority, status and due dates.",
      icon: ListTodo,
    },
    {
      number: "04",
      title: "Track Progress",
      description:
        "Move tasks through the workflow and monitor progress.",
      icon: TrendingUp,
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-app-bg px-6 py-20"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-14 text-center">
          <h2 className="font-display text-3xl font-bold text-text-main sm:text-4xl">
            How It Works
          </h2>

          <p className="mt-3 text-sm text-text-secondary">
            Get started in 4 simple steps
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-primary">
                  <span className="font-bold">{step.number}</span>
                </div>

                <div className="mb-3 flex items-center gap-2">
                  <Icon size={20} className="text-primary" />

                  <h3 className="font-semibold text-text-main">
                    {step.title}
                  </h3>
                </div>

                <p className="max-w-xs text-sm leading-6 text-text-secondary">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
