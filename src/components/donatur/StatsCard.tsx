interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="p-5 bg-white rounded-xl shadow flex items-center gap-4">
      <div className="text-3xl">{icon}</div>

      <div>
        <h4 className="text-gray-700 font-medium">{title}</h4>
        <p className="text-2xl font-bold text-green-600">{value}</p>
      </div>
    </div>
  );
}
