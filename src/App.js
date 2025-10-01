import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddProject from './components/AddProject';
import GetProjects from './components/GetProjects';
<<<<<<< HEAD
import HandleDelete from './components/HandleDelete';
=======
>>>>>>> b853dbc7d9cece335d08c268a4a957f4f04f93c7
import './App.css';
import Pomodoro from './components/Pomodoro';

function App() {
  return (
    <div className='App'>
<<<<<<< HEAD
      <BrowserRouter basename="/Pomodoro-Web-App">
=======
      <BrowserRouter>
>>>>>>> b853dbc7d9cece335d08c268a4a957f4f04f93c7
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/add_projects' element={<AddProject/>}/>
          <Route path='/get_projects' element={<GetProjects/>}/>
          <Route path='/pomodoro/:id' element={<Pomodoro/>}/>
<<<<<<< HEAD
          <Route path='/handle_delete' element={<HandleDelete/>}/>
=======
>>>>>>> b853dbc7d9cece335d08c268a4a957f4f04f93c7
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
