
import {
  ListTodo,
  CheckCircle2,
  Clock3,
  AlertCircle,
} from "lucide-react";

import StatCard from "./StatCard";

const StatsGrid = ({ stats }) => {
  const statItems = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: ListTodo,
      color: "indigo",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      color: "green",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: Clock3,
      color: "orange",
    },
    {
      title: "Overdue",
      value: stats.overdue,
      icon: AlertCircle,
      color: "red",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statItems.map((item) => (
        <StatCard
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </section>
  );
};

export default StatsGrid;
