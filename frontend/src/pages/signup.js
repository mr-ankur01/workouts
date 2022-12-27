import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signUp ,error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signUp(email,password)
    }
    return (
 
            <form className='auth' onSubmit={handleSubmit}>
                <h4>SignUp</h4>
                <label>Email</label>
                <input type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label>Password</label>
                <input type="text"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button disabled={isLoading}>Signup</button>
                {error && <div className='error'>{error}</div>}
            </form>

    )
}
export default Signup;