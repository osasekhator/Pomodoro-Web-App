<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import '../App.css';

function MainSection() {
    const navigate = useNavigate();

    function addProj() {
        navigate('/add_projects')
    }

    function getProj() {
        navigate('/get_projects')
    }

    function deleteProj(){
        navigate('/handle_delete')
    }

    return(
        <div className="main">
            <h1>Would you like to add a Project or open one you already have?</h1>
            <button onClick={addProj}>Add Project</button>
            <button onClick={getProj}>Open Project</button>
            <button onClick={deleteProj}> Delete Project</button>
        </div>
    );
}

=======
import { useNavigate } from 'react-router-dom';
import '../App.css';

function MainSection() {
    const navigate = useNavigate();

    function addProj() {
        navigate('/add_projects')
    }

    function getProj() {
        navigate('/get_projects')
    }

    return(
        <div className="main">
            <h1>Would you like to add a Project or open one you already have?</h1>
            <button onClick={addProj}>Add Project</button>
            <button onClick={getProj}>Open Project</button>
        </div>
    );
}

>>>>>>> b853dbc7d9cece335d08c268a4a957f4f04f93c7
export default MainSection; 