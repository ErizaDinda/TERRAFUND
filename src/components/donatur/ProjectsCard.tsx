interface ProjectsCardProps {
  title: string;
  description: string;
  progress: number;
}

export default function ProjectsCard({ title, description, progress }: ProjectsCardProps) {
  return (
    <div className="p-5 bg-white rounded-xl shadow">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-600 text-sm mt-1">{description}</p>

      <div className="w-full bg-gray-200 h-3 rounded-full mt-4">
        <div
          className="h-3 bg-green-500 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-700 mt-2">{progress}% selesai</p>
    </div>
  );
}
