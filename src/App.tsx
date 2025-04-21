import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MemeTable from './pages/MemeTable';
import MemeList from './pages/MemeList';

export default function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <div className="p-4 max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<MemeTable />} />
            <Route path="/table" element={<MemeTable />} />
            <Route path="/list" element={<MemeList />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}
