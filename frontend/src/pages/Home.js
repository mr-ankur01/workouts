import WorkDetails from "../components/WorkDetails";
import Workform from "../components/workoutForm";

import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
const Home = () => {
    
    const { workouts, dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchWorkout = async () => {
            if(!user){
                return
            }
            const res = await fetch('/api/workout',{
                headers:{
                    "Authorization":`Bearer ${user.token}`
                }
            })
            const resJson = await res.json()
            if (res.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: resJson })
            }
        }
        fetchWorkout()

    }, [ dispatch, user ])
    return (
        <>
            <div className="main-container">
                <div className="Details">
                    {workouts && workouts.map((workout) => (
                        <WorkDetails key={workout._id} workout={workout} />
                    ))}
                </div>
                <div className="workForm">
                    <Workform />
                </div>
            </div>
        </>
    )

}

export default Home;