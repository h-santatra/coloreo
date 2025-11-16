import './App.css';
import Homepage from './Pages/HomePage';
import ViewColor from './Pages/ViewColor';
import ScrollToTop from './Components/ScrollToTop';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/palette/:encodedColors" element={<ViewColor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
