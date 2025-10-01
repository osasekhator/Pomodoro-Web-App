import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "./Footer";
import ConfirmationModal from "./ConfirmationModal";

function HandleDelete() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [modalState, setModalState] = useState({
        isVisible: false,
        projectId: null,
        projectName: '',
    });

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

    const deleteProj = (project) => {
        // Store the project details and set the modal to visible
        setModalState({
            isVisible: true,
            projectId: project.id,
            projectName: project.name,
        });
    };

    const handleCancelDeletion = () => {
        console.log("Deletion cancelled. Modal disappearing.");
        // Hide the modal and clear the target project info
        setModalState({
            isVisible: false,
            projectId: null,
            projectName: '',
        });
        // This achieves the "console disappears and nothing happens" effect.
    };

    const handleConfirmDeletion = async () => {
        const idToDelete = modalState.projectId;
        const nameToDelete = modalState.projectName;

        try {
            // EXECUTE THE CORE LOGIC: Perform the DELETE request
            const response = await fetch(`http://127.0.0.1:5000/projects/${idToDelete}`, {
                method: 'DELETE',
            });

            if(response.ok) {
                console.log(`Successfully deleted project: ${nameToDelete}`);

                // Update the UI: Remove the project from the local state list
                setProjects(prevProjects => 
                    prevProjects.filter(p => p.id !== idToDelete)
                );
            } else {
                console.error("Failed to delete project on the server.");
            }
        } catch(error) {
            console.error("Network error during deletion:", error.message);
        }

        // Hide the modal after attempting deletion
        handleCancelDeletion();
    };

    return(
        <div className="get">
            <Header/>
            <h2>Available Projects for Deletion:</h2>
            {projects.map((proj) => (
            <button onClick={() => deleteProj(proj)} key={proj.id}>
                {proj.id}. {proj.name}
            </button>
            ))}

             {modalState.isVisible && (
                <ConfirmationModal
                    projectName={modalState.projectName}
                    onConfirm={handleConfirmDeletion} // Pass the delete function
                    onCancel={handleCancelDeletion}   // Pass the cancel function
                />
            )}
            <Footer/>
        </div>
    );
}

export default HandleDelete;

