import Header from "../Header";
import Footer from "./Footer";
import PomTimer from "./PomTimer";
import { useParams } from "react-router-dom";

function Pomodoro() {
    const { id } = useParams();

    return(
        <div>
            <Header/>
            <PomTimer projectId = {id}/>
            <Footer/>
        </div>
    );
}


export default Pomodoro;
