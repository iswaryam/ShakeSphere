import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { KidsMode } from './pages/KidsMode';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kids" element={<KidsMode />} />
      </Routes>
    </HashRouter>
  );
}
