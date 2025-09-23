//import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";

function AddForm() {
    const [name, setName] = useState("");

    async function saveName(e) {
        e.preventDefault();

        try{
            const response = await fetch('http://127.0.0.1:5000/projects',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "name":name })
            });


            const data = await response.json();

            if(response.ok) {
                console.log("Project added successfully:", data)
                setName("")
            }
        } catch(error) {
            console.error(error.messgae)
        }
    };

    return(
        <div className="add">
            <form onSubmit={saveName}>
                <label htmlFor="name">Project Name: </label>
                <input 
                type="text"
                id="name"
                value={name}
                placeholder="Enter project name"
                onChange={(e) => setName(e.target.value)}
                required/>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}


export default AddForm;
