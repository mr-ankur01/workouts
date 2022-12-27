import { useState } from 'react';
import { useAuthContext } from './useAuthContext'

export const useSignup = () =>{
    const [ error, setError ] =  useState(null)
    const [ isLoading, setIsLoading ] =  useState(null)
    const { dispatch } = useAuthContext()

    const signUp = async (email, password) =>{
        setIsLoading(false)
        setError(null)

        const res = await fetch('/api/user/signup',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })

        const resJson = await res.json()
        if(!res.ok){
            setIsLoading(false)
            setError(resJson.err)
        }
        if(res.ok){
            localStorage.setItem('user', JSON.stringify(resJson))
            dispatch({type:'LOGIN',payload:resJson})
            setIsLoading(false)
        }
    }
    
    
    return {signUp,error,isLoading}
}