import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import History from './pages/History';
import SchedulingCurrent from './pages/SchedulingCurrent';
import SchedulingFuture from './pages/SchedulingFuture';
import TransferHistory from './pages/TransferHistory';
import TransferFindCollege from './pages/TransferFindCollege';
import TransferFindCourse from './pages/TransferFindCourse';
import WhatIf from './pages/WhatIf';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/whatif" element={<WhatIf />} />
          <Route path="/scheduling" element={<Navigate to="/scheduling/current" replace />} />
          <Route path="/scheduling/current" element={<SchedulingCurrent />} />
          <Route path="/scheduling/future" element={<SchedulingFuture />} />
          <Route path="/history" element={<History />} />
          <Route path="/transfer" element={<Navigate to="/transfer/history" replace />} />
          <Route path="/transfer/history" element={<TransferHistory />} />
          <Route path="/transfer/find" element={<Navigate to="/transfer/find/college" replace />} />
          <Route path="/transfer/find/college" element={<TransferFindCollege />} />
          <Route path="/transfer/find/course" element={<TransferFindCourse />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
