
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#94A3B8", "#6366F1", "#10B981"];

const TaskStatusChart = ({ data }) => {
  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Task Status
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Overview of tasks by status
        </p>
      </div>

      {total === 0 ? (
        <div className="flex h-72 items-center justify-center text-sm text-slate-500">
          No tasks available for this chart.
        </div>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={3}
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name) => [
                  `${value} tasks`,
                  name,
                ]}
              />

              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-2 text-center">
        <p className="text-3xl font-bold text-slate-900">
          {total}
        </p>

        <p className="text-sm text-slate-500">
          Total Tasks
        </p>
      </div>
    </div>
  );
};

export default TaskStatusChart;
