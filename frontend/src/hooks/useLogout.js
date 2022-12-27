import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () =>{
    const { dispatch } = useAuthContext()
    const { dispatch : WorkoutsDispatch } = useWorkoutsContext()
    const logout = () =>{

        localStorage.removeItem('user');
        dispatch({type:'LOGOUT'})
        WorkoutsDispatch({type:'SET_WORKOUTS',payload:null})
    } 
    
    return { logout }
}