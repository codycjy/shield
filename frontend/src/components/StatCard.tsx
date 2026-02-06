import type { ReactElement } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon?: ReactElement;
  subtitle?: string;
  subtitleColor?: 'green' | 'gray' | 'red' | 'blue';
  variant?: 'light' | 'dark';
  showProgress?: boolean;
  progressValue?: number;
  progressMax?: number;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
}

export default function StatCard({
  title,
  value,
  icon,
  subtitle,
  subtitleColor = 'gray',
  variant = 'light',
  showProgress = false,
  progressValue = 0,
  progressMax = 1,
  trend,
}: StatCardProps) {
  const isDark = variant === 'dark';

  const subtitleColors = {
    green: 'text-green-600',
    gray: isDark ? 'text-gray-400' : 'text-gray-600',
    red: 'text-red-600',
    blue: 'text-blue-300',
  };

  const iconBgColors = {
    light: 'bg-indigo-50 text-indigo-500',
    dark: 'text-yellow-400',
  };

  return (
    <div
      className={`rounded-xl p-6 shadow-sm flex flex-col justify-between h-36 ${
        isDark ? 'bg-slate-900 border border-slate-700 text-white relative overflow-hidden' : 'bg-white border border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-bold tracking-tight ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
            {title}
          </p>
          <h3 className={`text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {value}
          </h3>
        </div>
        {icon && (
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${isDark ? iconBgColors.dark : iconBgColors.light}`}>
            {icon}
          </div>
        )}
      </div>

      <div>
        {showProgress && (
          <div className="w-full mb-3">
            <div className="w-full bg-slate-700 h-1.5 rounded-full">
              <div
                className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(progressValue / progressMax) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {trend && (
          <p className={`text-sm font-bold flex items-center gap-1 ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              {trend.direction === 'up' ? (
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              )}
            </svg>
            {trend.value} <span className="text-slate-500 font-normal">vs last week</span>
          </p>
        )}

        {subtitle && !trend && (
          <div className={`text-sm ${subtitleColors[subtitleColor]}`}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
