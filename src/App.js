import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddProject from './components/AddProject';
import GetProjects from './components/GetProjects';
import './App.css';
import Pomodoro from './components/Pomodoro';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/add_projects' element={<AddProject/>}/>
          <Route path='/get_projects' element={<GetProjects/>}/>
          <Route path='/pomodoro/:id' element={<Pomodoro/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
