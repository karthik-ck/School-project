import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import Home from './Home/Home'
import Settings from './Settings/Settings';
import Customer from './Customer/Customer';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Login />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="customer" element={<Customer />}></Route>
        <Route path="settings" element={<Settings />}></Route>
      </Routes>
    </div>
  );
}

export default App;
