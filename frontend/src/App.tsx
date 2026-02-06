import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';
import Logs from './pages/Logs';
import Rules from './pages/Rules';
import Profile from './pages/Profile';
import Simulator from './pages/Simulator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="logs" element={<Logs />} />
          <Route path="rules" element={<Rules />} />
          <Route path="profile" element={<Profile />} />
          <Route path="simulator" element={<Simulator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
