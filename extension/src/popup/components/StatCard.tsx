interface StatCardProps {
  label: string;
  value: string | number;
  valueColor?: string;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, valueColor, icon }: StatCardProps) {
  return (
    <div className="flex-1 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 mb-1">{label}</p>
          <p
            className="text-xl font-bold"
            style={{ color: valueColor || '#1f2937' }}
          >
            {value}
          </p>
        </div>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
    </div>
  );
}
