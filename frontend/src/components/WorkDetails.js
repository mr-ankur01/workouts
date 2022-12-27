import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import formatDistanceToNow  from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkDetails = (props) => {
    const { title, load, reps, createdAt, } = props.workout
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const deleteHandle = async() => {
        console.log('delete')
        if(!user){
            return 
        }
        const res =  await fetch('/api/workout/'+props.workout._id ,{
            method:'DELETE',
            headers:{
                "Authorization":`Bearer ${user.token}`
            }
        })
        const resJson = await res.json()
        console.log(resJson)
        dispatch({ type:'DELETE_WORKOUT',payload : resJson })

    }
    return (
        <>
            <div className="work-container">
                <h4>{title} <span className="material-symbols-outlined"
                onClick={
                    ()=>{deleteHandle()}
                }>Delete</span></h4>
                <div className="workDetails">
                    <p><strong>Loads (kg): </strong> {load}</p>
                    <p><strong>Reps: </strong> {reps}</p>
                    <p>{formatDistanceToNow(new Date(createdAt),{addSuffix:true})}</p>
                    
                </div>
            </div>
        </>
    )
}

export default WorkDetails;