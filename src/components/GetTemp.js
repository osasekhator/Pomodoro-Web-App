import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


function GetTemp() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getProjects() {
        
            try{
                const response = await fetch('http://127.0.0.1:5000/projects');
                const data = await response.json();

                if(response.ok) {
                    console.log("Projects succesfully retrieved", data);
                    setProjects(data);
                }
            } catch(error) {
                console.error(error.message);
            }
        }
        getProjects();
    }, []);

    function goToPomodoro(proj) {
        navigate(`/pomodoro/${proj.id}`);
    }

    return (
        <div className="get">
            <h2>Available Projects:</h2>
            {projects.map((proj) => (
            <button onClick={() => goToPomodoro(proj)} key={proj.id}>
                {proj.id}. {proj.name}
            </button>
            ))}
        </div>
    );
}

export default GetTemp;