export default function PageTemplate({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {icon && <span className="text-4xl">{icon}</span>}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 min-h-[400px]">
        {children || (
          <div className="text-center text-gray-500 py-20">
            <span className="text-6xl mb-4 block">🛠️</span>
            <p>Página em desenvolvimento</p>
          </div>
        )}
      </div>
    </div>
  );
}
