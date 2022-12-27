import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
const Workoutform = () => {
    const {dispatch} = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields,setEmptyFields] = useState([])
    const { user } = useAuthContext()

    return (
        <div className='formPost'>
            <form>
                <label>Title:</label>
                <input type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />
                <label>Loads (in kg):</label>
                <input type="number"
                    onChange={(e) => setLoad(e.target.value)}
                    value={load}
                    className={emptyFields.includes('load')? 'error':''}
                />
                <label>Reps:</label>
                <input type="number"
                    onChange={(e) => setReps(e.target.value)}
                    value={reps}
                    className={emptyFields.includes('reps')?'error':''}
                />
                <button
                    onClick={(e) => {
                        console.log('clicked')
                        e.preventDefault();
                        if(!user){
                            setError('You must be logged in')
                            return
                        }
                        const workouts = { title, load, reps }
                        console.log(user.token)
                        const fetchPost = async () => {
                            const res = await fetch('/api/workout', {
                                method: "post",
                                body: JSON.stringify(workouts),
                                headers: {
                                    "Content-type":"application/json",
                                    "Authorization":`Bearer ${user.token}`

                                }
                            })
                            const resJson = await res.json()

                            if (!res.ok) {
                                setError(resJson.error)
                                setEmptyFields(resJson.emptyFields)
                            }
                            if (res.ok) {
                                setError(null)
                                setTitle('')
                                setLoad('')
                                setReps('')
                                setEmptyFields([])
                                dispatch({type:'CREATE_WORKOUTS', payload:resJson})
                            }
                        }
                        fetchPost()

                    }}

                >Submit</button>
            </form>
            { error && <div className='formError'>{error}</div>}
        </div>
    )
}

export default Workoutform;