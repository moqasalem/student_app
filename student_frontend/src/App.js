
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Student from './pages/Student'
import Addstudent from './pages/Addstudent'
import EditStudent from './pages/Editstudent'
function App() {

  return (
    <BrowserRouter>

      {/* Main Routers */}
      <Routes>
        <Route exact path="/" element={<Student />} />
        <Route path="/add-student" element={<Addstudent />} />
        <Route path="/edit-student/:id" element={<EditStudent />} />     
      </Routes>

    </BrowserRouter>
  );
}

export default App;
