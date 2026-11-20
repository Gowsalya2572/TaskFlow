
const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "indigo",
}) => {
  const colorStyles = {
    indigo: "bg-indigo-50 text-indigo-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="rounded-xl border border-border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-text-secondary">
          {title}
        </p>

        {Icon && (
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorStyles[color] || colorStyles.indigo}`}>
            <Icon size={20} />
          </div>
        )}
      </div>

      <h3 className="mt-4 text-3xl font-bold text-text-main">
        {value}
      </h3>

    </div>
  );
};

export default StatCard;
