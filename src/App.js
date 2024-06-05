import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import Home from './Home/Home'
import Settings from './Settings/Settings';
import Customer from './Customer/Customer';
import Parties from './Parties/Parties';
import AddParties from './Parties/AddParties/AddParties';
import Exam from './Exam/Exam';
import CreateExam from './Exam/CreateExam/CreateExam';
import Gallery from './Gallery/Gallery';
import Reports from './Reports/Reports';
import Drag from './Drag/Drag';
import MarkAttendance from './MarkAttendance/MarkAttendance';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Login />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="customer" element={<Customer />}></Route>
        <Route path="settings" element={<Settings />}></Route>
        <Route path="parties" element={<Parties />}></Route>
        <Route path="parties/add-parties" element={<AddParties />}></Route>
        <Route path="exam" element={<Exam />}></Route>
        <Route path="exam/create-exam" element={<CreateExam />}></Route>
        <Route path="gallery" element={<Gallery />}></Route>
        <Route path="reports" element={<Reports />}></Route>
        <Route path="drag-drop" element={<Drag />}></Route>
        <Route path="mark-attendance" element={<MarkAttendance />}></Route>
      </Routes>
    </div>
  );
}

export default App;
