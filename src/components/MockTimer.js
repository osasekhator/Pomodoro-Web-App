import { useState, useEffect } from "react";

function MockTimer(props) {
    const WORK = 3 * 60;
    const SHORTBREAK = 1 * 60;
    const LONGBREAK = 2 * 60;

    const [timer, setTimer] = useState(WORK);
    const [pomodoros, setPomodoros] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [type, setType] = useState("work");
    const [cycle, setCycle] = useState(0);

    const [sessionId, setSessionId] = useState(null);
    const [startTime, setStartTime] = useState("");

    async function start() {
        if(!isRunning && timer === WORK) {
            const now = new Date().getTime();
            setStartTime(now);
            
            if(!sessionId) {
                await createSessionStart(now);
            }

            setIsRunning(true);
        }
    }

    useEffect(() => {
        let interval = null;
        
        if(isRunning) {
            interval = setInterval(() => {
                setTimer(prev => {
                    return prev - 1;
                })
            }, 1000)
        }
        return() => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        if(timer === 0 && isRunning) {
            handleSessionEnd();
        }
    }, [timer]);

    async function handleSessionEnd() {
        const end = new Date().getTime();
        setIsRunning(false);
        let duration = Math.round((end - startTime)/ 1000/ 60);

        await saveTimer(type, duration, sessionId);

        if(type === "work") {
            const traceCount = pomodoros + 1;
            setPomodoros(traceCount);
            
            if(traceCount % 4 === 0) {
                setType("long");
                setTimer(LONGBREAK);
                setCycle(1);
            } else {
                setType("short");
                setTimer(SHORTBREAK);
            }
        } else if(type === "short") {
            setType("work");
            setTimer(WORK);
        } else if(type === "long") {
            if (pomodoros % 4 === 0 && cycle === 1) {
            
            await createSession(end, type);
        }

            setPomodoros(0);
            setCycle(0);
            setSessionId(null);
            setType("work");
            setTimer(WORK);
            
            setIsRunning(false);
            return;
        }
        setStartTime(new Date().getTime());
        setIsRunning(true);
    };

    useEffect(() => {
        
    });

    async function createSessionStart(start) {
        try {
            const response = await fetch(`http://127.0.0.1:5000/sessions/${props.projectId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "start_time": new Date(start).toLocaleString('en-GB', {
                        year: 'numeric', month: '2-digit', day: '2-digit',
                        hour: '2-digit', minute: '2-digit'
                    })
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Session created:", data);
                setSessionId(data.id); 
                console.log(sessionId);

            } else {
                console.error("Failed to create session:", data);
            }
        } catch (error) {
            console.error("Error creating session:", error.message);
        }
    };

    async function saveTimer(type, duration, sessionIdU) {
        try {
            const response = await fetch(
                `http://127.0.0.1:5000/timers/${props.projectId}/${sessionIdU}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type, duration }),
                }
            );

            const data = await response.json();
            if (response.ok) {
                console.log("Timer logged:", data);
            } else {
                console.error("Failed to save the timer:", data);
            }
        } catch (error) {
            console.error("Error saving the timer:", error.message);
        }
    };

    async function createSession(end) {
        try {
            const response = await fetch(`http://127.0.0.1:5000/sessions/${props.projectId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "end_time": new Date(end).toLocaleString('en-GB', {
                        year: 'numeric', month: '2-digit', day: '2-digit',
                        hour: '2-digit', minute: '2-digit'
                    }),
                    "session_id": sessionId
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Session concluded:", data);
            } else {
                console.error("Failed to conclude session:", data);
            }
        } catch (error) {
            console.error("Error concluding session:", error.message);
        }
    }

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return(
        <div className="timer">
            <div className="time-container">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>

            <div>
                <button onClick={start}>Start</button>
            </div>
        </div>
    );
}

export default MockTimer;