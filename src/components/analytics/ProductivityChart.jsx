
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProductivityChart = ({ data }) => {
  const hasTasks = data.some(
    (member) => member.totalTasks > 0
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Team Productivity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Assigned tasks vs completed tasks
        </p>
      </div>

      {!hasTasks ? (
        <div className="flex h-80 items-center justify-center text-sm text-slate-500">
          No productivity data available.
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 10,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12 }}
              />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="totalTasks"
                name="Assigned Tasks"
                fill="#818CF8"
                radius={[5, 5, 0, 0]}
              />

              <Bar
                dataKey="completedTasks"
                name="Completed Tasks"
                fill="#10B981"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ProductivityChart;
