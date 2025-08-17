import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import Places from './pages/Places';
import PlaceRenderer from './pages/PlaceRenderer';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/places" element={<Places />} />
        <Route path="/places/:placeName" element={<PlaceRenderer />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
