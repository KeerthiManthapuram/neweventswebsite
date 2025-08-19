import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route 
      path="/" 
      element =
      {
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } 
      />
    </Routes>
  </BrowserRouter>
);

export default App;
