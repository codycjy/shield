import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

const pageTitles: Record<string, string> = {
  '/': 'Security Overview',
  '/logs': 'Interception Logs',
  '/rules': 'Defense Rules',
  '/profile': 'Profile',
  '/simulator': 'Live Simulator',
};

export default function DashboardLayout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title={title} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
